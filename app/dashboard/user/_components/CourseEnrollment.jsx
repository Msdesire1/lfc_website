'use client';

import { useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Camera,
  Check,
  ChevronRight,
  Clock3,
  GraduationCap,
  LockKeyhole,
  MapPin,
  Sparkles,
  UserRound,
} from 'lucide-react';

const courses = [
  { name: 'Basic Certificate Course', period: 'Two-week intensive', description: 'Build a solid foundation in the Word and develop habits for victorious living.', status: 'Available now', accent: 'border-red-500 bg-red-50', available: true },
  { name: 'Leadership Certificate Course', period: 'Next level', description: 'Deepen your understanding of leadership, stewardship, and ministry service.', status: 'Complete Basic Certificate first', accent: 'border-amber-300 bg-amber-50' },
  { name: 'Leadership Diploma Course', period: 'Advanced level', description: 'A deeper equipping programme for leaders pursuing excellence in every sphere.', status: 'Available after Leadership Certificate', accent: 'border-slate-200 bg-slate-50' },
];

const fieldClass = 'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-red-500 focus:bg-white';

export default function CourseEnrollment() {
  const [profileComplete, setProfileComplete] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');

  const completeProfile = (event) => {
    event.preventDefault();
    setProfileComplete(true);
  };

  const previewPhoto = (event) => {
    const [file] = event.target.files;
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="mx-auto max-w-6xl pb-8 flex-grow">
        <div className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          <span className="text-red-600">WOFBI student journey</span>
          <span className="h-px w-8 bg-slate-300" />
          <span>{profileComplete ? 'Choose your course' : 'Complete your profile'}</span>
        </div>
        {!profileComplete ? (
          <section className="grid overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-slate-200/70 lg:grid-cols-[.82fr_1.18fr]">
            <aside className="relative overflow-hidden bg-[#343A40] p-7 text-white sm:p-10">
              <div className="absolute -left-12 top-20 h-52 w-52 rounded-full border-[18px] border-emerald-400/15" />
              <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-red-500/20 blur-2xl" />
              <div className="relative flex h-full flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#14342c]">
                  <GraduationCap size={25} />
                </div>
                <p className="mt-10 text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">Student record</p>
                <h1 className="mt-3 text-3xl font-semibold leading-tight">Complete your WOFBI profile to unlock courses.</h1>
                <p className="mt-4 text-sm leading-6 text-emerald-50/85">This information is collected after sign-in, separately from your account registration, to prepare your student record and course placement.</p>
                <div className="mt-auto space-y-4 pt-10">
                  {['Student information', 'Church and contact details', 'Course preference'].map((item, index) => (
                    <div key={item} className="flex items-center gap-3 text-sm">
                      <span className={`flex h-7 w-7 items-center justify-center rounded-full border ${index === 0 ? 'border-emerald-300 bg-emerald-400 text-[#14342c]' : 'border-white/30 text-emerald-100'}`}>
                        {index === 0 ? <Check size={15} /> : index + 1}
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </aside>
            <div className="p-7 sm:p-10">
              <p className="text-sm font-semibold text-red-600">Profile completion</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Your student information</h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-slate-500">Complete the details below once. Your available WOFBI programmes appear after you submit this form.</p>
              <form onSubmit={completeProfile} className="mt-8 grid gap-5 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 transition hover:border-red-300 hover:bg-red-50/30 sm:col-span-2">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-red-600 shadow-sm">
                    {photoPreview ? <img src={photoPreview} alt="Profile preview" className="h-full w-full object-cover" /> : <Camera size={24} />}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-slate-800">Add a profile photo</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">Clear headshot, JPG or PNG, maximum 5 MB.</span>
                  </span>
                  <input required type="file" accept="image/png,image/jpeg" onChange={previewPhoto} className="sr-only" />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Title</span>
                  <select required defaultValue="" className={fieldClass}>
                    <option value="" disabled>Select title</option>
                    <option>Mr.</option>
                    <option>Mrs.</option>
                    <option>Miss</option>
                    <option>Dcn.</option>
                    <option>Pastor</option>
                  </select>
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Gender</span>
                  <select required defaultValue="" className={fieldClass}>
                    <option value="" disabled>Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Phone number</span>
                  <input required type="tel" placeholder="0800 000 0000" className={fieldClass} />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Occupation</span>
                  <input required placeholder="Teacher, student, entrepreneur..." className={fieldClass} />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700 sm:col-span-2">
                  <span>Home church / assembly</span>
                  <input required placeholder="e.g. Living Faith Church, Lekki" className={fieldClass} />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>City / state</span>
                  <input required placeholder="e.g. Lagos, Lagos State" className={fieldClass} />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Residential address</span>
                  <input required placeholder="Street and area" className={fieldClass} />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700 sm:col-span-2">
                  <span>Preferred WOFBI course</span>
                  <select required defaultValue="" className={fieldClass}>
                    <option value="" disabled>Choose your preferred course</option>
                    <option>Basic Certificate Course</option>
                    <option>Leadership Certificate Course</option>
                    <option>Leadership Diploma Course</option>
                  </select>
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700 sm:col-span-2">
                  <span>Why are you attending WOFBI? <em className="font-normal text-slate-400">(optional)</em></span>
                  <textarea rows="3" placeholder="Share briefly..." className={`${fieldClass} resize-none`} />
                </label>
                <button type="submit" className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-red-700 sm:col-span-2">
                  Save profile and unlock courses <ArrowRight size={17} />
                </button>
              </form>
            </div>
          </section>
        ) : (
          <section>
            <div className="flex flex-col justify-between gap-4 rounded-[2rem] bg-[#f5f1ea] p-7 sm:flex-row sm:items-end sm:p-10">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-red-600 shadow-sm">
                  <Sparkles size={21} />
                </div>
                <p className="mt-6 text-sm font-semibold text-red-600">Profile complete</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Choose the programme for your next step.</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">The selection below is based on your profile. Courses with prerequisites stay locked until the previous level is completed.</p>
              </div>
              <button onClick={() => setProfileComplete(false)} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-red-600">
                <UserRound size={17} /> Edit profile
              </button>
            </div>
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              {courses.map((course) => (
                <article key={course.name} className={`flex min-h-80 flex-col rounded-[1.75rem] border-t-4 p-6 ${course.accent}`}>
                  <div className="flex items-start justify-between">
                    <BookOpen className={course.available ? 'text-red-600' : 'text-slate-500'} size={25} />
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${course.available ? 'bg-white text-red-600' : 'bg-white/70 text-slate-500'}`}>
                      {course.available ? 'Open now' : 'Next step'}
                    </span>
                  </div>
                  <p className="mt-8 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{course.period}</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900">{course.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{course.description}</p>
                  <div className="mt-auto pt-6">
                    <p className="mb-4 flex items-center gap-2 text-xs font-medium text-slate-500">
                      {course.available ? <Clock3 size={15} /> : <LockKeyhole size={15} />}
                      {course.status}
                    </p>
                    <button
                      disabled={!course.available}
                      onClick={() => setSelectedCourse(course.name)}
                      className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${course.available ? 'bg-[#14342c] text-white hover:bg-[#204c40]' : 'cursor-not-allowed bg-white/70 text-slate-400'}`}
                    >
                      {course.available ? 'Select this course' : 'Locked'}
                      {course.available && <ChevronRight size={17} />}
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
              <MapPin className="mt-0.5 shrink-0 text-red-600" size={19} />
              <p>
                <strong className="text-slate-900">Course placement is confirmed by your WOFBI centre.</strong> Your local assembly and location help us communicate the appropriate schedule.
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
