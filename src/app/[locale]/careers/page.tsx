'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations, useLocale } from 'next-intl';
import { Award, BookOpen, Users, Star, ArrowRight } from 'lucide-react';
import { getCareers, type StrapiCareer } from '@/lib/strapi';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { PageHero } from '@/components/ui/PageHero';
import { cn } from '@/lib/utils';

const WHY_ICONS = [Award, BookOpen, Users, Star];

const ROLES = [
  'role1', 'role2', 'role3', 'role4', 'role5', 'role6',
] as const;

function StrapiRoleCard({
  career, applyLabel, onApply,
}: { career: StrapiCareer; applyLabel: string; onApply: () => void }) {
  return (
    <article className="group flex flex-col gap-4 border border-line p-8 transition-all duration-300 hover:border-navy hover:shadow-sm">
      <div>
        <p className="text-xs font-bold tracking-[0.22em] text-gold-500 uppercase mb-2">
          {career.type.replace('-', ' ')} · {career.location}
        </p>
        <h3 className="font-display text-[1.1rem] font-semibold text-navy leading-snug">{career.title}</h3>
      </div>
      <p className="text-[15px] leading-[1.8] text-charcoal/60 flex-1">{career.description}</p>
      <button
        onClick={onApply}
        className="group/btn inline-flex items-center gap-2 self-start text-xs font-bold tracking-[0.22em] text-navy uppercase transition-colors hover:text-gold-500"
      >
        {applyLabel}
        <ArrowRight size={12} className="transition-transform group-hover/btn:translate-x-0.5" />
      </button>
    </article>
  );
}

function RoleCard({
  title, type, desc, applyLabel, onApply,
}: {
  title: string; type: string; desc: string; applyLabel: string; onApply: () => void;
}) {
  return (
    <article className="group flex flex-col gap-4 border border-line p-8 transition-all duration-300 hover:border-navy hover:shadow-sm">
      <div>
        <p className="text-xs font-bold tracking-[0.22em] text-gold-500 uppercase mb-2">{type}</p>
        <h3 className="font-display text-[1.1rem] font-semibold text-navy leading-snug">{title}</h3>
      </div>
      <p className="text-[15px] leading-[1.8] text-charcoal/60 flex-1">{desc}</p>
      <button
        onClick={onApply}
        className="group/btn inline-flex items-center gap-2 self-start text-xs font-bold tracking-[0.22em] text-navy uppercase transition-colors hover:text-gold-500"
      >
        {applyLabel}
        <ArrowRight size={12} className="transition-transform group-hover/btn:translate-x-0.5" />
      </button>
    </article>
  );
}

