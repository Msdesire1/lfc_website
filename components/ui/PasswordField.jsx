'use client';

/**
 * A password input with a show/hide toggle.
 *
 * Six password boxes across four sign-in screens used to be six copies of the
 * same markup, so this is one component they all use. It matters more than it
 * looks: a password nobody can read back is the most common reason a sign-in
 * fails twice in a row, and on a phone keyboard it is the difference between
 * registering and giving up.
 *
 * Three details that are easy to get wrong:
 *
 * 1. The label is explicit (`htmlFor` + `useId`) rather than wrapping the input.
 *    An implicit label forwards clicks to its control, so the eye button — which
 *    has to sit next to the input — would fire twice on every press.
 *
 * 2. The button is `type="button"`. Inside a form, a button with no type is a
 *    submit button, so revealing the password would post the form.
 *
 * 3. `aria-pressed` and a label that changes with the state, because to a screen
 *    reader "Show password" and "Hide password" are the only difference between
 *    the two; the icon is decorative and hidden from it.
 *
 * The input keeps its `name`, so the parent's single `change` handler works
 * unaltered and no page had to grow per-field state to use this.
 */

import { useId, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function PasswordField({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  autoComplete = 'current-password',
  required = false,
  /** Server-side message for this field; also turns the border red. */
  error = '',
  /** Extra red border without a message — used for the local "do not match" check. */
  invalid = false,
  /** Quiet helper text under the box, e.g. the password rules. */
  hint = '',
}) {
  const [visible, setVisible] = useState(false);
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const showRing = Boolean(error) || invalid;

  return (
    <div className="space-y-2 text-sm text-slate-700">
      <label htmlFor={id} className="block">{label}</label>
      {/* focus-within moves the ring to the wrapper, so the box and the eye read
          as one control rather than two things that light up separately. */}
      <div
        className={`flex items-center rounded-2xl border bg-slate-50 transition focus-within:border-red-500 ${
          showRing ? 'border-red-400' : 'border-slate-200'
        }`}
      >
        <input
          id={id}
          // Swapping the type is what reveals the text. The value never leaves
          // React state, so nothing is copied into a second, visible field.
          type={visible ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={showRing || undefined}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          className="w-full flex-1 rounded-2xl bg-transparent px-4 py-3 text-sm text-slate-900 outline-none"
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          // A screen reader gets the state from these two; the icon is decorative.
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          title={visible ? 'Hide password' : 'Show password'}
          className="mr-2 shrink-0 rounded-xl p-2 text-slate-400 transition hover:bg-slate-200/70 hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
        >
          {visible ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
        </button>
      </div>
      {hint && !error && <span id={hintId} className="block text-xs text-slate-500">{hint}</span>}
      {error && <span id={errorId} className="block text-sm text-red-600">{error}</span>}
    </div>
  );
}
