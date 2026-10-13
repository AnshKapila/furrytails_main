import { ARTICLE_AUTHORS } from '@/lib/journal';

// "About the authors" at the end of every journal article. The same people and
// credentials are the Person authors in the article's BlogPosting JSON-LD, so
// readers and search engines see one consistent byline.
export default function ArticleAuthors() {
  return (
    <section
      aria-labelledby="article-authors"
      className="max-w-[700px] mx-auto px-6 md:px-8 mt-16 md:mt-20"
    >
      <div className="border-t border-[#E9E2D7] pt-10">
        <p
          id="article-authors"
          className="text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#8D9A83] mb-6"
        >
          About the authors
        </p>
        <ul className="grid gap-6 sm:grid-cols-2">
          {ARTICLE_AUTHORS.map((a) => (
            <li key={a.name}>
              <p className="font-display text-[1.375rem] font-light text-[#3B3A38] leading-tight">{a.name}</p>
              <p className="mt-1 text-[0.875rem] font-light text-[#68735F] leading-[1.6]">{a.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
