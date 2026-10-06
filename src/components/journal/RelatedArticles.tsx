import Image from 'next/image';
import Link from 'next/link';
import { articlePath, type JournalArticle } from '@/lib/journal';

// "Continue reading" grid. Used under each article (its curated related list)
// and on product pages (articles that discuss that product).
export default function RelatedArticles({
  articles,
  eyebrow = 'Continue reading',
  heading = 'More from the journal.',
}: {
  articles: JournalArticle[];
  eyebrow?: string;
  heading?: string;
}) {
  if (articles.length === 0) return null;

  return (
    <section
      aria-labelledby="related-articles-heading"
      className="max-w-[1200px] mx-auto px-6 md:px-8 mt-32 border-t border-[#E9E2D7] pt-16"
    >
      <div className="text-center mb-12">
        <p className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#BEB8AF] mb-3">{eyebrow}</p>
        <h2 id="related-articles-heading" className="text-2xl md:text-3xl font-display text-[#3B3A38]">
          {heading}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {articles.map((a) => (
          <Link key={a.slug} href={articlePath(a.slug)} className="group flex flex-col gap-5 outline-none">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-[#E9E2D7]">
              <Image
                src={a.image.src}
                alt={a.image.alt}
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div>
              <div className="text-[0.6875rem] font-normal tracking-[0.06em] text-[#8D9A83] uppercase mb-2 flex items-center gap-2">
                <span>{a.category}</span>
                <span className="w-1 h-1 rounded-full bg-[#E9E2D7]" />
                <span>{a.readTime}</span>
              </div>
              <h3 className="text-[1.375rem] leading-[1.2] font-display text-[#3B3A38] mb-2 transition-colors duration-300 group-hover:text-[#68735F]">
                {a.title}
              </h3>
              <p className="text-[0.875rem] font-light text-[#3B3A38]/80 leading-[1.6] line-clamp-3">{a.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
