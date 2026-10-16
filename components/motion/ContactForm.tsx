'use client';

import { useActionState, useId } from 'react';
import { type SiteContent } from '@/content/types';
import { type Locale } from '@/lib/i18n';
import { type ContactState, sendContact } from '@/lib/actions/contact';
import { Button } from '@/components/ui/Button';
import { Check, Shield } from '@/components/ui/Icons';

interface ContactFormProps {
  locale: Locale;
  strings: SiteContent['contact']['form'];
  privacyHref: string;
}

const fieldClass =
  'field h-[52px] w-full rounded-tile border border-line-4 bg-ink px-4 font-sans text-base text-paper';

const initial: ContactState = { status: 'idle' };

export function ContactForm({ locale, strings, privacyHref }: ContactFormProps) {
  const [state, action, pending] = useActionState(sendContact, initial);
  const id = useId();

  const errorMessage =
    state.status === 'error'
      ? state.code === 'invalid'
        ? strings.errorInvalid
        : state.code === 'not_configured'
          ? strings.errorNotConfigured
          : strings.errorGeneric
      : null;

  return (
    <>
      {state.status === 'success' ? (
        <div
          role="status"
          className="form-swap flex flex-col items-start gap-[18px] rounded-card border border-green/35 bg-ink p-10"
        >
          <span className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-green/16 text-green">
            <Check size={26} />
          </span>
          <h3 className="m-0 font-display text-[32px] leading-[1.05] font-medium tracking-[-0.03em]">
            {strings.successTitle}
          </h3>
          <p className="m-0 text-base leading-[1.6] text-muted">{strings.successText}</p>
          <form action={action}>
            <input type="hidden" name="website" value="reset" />
            <Button type="submit" variant="ghost" size="sm" className="h-12 px-[22px] text-[15px]">
              {strings.again}
            </Button>
          </form>
        </div>
      ) : (
        <form action={action} className="flex flex-col gap-[22px]" noValidate>
          <input type="hidden" name="locale" value={locale} />
          <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor={`${id}-website`}>Website</label>
            <input
              id={`${id}-website`}
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <fieldset className="m-0 min-w-0 border-0 p-0">
            <legend className="label-mono mb-[14px] p-0 text-muted">{strings.needLegend}</legend>
            <div className="need-chips flex flex-wrap gap-2">
              {strings.needs.map((need) => (
                <label key={need.value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="need"
                    value={need.value}
                    defaultChecked={need.value === 'both'}
                    className="peer sr-only"
                  />
                  <span className="inline-flex h-11 items-center rounded-pill border border-white/16 px-[18px] font-sans text-[15px] font-medium text-paper-3 transition-colors duration-200 peer-checked:border-paper peer-checked:bg-paper peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-blue-light">
                    {need.label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-4">
            <div className="flex min-w-0 flex-col gap-2">
              <label htmlFor={`${id}-name`} className="text-sm font-medium text-paper-3">
                {strings.name}
              </label>
              <input
                id={`${id}-name`}
                name="name"
                type="text"
                autoComplete="name"
                required
                className={fieldClass}
              />
            </div>
            <div className="flex min-w-0 flex-col gap-2">
              <label htmlFor={`${id}-company`} className="text-sm font-medium text-paper-3">
                {strings.company}{' '}
                <span className="font-normal text-muted-3">{strings.optional}</span>
              </label>
              <input
                id={`${id}-company`}
                name="company"
                type="text"
                autoComplete="organization"
                className={fieldClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor={`${id}-email`} className="text-sm font-medium text-paper-3">
              {strings.email}
            </label>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              required
              className={fieldClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor={`${id}-message`} className="text-sm font-medium text-paper-3">
              {strings.message}
            </label>
            <textarea
              id={`${id}-message`}
              name="message"
              rows={5}
              required
              placeholder={strings.placeholder}
              className="field min-h-[148px] w-full resize-y rounded-tile border border-line-4 bg-ink px-4 py-[14px] font-sans text-base leading-normal text-paper"
            />
          </div>

          <p className="m-0 flex items-start gap-[10px] text-[13.5px] leading-[1.55] text-muted-3">
            <Shield size={18} strokeWidth={1.7} className="mt-px flex-none text-blue-light" />
            <span>
              {strings.privacy}{' '}
              <a href={privacyHref} className="link-u text-paper-3">
                {strings.privacyLink}
              </a>
            </span>
          </p>

          {errorMessage && (
            <p
              role="alert"
              className="m-0 rounded-tile border border-orange/40 bg-orange/10 px-4 py-3 text-sm text-paper"
            >
              {errorMessage}
            </p>
          )}

          <Button
            type="submit"
            disabled={pending}
            className="form-submit self-start disabled:opacity-70"
          >
            {pending ? strings.sending : strings.submit}
          </Button>
        </form>
      )}
    </>
  );
}
