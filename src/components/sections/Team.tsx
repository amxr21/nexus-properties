import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { SectionHeadingBlock } from '@/components/ui/SectionHeadingBlock';
import { getTeamMembers, getMediaUrl, type StrapiTeamMember } from '@/lib/strapi';

export async function Team({ locale }: { locale: string }) {
  const t = await getTranslations('Team');
  const members: StrapiTeamMember[] = await getTeamMembers(locale).catch(() => []);

  if (members.length === 0) return null;

  return (
    <section aria-label="Our team" className="bg-white py-20 md:py-28">
      <Container>
        <SectionHeadingBlock
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          sub={t('intro')}
          center
          className="mb-16"
        />

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {members.map((member) => {
            const imageSrc = getMediaUrl(member.image?.url) ?? '/images/worker 1.jpg';
            return (
              <article key={member.id} className="group flex flex-col">
                <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-200">
                  <Image
                    src={imageSrc}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
                <div className="mt-4 flex flex-col gap-1">
                  <h3 className="font-display text-[15px] font-semibold text-navy leading-tight">
                    {member.name}
                  </h3>
                  <span className="text-[10px] font-medium tracking-[0.14em] text-charcoal/45 uppercase">
                    {member.role}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
