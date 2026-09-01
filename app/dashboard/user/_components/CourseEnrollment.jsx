'use client';

/**
 * The WOFBI application, backed by /api/applications/me.
 *
 * The step list is not fixed. The applicant chooses their course first, and that
 * choice decides what follows: the Leadership Certificate and Leadership Diploma
 * ask for a leadership and ministry section that the Basic Certificate does not.
 * So `steps` comes from the server (`meta.rulesByCourse`) rather than being written
 * out here — the API is the thing that enforces the required fields, and a form
 * that kept its own copy of the rules would eventually disagree with it.
 *
 * Putting the course first also answers the question applicants actually open this
 * page with: what does it cost, and how long does it take. Both are on every card.
 *
 * What changed from the mock version: the draft now lives on the server rather
 * than only in localStorage, so it survives a new device and the admissions team
 * can see it. localStorage is still written on every save — if the network drops
 * mid-form nobody loses their typing — but the server is the source of truth on
 * load.
 *
 * The photograph and the receipt upload the moment they are chosen. Holding two
 * 5 MB files in browser memory until the final step is how a long form loses an
 * hour of work to one refresh.
 */

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BadgeCheck, BookOpen, Check, ChevronRight, ClipboardCheck, Clock3, LockKeyhole, Camera, Receipt } from 'lucide-react';
import { api, authorizedFileUrl } from '@/lib/api';
import { messageOf, useAction, useApi } from '@/lib/useApi';
import { ErrorNote, Loading } from '@/components/dashboard/Async';
import { useToast } from '@/components/ui/Toast';

/**
 * Used only until /api/applications/me answers with the real lists.
 *
 * The fees and durations are deliberately absent: an invented figure on a fee is
 * worse than a blank one, so a card with no server data shows "—" and the
 * applicant asks, rather than being quoted a price nobody set.
 */
const courseFallback = [
  { code: 'BCC', name: 'Basic Certificate Course' },
  { code: 'LCC', name: 'Leadership Certificate Course' },
  { code: 'LDC', name: 'Leadership Diploma Course' },
];
const stepsFallback = ['Choose your course', 'Personal details', 'Work, education & health', 'Spiritual information', 'Declaration'];
const serviceYearsFallback = ['Under 1 year', '1 - 2 years', '3 - 5 years', '6 - 10 years', 'Over 10 years'];
const departmentFallback = ['Choir / Music', 'Ushering', 'Protocol', 'Children', 'Teens / Youth', 'Evangelism', 'Media / Technical', 'Sanctuary Keeping', 'Welfare', 'Prayer', 'Drama', 'Transport', 'Other'];

/** Step names the panes are keyed on. Must match APPLICATION_STEPS on the server. */
const STEP = {
  COURSE: 'Choose your course',
  PERSONAL: 'Personal details',
  WORK: 'Work, education & health',
  SPIRITUAL: 'Spiritual information',
  LEADERSHIP: 'Leadership & ministry service',
  DECLARATION: 'Declaration',
};

const initialForm = { preferredCourse: '', title: '', firstName: '', lastName: '', email: '', phone: '', gender: '', dateOfBirth: '', placeOfBirth: '', nativeTown: '', state: '', country: '', address: '', maritalStatus: '', children: '', understandsEnglish: '', writesEnglish: '', languages: '', workplace: '', position: '', employmentDate: '', occupation: '', specialSkills: '', schoolType: '', schoolName: '', dateAttended: '', certificate: '', physicalDefects: '', defectDetails: '', bornAgainDate: '', waterBaptized: '', waterBaptizedDate: '', holySpiritBaptized: '', holySpiritBaptizedDate: '', discipleshipClass: '', discipleshipChurch: '', discipleshipDate: '', bibleTraining: '', trainingName: '', trainingCertificates: '', wofbiReason: '', afterCoursePlan: '', christianService: '', currentOffice: '', serviceYears: '', churchDepartment: '', previousLeadershipTraining: '', previousTrainingDetails: '', ministryExperience: '', refereeName: '', refereeOffice: '', refereeContact: '', pastorNameAddress: '', churchSponsorship: '', declarationName: '', declarationDate: '' };
const fieldClass = 'mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-red-500 focus:bg-white';
const errorFieldClass = 'mt-2 w-full rounded-xl border border-red-400 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-red-500 focus:bg-white';

/** Keeps only the keys this form owns, so `applicationComplete` and friends are dropped. */
const seedForm = (saved = {}) => {
  const next = { ...initialForm };
  for (const key of Object.keys(initialForm)) {
    if (typeof saved[key] === 'string') next[key] = saved[key];
    else if (typeof saved[key] === 'number') next[key] = String(saved[key]);
  }
  return next;
};