export default function CareersPage() {
  const t = useTranslations('Careers');
  const locale = useLocale();
  const [applyOpen, setApplyOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [careers, setCareers] = useState<StrapiCareer[]>([]);

  useEffect(() => {
    getCareers(locale).then(setCareers).catch(() => setCareers([]));
  }, [locale]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputClass = "w-full border border-line bg-white px-4 py-3 text-[13px] text-charcoal placeholder:text-charcoal/30 outline-none transition-colors focus:border-navy";
  const labelClass = "block text-xs font-bold tracking-[0.22em] text-navy uppercase mb-2";

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">

        <PageHero eyebrow={t('eyebrow')} heading={t('heading')} sub={t('sub')} />

        {/* Why section */}
        <div className="bg-gray py-20 md:py-24">
          <Container>
            <Reveal>
              <h2 className="font-display text-[1.6rem] font-light text-navy md:text-[2rem] mb-12 text-center">
                {t('whyHeading')}
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {(['why1','why2','why3','why4'] as const).map((key, i) => {
                const Icon = WHY_ICONS[i];
                return (
                  <Reveal key={key} delay={i * 80}>
                    <div className="flex flex-col gap-4 bg-white p-8">
                      <div className="flex h-10 w-10 items-center justify-center bg-navy">
                        <Icon size={16} className="text-gold-500" />
                      </div>
                      <h3 className="font-display text-[1rem] font-semibold text-navy">
                        {t(`${key}Title` as Parameters<typeof t>[0])}
                      </h3>
                      <p className="text-[14px] leading-[1.8] text-charcoal/60">
                        {t(`${key}Body` as Parameters<typeof t>[0])}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </div>

        {/* Open roles */}
        <div className="py-20 md:py-28">
          <Container>
            <Reveal>
              <div className="mb-12 flex items-end border-b border-line pb-4 justify-between">
                <h2 className="font-display text-[1.6rem] font-light text-navy md:text-[2rem]">
                  {t('openRolesHeading')}
                </h2>
                <span className="text-xs font-bold tracking-widest text-charcoal/30 uppercase">
                  {ROLES.length} Open
                </span>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(careers.length > 0 ? careers : ROLES.map((r) => ({
                id: r, documentId: r, slug: r, isOpen: true,
                title: t(`${r}Title` as Parameters<typeof t>[0]),
                location: 'Austin, TX', type: 'full-time',
                description: t(`${r}Desc` as Parameters<typeof t>[0]),
              } as unknown as StrapiCareer))).map((career, i) => (
                <Reveal key={career.id} delay={i * 60}>
                  <StrapiRoleCard
                    career={career}
                    applyLabel={t('applyBtn')}
                    onApply={() => setApplyOpen(true)}
                  />
                </Reveal>
              ))}
            </div>

            {/* Open application */}
            <Reveal className="mt-20">
              <div className="border border-line bg-navy p-10 md:p-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-2 max-w-lg">
                  <p className="text-xs font-bold tracking-[0.3em] text-gold-500 uppercase">{t('applyHeading')}</p>
                  <p className="text-[15px] text-white/60 leading-relaxed">{t('applySub')}</p>
                </div>
                <button
                  onClick={() => setApplyOpen(true)}
                  className="shrink-0 border border-gold-500 px-8 py-3 text-xs font-bold tracking-[0.22em] text-gold-500 uppercase transition-colors hover:bg-gold-500 hover:text-navy"
                >
                  {t('applyBtn')}
                </button>
              </div>
            </Reveal>
          </Container>
        </div>

      </main>
      <Footer />
      <ApplyModal
        open={applyOpen}
        submitted={submitted}
        onClose={() => { setApplyOpen(false); setSubmitted(false); }}
        onSubmit={handleSubmit}
        t={t}
        inputClass={inputClass}
        labelClass={labelClass}
      />
    </>
  );
}

function ApplyModal({ open, submitted, onClose, onSubmit, t, inputClass, labelClass }: {
  open: boolean;
  submitted: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
  inputClass: string;
  labelClass: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-99999 flex items-end justify-center md:items-center',
        'transition-all duration-300 ease-in-out',
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      )}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className={cn(
          'relative z-10 w-full max-w-xl bg-white p-8 md:p-12 shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-none',
          'transition-all duration-300 ease-in-out',
          open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-charcoal/30 hover:text-navy transition-colors text-lg leading-none"
        >
          ✕
        </button>

        {submitted ? (
          <div className="flex flex-col gap-4 py-8">
            <div className="h-1.5 w-8 bg-gold-500" />
            <h2 className="font-display text-[1.4rem] font-light text-navy">Application Received</h2>
            <p className="text-[13px] text-charcoal/60 leading-relaxed">
              Thank you for your interest in joining Nexus. We review all applications carefully and will be in touch soon.
            </p>
          </div>
        ) : (
          <>
            <p className="text-xs font-bold tracking-[0.3em] text-gold-500 uppercase mb-2">{t('eyebrow')}</p>
            <h2 className="font-display text-[1.4rem] font-light text-navy mb-8">{t('applyHeading')}</h2>
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
              <div>
                <label className={labelClass}>{t('applyName')}</label>
                <input type="text" required placeholder={t('applyNamePlaceholder')} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>{t('applyEmail')}</label>
                <input type="email" required placeholder={t('applyEmailPlaceholder')} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>{t('applyRole')}</label>
                <input type="text" placeholder={t('applyRolePlaceholder')} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>{t('applyMessage')}</label>
                <textarea rows={5} placeholder={t('applyMessagePlaceholder')} className={`${inputClass} resize-none`} />
              </div>
              <button
                type="submit"
                className="bg-navy py-4 text-xs font-bold tracking-[0.28em] text-white uppercase transition-colors hover:bg-navy/85"
              >
                {t('applySubmit')}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
