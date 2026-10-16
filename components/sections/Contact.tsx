import { type SiteContent } from '@/content/types';
import { type Locale, localePath } from '@/lib/i18n';
import { site } from '@/lib/site';
import { ContactForm } from '@/components/motion/ContactForm';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Glow } from '@/components/ui/Glow';
import { ArrowUpRight } from '@/components/ui/Icons';

export function Contact({ locale, content }: { locale: Locale; content: SiteContent }) {
  const { contact } = content;
  const row =
    'row-link flex items-center justify-between gap-4 border-b border-line-2 py-[22px] text-paper';

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-bottom pb-section">
      <div className="container-site">
        <div className="rv-media relative overflow-hidden rounded-[32px] border border-line-2 bg-surface p-[clamp(28px,5vw,72px)]">
          <Glow
            color="#FA7F13"
            opacity={0.16}
            blur={130}
            style={{ width: 420, height: 420, left: -140, top: -160 }}
          />
          <Glow
            color="#2065CB"
            opacity={0.22}
            blur={130}
            style={{ width: 460, height: 460, right: -160, bottom: -180 }}
          />

          <div className="contact-grid relative">
            <div className="flex min-w-0 flex-col gap-7">
              <Eyebrow index={contact.index} label={contact.label} />
              <h2
                id="contact-title"
                className="m-0 font-display text-contact leading-none font-medium tracking-[-0.04em] text-balance"
              >
                {contact.title}
              </h2>
              <p className="m-0 max-w-[460px] text-[17px] leading-[1.6] text-muted">
                {contact.text}
              </p>
              <div className="mt-auto flex flex-col border-t border-line-2">
                <a href={`mailto:${site.email}`} className={row}>
                  <span className="flex min-w-0 flex-col gap-1.5">
                    <span className="label-mono-sm text-muted-3">{contact.emailLabel}</span>
                    <span className="font-display text-row font-medium tracking-[-0.025em] [overflow-wrap:anywhere]">
                      {site.email}
                    </span>
                  </span>
                  <ArrowUpRight size={22} strokeWidth={1.7} className="flex-none" />
                </a>
                <a href={site.linkedin} target="_blank" rel="noopener" className={row}>
                  <span className="flex min-w-0 flex-col gap-1.5">
                    <span className="label-mono-sm text-muted-3">{contact.linkedinLabel}</span>
                    <span className="font-display text-row font-medium tracking-[-0.025em]">
                      {contact.linkedinValue}
                    </span>
                  </span>
                  <ArrowUpRight size={22} strokeWidth={1.7} className="flex-none" />
                </a>
              </div>
            </div>

            <div className="relative min-w-0">
              <ContactForm
                locale={locale}
                strings={contact.form}
                privacyHref={localePath(locale, 'privacy')}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