function Input({ label, name, value, onChange, required = false, type = 'text', options, wide = false, error, placeholder = '' }) {
  const cls = error ? errorFieldClass : fieldClass;
  return <label className={`block text-sm font-medium text-slate-700 ${wide ? 'sm:col-span-2' : ''}`}><span>{label}{required && <b className="text-red-600"> *</b>}</span>{options ? <select name={name} value={value} onChange={onChange} required={required} className={cls}><option value="">Select an option</option>{options.map((option) => <option value={option} key={option}>{option}</option>)}</select> : <input name={name} value={value} type={type} onChange={onChange} required={required} placeholder={placeholder} className={cls} />}{error && <span className="mt-1 block text-xs font-normal text-red-600">{error}</span>}</label>;
}
function Area({ label, name, value, onChange, required = false, placeholder = '', error }) {
  return <label className="block text-sm font-medium text-slate-700 sm:col-span-2"><span>{label}{required && <b className="text-red-600"> *</b>}</span><textarea name={name} value={value} onChange={onChange} required={required} placeholder={placeholder} rows="3" className={`${error ? errorFieldClass : fieldClass} resize-y`} />{error && <span className="mt-1 block text-xs font-normal text-red-600">{error}</span>}</label>;
}

/**
 * One selectable course, with its price and its length.
 *
 * A real radio does the work, hidden but not removed, so the group is still one
 * arrow-key stop for a keyboard and still announces as a radio to a screen reader.
 * `focus-within` on the label is what puts the focus ring back, since the input
 * itself has no visible box of its own.
 */
function CourseCard({ course, picked, onChange }) {
  return <label className={`flex cursor-pointer flex-col rounded-2xl border-2 p-5 text-left transition focus-within:ring-2 focus-within:ring-red-500 focus-within:ring-offset-2 ${picked ? 'border-red-500 bg-red-50/40 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
    <input type="radio" name="preferredCourse" value={course.name} checked={picked} onChange={onChange} className="sr-only" />
    <span className="flex items-start justify-between gap-3">
      <span className="text-xs font-bold uppercase tracking-[.14em] text-slate-500">{course.code}</span>
      <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${picked ? 'border-red-500 bg-red-500 text-white' : 'border-slate-300'}`}>{picked && <Check size={12} strokeWidth={3} />}</span>
    </span>
    <span className="mt-3 block text-base font-semibold text-slate-900">{course.name}</span>
    <span className="mt-2 block text-sm leading-6 text-slate-600">{course.description || ''}</span>
    <span className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200/80 pt-4 text-sm">
      <span className="flex items-center gap-1.5 font-semibold text-slate-900"><Receipt size={15} className="text-red-600" />{course.feeDisplay || '—'}</span>
      <span className="flex items-center gap-1.5 text-slate-600"><Clock3 size={15} className="text-slate-400" />{course.duration || '—'}</span>
    </span>
  </label>;
}

export default function CourseEnrollment() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [complete, setComplete] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [paymentReceipt, setPaymentReceipt] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState('');
  const [receiptLabel, setReceiptLabel] = useState('');
  // Not a toast: a form sent back for changes needs its reason on screen for as
  // long as the applicant is fixing it, not for six seconds.
  const [reviewNote, setReviewNote] = useState('');
  const formRef = useRef(null);
  // The saved draft must only seed React state once, or a reload triggered by an
  // upload would overwrite whatever is currently being typed.
  const seeded = useRef(false);

  const loaded = useApi(() => api.applications.get());
  const saveStep = useAction((fields) => api.applications.saveDraft(fields));
  const sendForm = useAction((fields) => api.applications.submit(fields));
  const sendFile = useAction((kind, file) => api.applications.upload(kind, file));
  const toast = useToast();

  const meta = loaded.data?.meta || null;
  const options = meta?.options || null;
  const errors = sendForm.error?.errors || saveStep.error?.errors || null;
  const errorFor = (name) => errors?.[name];

  const courses = meta?.courses?.length ? meta.courses : courseFallback;
  const chosen = courses.find((course) => course.name === form.preferredCourse) || null;
  // The server sends a step list per course code, so the wizard never has to know
  // *why* LCC has six steps and BCC five — only which list applies right now.
  const steps = (chosen && meta?.rulesByCourse?.[chosen.code]?.steps) || meta?.steps || stepsFallback;
  const stepName = steps[step] || steps[0];
  const isLastStep = step === steps.length - 1;

  useEffect(() => {
    const application = loaded.data?.application;
    if (!application || seeded.current) return;
    seeded.current = true;

    setForm(seedForm(application.form));
    // The server already clamped `furthestStep` to this applicant's own step count,
    // so trust its number rather than recomputing against a `steps` that is derived
    // from form state this effect has not finished setting.
    setStep(Math.max(0, Math.min(application.furthestStep || 0, (application.steps?.length || stepsFallback.length) - 1)));
    setComplete(application.status !== 'Draft' && application.status !== 'Request info');
    if (application.photo) setPhotoPreview(authorizedFileUrl(application.photo) || '');
    if (application.receipt) {
      setReceiptLabel(application.receipt.filename || 'Payment receipt');
      if ((application.receipt.contentType || '').startsWith('image/')) {
        setReceiptPreview(authorizedFileUrl(application.receipt) || '');
      }
    }
    // A returning applicant whose form was sent back for changes should see why.
    if (application.status === 'Request info' && application.reviewNote) {
      setReviewNote(application.reviewNote);
    }
  }, [loaded.data]);

  // Switching from a leadership course down to the Basic Certificate removes a
  // step. Without this the applicant could be left pointing past the end of their
  // own form, on a step that no longer exists.
  useEffect(() => {
    setStep((current) => Math.min(current, steps.length - 1));
  }, [steps.length]);

  const change = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  /** localStorage is the offline copy; the PATCH above it is the real save. */
  const cache = (data = form, applicationComplete = complete) => {
    try {
      localStorage.setItem('wofbi-application', JSON.stringify({ ...data, applicationComplete, receiptName: paymentReceipt?.name || receiptLabel || '' }));
    } catch {
      // A full or disabled localStorage must not stop the form working.
    }
  };

  const upload = async (kind, file) => {
    const label = kind === 'photo' ? 'Passport photograph' : 'Payment receipt';
    const { ok, data, error } = await sendFile.run(kind, file);
    if (ok) {
      toast.success(data?.message || `${label} uploaded`);
      if (kind === 'receipt') setReceiptLabel(file.name);
      return;
    }
    toast.error(messageOf(error));
  };

  const selectPhoto = (event) => {
    const [file] = event.target.files;
    if (!file) return;
    setProfilePhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
    upload('photo', file);
  };
  const selectReceipt = (event) => {
    const [file] = event.target.files;
    if (!file) return;
    setPaymentReceipt(file);
    setReceiptLabel(file.name);
    setReceiptPreview(file.type.startsWith('image/') ? URL.createObjectURL(file) : '');
    upload('receipt', file);
  };

  /**
   * The course radios are visually hidden, and a hidden invalid control is one
   * `reportValidity()` cannot show a bubble for — it would block the button with no
   * message at all. So this step is checked here instead, with a real toast.
   */
  const stepIsValid = () => {
    if (stepName === STEP.COURSE) {
      if (form.preferredCourse) return true;
      toast.error('Please choose the course you are applying for.');
      return false;
    }
    if (formRef.current?.reportValidity()) return true;
    // The browser marks the first bad field, but on a form this long its little
    // bubble is easy to miss — especially if the field is scrolled off screen.
    toast.error('Please complete the required fields on this step.');
    return false;
  };

  const next = async () => {
    if (!stepIsValid()) return;
    cache();
    // Captured before advancing, so the toast names the step that was saved
    // rather than the one now on screen.
    const saved = stepName;
    // Move on even if the save failed: the answers are in localStorage and the
    // next save (or the submit) will carry them. Blocking here would trap someone
    // behind a flaky connection.
    const { ok, error } = await saveStep.run({ ...form, furthestStep: step + 1 });
    if (ok) toast.success(`${saved} saved`);
    else toast.error(`${messageOf(error)} Your answers are kept on this device.`);
    setStep((current) => current + 1);
  };

  const submit = async () => {
    if (!stepIsValid()) return;
    const data = { ...form, declarationName: form.declarationName || `${form.firstName} ${form.lastName}`.trim() };
    setForm(data);
    cache(data, true);
    const { ok, data: result, error } = await sendForm.run(data);
    if (!ok) {
      // Field-level messages are listed under the form as well; this is the
      // headline so the failure is not silent.
      toast.error(messageOf(error));
      return;
    }
    toast.success(result?.message || 'Your application has been submitted.');
    setComplete(true);
  };

  const panes = {
    [STEP.COURSE]: <div className="space-y-6" key="course">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{courses.map((course) => <CourseCard key={course.code} course={course} picked={form.preferredCourse === course.name} onChange={change} />)}</div>
      {errorFor('preferredCourse') && <p className="text-xs text-red-600">{errorFor('preferredCourse')}</p>}
      {/* Only once a course is picked, because a fee with no course attached is the
          kind of number people remember wrongly. */}
      {chosen && <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <p className="font-semibold text-slate-900">What you will pay</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">The {chosen.name} runs for {chosen.duration || 'a period your centre will confirm'} and costs {chosen.feeDisplay || 'a fee your centre will confirm'}. Pay into the account below, then upload the receipt on the next step.</p>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div><dt className="text-slate-500">Amount</dt><dd className="font-semibold text-slate-900">{chosen.feeDisplay || '—'}</dd></div>
          <div><dt className="text-slate-500">Duration</dt><dd className="font-semibold text-slate-900">{chosen.duration || '—'}</dd></div>
          <div><dt className="text-slate-500">Account name</dt><dd className="font-semibold text-slate-900">{meta?.bank?.accountName || '—'}</dd></div>
          <div><dt className="text-slate-500">Bank</dt><dd className="font-semibold text-slate-900">{meta?.bank?.bankName || '—'}</dd></div>
          <div><dt className="text-slate-500">Account number</dt><dd className="font-semibold tracking-wide text-slate-900">{meta?.bank?.accountNumber || '—'}</dd></div>
        </dl>
      </div>}
    </div>,

    [STEP.PERSONAL]: <div className="grid gap-5 sm:grid-cols-2" key="personal">
      <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 transition hover:border-red-300 hover:bg-red-50/30">
        <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full bg-white text-red-600 shadow-sm">{photoPreview ? <img src={photoPreview} alt="Profile preview" className="h-full w-full object-cover" /> : <Camera size={24} />}</span>
        <span><span className="block text-sm font-semibold text-slate-800">Upload passport photograph <b className="text-red-600">*</b></span><span className="mt-1 block text-xs text-slate-500">{errorFor('photo') || 'Clear headshot, JPG or PNG, maximum 5 MB.'}</span></span>
        <input type="file" accept="image/png,image/jpeg" onChange={selectPhoto} required={!profilePhoto && !photoPreview} className="sr-only" />
      </label>
      <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 transition hover:border-red-300 hover:bg-red-50/30">
        <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full bg-white text-red-600 shadow-sm">{receiptPreview ? <img src={receiptPreview} alt="Receipt preview" className="h-full w-full object-cover" /> : receiptLabel ? <Check size={24} /> : <Receipt size={24} />}</span>
        {/* The amount is repeated here on purpose. It was shown on the previous step,
            but this is the moment it is actually needed. */}
        <span><span className="block text-sm font-semibold text-slate-800">Upload payment receipt <b className="text-red-600">*</b></span><span className="mt-1 block text-xs text-slate-500">{errorFor('receipt') || receiptLabel || `Bank receipt${chosen?.feeDisplay ? ` for ${chosen.feeDisplay}` : ''}, JPG, PNG or PDF, maximum 5 MB.`}</span></span>
        <input type="file" accept="image/png,image/jpeg,application/pdf" onChange={selectReceipt} required={!paymentReceipt && !receiptLabel} className="sr-only" />
      </label>
      <Input label="Title" name="title" value={form.title} onChange={change} required options={options?.title || ['Mr.', 'Mrs.', 'Miss', 'Dr.', 'Pastor', 'Dcn.', 'Dcnss.']} error={errorFor('title')} /><Input label="Gender" name="gender" value={form.gender} onChange={change} required options={options?.gender || ['Male', 'Female']} error={errorFor('gender')} />
      <Input label="First name" name="firstName" value={form.firstName} onChange={change} required placeholder="Grace" error={errorFor('firstName')} /><Input label="Surname" name="lastName" value={form.lastName} onChange={change} required placeholder="Adeyemi" error={errorFor('lastName')} />
      <Input label="Email address" name="email" value={form.email} onChange={change} required type="email" placeholder="you@example.com" error={errorFor('email')} /><Input label="Telephone number" name="phone" value={form.phone} onChange={change} required type="tel" placeholder="0803 000 0000" error={errorFor('phone')} />
      <Input label="Date of birth" name="dateOfBirth" value={form.dateOfBirth} onChange={change} required type="date" error={errorFor('dateOfBirth')} /><Input label="Place of birth" name="placeOfBirth" value={form.placeOfBirth} onChange={change} required placeholder="Ilorin" error={errorFor('placeOfBirth')} />
      <Input label="Native town" name="nativeTown" value={form.nativeTown} onChange={change} required placeholder="Offa" error={errorFor('nativeTown')} /><Input label="State" name="state" value={form.state} onChange={change} required placeholder="Kwara" error={errorFor('state')} />
      <Input label="Country" name="country" value={form.country} onChange={change} required placeholder="Nigeria" error={errorFor('country')} /><Input label="Marital status" name="maritalStatus" value={form.maritalStatus} onChange={change} required options={options?.maritalStatus || ['Single', 'Engaged', 'Married', 'Separated', 'Divorced', 'Widow', 'Widower']} error={errorFor('maritalStatus')} />
      <Input label="Number of children" name="children" value={form.children} onChange={change} type="number" placeholder="0" error={errorFor('children')} /><Input label="Languages spoken" name="languages" value={form.languages} onChange={change} required placeholder="English, Yoruba" error={errorFor('languages')} />
      <Area label="Present address in full" name="address" value={form.address} onChange={change} required placeholder="House number, street, area, city and state" error={errorFor('address')} /><Input label="Do you understand English?" name="understandsEnglish" value={form.understandsEnglish} onChange={change} required options={options?.yesNo || ['Yes', 'No']} error={errorFor('understandsEnglish')} /><Input label="Can you write in English?" name="writesEnglish" value={form.writesEnglish} onChange={change} required options={options?.yesNo || ['Yes', 'No']} error={errorFor('writesEnglish')} />
    </div>,

    [STEP.WORK]: <div className="grid gap-5 sm:grid-cols-2" key="work">
      <Input label="Present place of work" name="workplace" value={form.workplace} onChange={change} placeholder="Company or organisation" /><Input label="Position" name="position" value={form.position} onChange={change} placeholder="Your job title" /><Input label="Date of employment" name="employmentDate" value={form.employmentDate} onChange={change} type="date" /><Input label="Occupation" name="occupation" value={form.occupation} onChange={change} required placeholder="Teacher, trader, student…" error={errorFor('occupation')} /><Area label="Special skills" name="specialSkills" value={form.specialSkills} onChange={change} placeholder="Anything you do well that could serve the church" />
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:col-span-2"><p className="font-semibold text-slate-900">Academic background <span className="font-normal text-slate-500">(secondary school and above)</span></p><div className="mt-4 grid gap-4 sm:grid-cols-2"><Input label="Type of school" name="schoolType" value={form.schoolType} onChange={change} required placeholder="Secondary, polytechnic, university…" error={errorFor('schoolType')} /><Input label="Name of school" name="schoolName" value={form.schoolName} onChange={change} required placeholder="Name of the institution" error={errorFor('schoolName')} /><Input label="Date attended" name="dateAttended" value={form.dateAttended} onChange={change} required placeholder="2014 - 2018" error={errorFor('dateAttended')} /><Input label="Certificate obtained" name="certificate" value={form.certificate} onChange={change} required placeholder="WAEC, ND, B.Sc…" error={errorFor('certificate')} /></div></div>
      <Input label="Any physical defects?" name="physicalDefects" value={form.physicalDefects} onChange={change} required options={options?.yesNo || ['Yes', 'No']} error={errorFor('physicalDefects')} /><Input label="If yes, state details" name="defectDetails" value={form.defectDetails} onChange={change} placeholder="Leave blank if none" />
    </div>,

    [STEP.SPIRITUAL]: <div className="grid gap-5 sm:grid-cols-2" key="spiritual">
      <Input label="Date born again" name="bornAgainDate" value={form.bornAgainDate} onChange={change} required type="date" error={errorFor('bornAgainDate')} /><Input label="Baptized in water by immersion?" name="waterBaptized" value={form.waterBaptized} onChange={change} required options={options?.yesNo || ['Yes', 'No']} error={errorFor('waterBaptized')} /><Input label="If yes, when?" name="waterBaptizedDate" value={form.waterBaptizedDate} onChange={change} type="date" /><Input label="Baptized in the Holy Spirit with tongues?" name="holySpiritBaptized" value={form.holySpiritBaptized} onChange={change} required options={options?.yesNo || ['Yes', 'No']} error={errorFor('holySpiritBaptized')} /><Input label="If yes, when?" name="holySpiritBaptizedDate" value={form.holySpiritBaptizedDate} onChange={change} type="date" /><Input label="Attended discipleship / believers' class?" name="discipleshipClass" value={form.discipleshipClass} onChange={change} required options={options?.yesNo || ['Yes', 'No']} error={errorFor('discipleshipClass')} /><Input label="Which church?" name="discipleshipChurch" value={form.discipleshipChurch} onChange={change} placeholder="Name and branch" /><Input label="When?" name="discipleshipDate" value={form.discipleshipDate} onChange={change} type="date" /><Input label="Attended Bible training college or ministry school?" name="bibleTraining" value={form.bibleTraining} onChange={change} required options={options?.yesNo || ['Yes', 'No']} error={errorFor('bibleTraining')} /><Input label="School / training name" name="trainingName" value={form.trainingName} onChange={change} placeholder="Leave blank if none" /><Area label="Certificates obtained" name="trainingCertificates" value={form.trainingCertificates} onChange={change} placeholder="Leave blank if none" /><Area label="Why do you want to be trained in WOFBI?" name="wofbiReason" value={form.wofbiReason} onChange={change} required placeholder="In your own words" error={errorFor('wofbiReason')} /><Area label="Your plan after completing the course" name="afterCoursePlan" value={form.afterCoursePlan} onChange={change} required placeholder="How you intend to use the training" error={errorFor('afterCoursePlan')} /><Area label="Experience in Christian service" name="christianService" value={form.christianService} onChange={change} required placeholder="Preaching, tract distribution, Sunday school, music / choir..." error={errorFor('christianService')} />
    </div>,

    [STEP.LEADERSHIP]: <div className="grid gap-5 sm:grid-cols-2" key="leadership">
      <div className="rounded-2xl border border-red-100 bg-red-50 p-5 sm:col-span-2">
        <p className="flex items-center gap-2 font-semibold text-slate-900"><BadgeCheck size={18} className="text-red-600" />Leadership and ministry service</p>
        <p className="mt-2 text-sm leading-6 text-slate-700">The {chosen?.name || 'programme you have chosen'} is built for people already serving, so this section is only asked of leadership applicants. Tell us where you serve now and who can speak to your work.</p>
      </div>
      <Input label="Office or position you currently hold" name="currentOffice" value={form.currentOffice} onChange={change} required placeholder="Deacon, unit head, cell leader…" error={errorFor('currentOffice')} />
      <Input label="Years in church service" name="serviceYears" value={form.serviceYears} onChange={change} required options={options?.serviceYears || serviceYearsFallback} error={errorFor('serviceYears')} />
      <Input label="Department or unit you serve in" name="churchDepartment" value={form.churchDepartment} onChange={change} required options={options?.churchDepartment || departmentFallback} error={errorFor('churchDepartment')} />
      <Input label="Attended leadership training before?" name="previousLeadershipTraining" value={form.previousLeadershipTraining} onChange={change} required options={options?.yesNo || ['Yes', 'No']} error={errorFor('previousLeadershipTraining')} />
      <Area label="If yes, which training and when?" name="previousTrainingDetails" value={form.previousTrainingDetails} onChange={change} placeholder="Leave blank if none" error={errorFor('previousTrainingDetails')} />
      <Area label="Describe your ministry and leadership experience" name="ministryExperience" value={form.ministryExperience} onChange={change} required placeholder="What you lead, how long you have led it, and what it has involved" error={errorFor('ministryExperience')} />
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:col-span-2">
        <p className="font-semibold text-slate-900">Referee</p>
        <p className="mt-1 text-sm text-slate-600">Someone in leadership over you who can confirm your service. Your pastor is fine, but it may be anyone who oversees your work.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Input label="Referee's name" name="refereeName" value={form.refereeName} onChange={change} required placeholder="Full name" error={errorFor('refereeName')} />
          <Input label="Referee's office" name="refereeOffice" value={form.refereeOffice} onChange={change} required placeholder="Their position" error={errorFor('refereeOffice')} />
          <Input label="Referee's phone or email" name="refereeContact" value={form.refereeContact} onChange={change} required placeholder="How we reach them" error={errorFor('refereeContact')} />
        </div>
      </div>
    </div>,

    [STEP.DECLARATION]: <div className="grid gap-5 sm:grid-cols-2" key="declaration">
      {/* The course was chosen on the first step. Repeated here read-only so the
          applicant signs knowing exactly what they are signing up to. */}
      {chosen && <div className="grid gap-5 rounded-2xl border border-red-200 bg-red-50 p-5 sm:col-span-2 sm:grid-cols-[1fr_auto]"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-red-700">Course and payment summary</p><p className="mt-1 font-semibold text-slate-900">{chosen.name}</p><p className="mt-2 text-sm text-slate-600">This is the amount for the selected course. Keep the payment details available when you upload your receipt.</p><p className="mt-2 text-xs text-slate-500">{chosen.duration || 'Course duration to be confirmed'}</p></div><div className="rounded-xl bg-white px-4 py-3 text-left sm:min-w-48 sm:text-right"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Amount to pay</p><p className="mt-1 text-xl font-bold text-red-700">{chosen.feeDisplay || '—'}</p>{meta?.bank?.accountNumber && <p className="mt-1 text-xs text-slate-500">{meta.bank.bankName} · {meta.bank.accountNumber}</p>}</div></div>}
      <Area label="Name and address of your pastor" name="pastorNameAddress" value={form.pastorNameAddress} onChange={change} required placeholder="Full name, church and address" error={errorFor('pastorNameAddress')} /><Input label="Will your church / pastor assume financial responsibility for your school fees?" name="churchSponsorship" value={form.churchSponsorship} onChange={change} required options={options?.yesNo || ['Yes', 'No']} wide error={errorFor('churchSponsorship')} /><div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-sm leading-6 text-slate-700 sm:col-span-2"><p className="font-semibold text-slate-900">Declaration</p><p className="mt-2">I declare that the information provided is true. If accepted as a student, I agree to live in harmony with the objectives and standards of the Word of Faith Bible Institute.</p></div><Input label="Type your full name as signature" name="declarationName" value={form.declarationName} onChange={change} required placeholder="Your full name" error={errorFor('declarationName')} /><Input label="Declaration date" name="declarationDate" value={form.declarationDate} onChange={change} required type="date" error={errorFor('declarationDate')} />
    </div>,
  };

  if (loaded.loading) return <div className="mx-auto max-w-6xl pb-8"><Loading label="Loading your application…" /></div>;
  if (loaded.error) return <div className="mx-auto max-w-6xl pb-8"><ErrorNote error={loaded.error} onRetry={loaded.reload} /></div>;

  if (complete) return <CourseAccess onEdit={() => { setComplete(false); setStep(0); }} />;
  return <div className="mx-auto max-w-6xl pb-8"><div className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.16em] text-slate-400"><span className="text-red-600">WOFBI application</span><span className="h-px w-8 bg-slate-300" /><span>{stepName}</span></div><section className="overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-slate-200/70"><div className="grid lg:grid-cols-[.68fr_1.32fr]"><aside className="bg-[#343A40] p-7 text-white sm:p-10"><ClipboardCheck size={26} /><p className="mt-10 text-xs font-bold uppercase tracking-[.22em] text-emerald-200">Student application</p><h1 className="mt-3 text-3xl font-semibold leading-tight">Complete your form to access your course.</h1><p className="mt-4 text-sm leading-6 text-emerald-50/85">Start by choosing your course — you will see the fee and how long it runs. Your account details fill themselves in, and every step is saved as you go.</p><div className="mt-10 space-y-4">{steps.map((item, index) => <button type="button" key={item} onClick={() => setStep(index)} className={`flex w-full items-center gap-3 text-left text-sm ${index === step ? 'text-white' : 'text-emerald-100/65'}`}><span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border ${index < step ? 'border-emerald-300 bg-emerald-300 text-[#14342c]' : index === step ? 'border-red-300 bg-red-500' : 'border-white/30'}`}>{index < step ? <Check size={15} /> : index + 1}</span>{item}</button>)}</div></aside><div className="p-7 sm:p-10"><p className="text-sm font-semibold text-red-600">Step {step + 1} of {steps.length}</p><h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{stepName}</h2><p className="mt-3 text-sm text-slate-500">{stepName === STEP.COURSE ? 'Pick the programme you are applying for. The fee and length are shown on each card.' : 'Complete required fields, then use the button below to continue.'}</p>{reviewNote && <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4"><p className="text-sm font-semibold text-amber-800">Your form was sent back for changes</p><p className="mt-1 text-sm text-amber-700">{reviewNote}</p></div>}<form ref={formRef} onSubmit={(event) => event.preventDefault()} className="mt-8">{panes[stepName] || null}
    {/* Submit answers with every missing field at once, and they can belong to any
        step — so the messages are listed here as well as marked on their inputs. */}
    {errors && <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4"><p className="text-sm font-semibold text-red-700">{messageOf(sendForm.error || saveStep.error)}</p><ul className="mt-2 space-y-1 text-xs text-red-700">{Object.entries(errors).map(([field, message]) => <li key={field}>{message}</li>)}</ul></div>}
    {/* Non-field failures used to print here too. They are toasts now, so the
        message is not shown twice. */}
    <div className="mt-8 flex justify-between border-t border-slate-100 pt-6">{step ? <button type="button" onClick={() => setStep((current) => current - 1)} className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:text-red-600"><ArrowLeft size={17} /> Previous</button> : <span />}{isLastStep ? <button type="button" onClick={submit} disabled={sendForm.busy} className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60">{sendForm.busy ? 'Submitting…' : 'Submit application'} <BadgeCheck size={17} /></button> : <button type="button" onClick={next} disabled={saveStep.busy || sendFile.busy} className="inline-flex items-center gap-2 rounded-xl bg-[#14342c] px-5 py-3 text-sm font-semibold text-white hover:bg-[#204c40] disabled:opacity-60">{sendFile.busy ? 'Uploading…' : saveStep.busy ? 'Saving…' : 'Save and continue'} <ArrowRight size={17} /></button>}</div></form></div></div></section></div>;
}

/**
 * The course chooser shown once the application is in.
 *
 * The three cards come from /api/courses, which reports `locked`, `lockedReason`
 * and `statusMessage` per student — the prerequisite chain and the one-course-at-a-
 * time rule are both enforced server-side, so a card can no longer offer a course
 * the API would refuse.
 */
function CourseAccess({ onEdit }) {
  const [selectedCourse, setSelectedCourse] = useState('');
  const catalogue = useApi(() => api.courses.list());
  const enroll = useAction((code) => api.courses.enroll(code));
  const toast = useToast();

  const choose = async (course) => {
    setSelectedCourse(course.name);
    const { ok, data, error } = await enroll.run(course.code);
    if (!ok) {
      toast.error(messageOf(error));
      return;
    }
    toast.success(data?.message || `You are enrolled on the ${course.name}.`);
    // Enrolling locks the other two, so the whole list has to be refetched rather
    // than just this card flipped to "Enrolled".
    catalogue.reload();
  };

  const courses = catalogue.data?.courses || [];
  const studying = courses.find((course) => course.enrolled && course.enrollmentStatus === 'Active') || null;

  return <div className="mx-auto max-w-6xl pb-8"><section className="rounded-[2rem] bg-[#f5f1ea] p-7 sm:p-10"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-red-600"><ClipboardCheck size={21} /></div><p className="mt-6 text-sm font-semibold text-red-600">Application complete</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{studying ? 'You are studying with WOFBI.' : 'Your WOFBI courses are now available.'}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{studying ? `You are taking the ${studying.name}. Students take one course at a time, so the others open up once this one is complete.` : 'Your application has been submitted. Select one course to begin; your WOFBI centre will confirm placement.'}</p></div><button onClick={onEdit} className="text-sm font-semibold text-slate-600 hover:text-red-600">Edit application</button></div></section>
    {catalogue.loading && <div className="mt-6"><Loading label="Loading courses…" /></div>}
    {catalogue.error && <div className="mt-6"><ErrorNote error={catalogue.error} onRetry={catalogue.reload} /></div>}
    <div className="mt-6 grid gap-5 lg:grid-cols-3">{courses.map((course) => { const open = !course.locked; return <article key={course.code} className={`flex min-h-80 flex-col rounded-[1.75rem] border-t-4 p-6 ${course.accent}`}><div className="flex items-start justify-between"><BookOpen className={open ? 'text-red-600' : 'text-slate-500'} size={25} /><span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500">{course.enrolled ? 'Enrolled' : open ? 'Open now' : 'Next step'}</span></div><p className="mt-8 text-xs font-bold uppercase tracking-[.14em] text-slate-500">{course.period}</p><h2 className="mt-2 text-xl font-semibold text-slate-900">{course.name}</h2><p className="mt-3 text-sm leading-6 text-slate-600">{course.description}</p>
      {/* Fee and length stay on the card after admission too: this is where someone
          comes back to check what the next programme will cost them. */}
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/70 pt-4 text-sm"><span className="flex items-center gap-1.5 font-semibold text-slate-900"><Receipt size={15} className="text-red-600" />{course.feeDisplay || '—'}</span><span className="flex items-center gap-1.5 text-slate-600"><Clock3 size={15} className="text-slate-500" />{course.duration || '—'}</span></div>
      <div className="mt-auto pt-6"><p className="mb-4 flex items-center gap-2 text-xs font-medium text-slate-500">{open ? <Clock3 size={15} /> : <LockKeyhole size={15} />}{course.statusMessage}</p><button disabled={!open || course.enrolled || enroll.busy} onClick={() => choose(course)} className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${open && !course.enrolled ? 'bg-[#14342c] text-white hover:bg-[#204c40]' : 'cursor-not-allowed bg-white/70 text-slate-400'}`}>{course.enrolled ? 'Enrolled' : selectedCourse === course.name && enroll.busy ? 'Selecting…' : open ? 'Select this course' : 'Locked'}{open && !course.enrolled && <ChevronRight size={17} />}</button></div></article>; })}</div></div>;
}
