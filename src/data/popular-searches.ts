// "Popular searches" row in the footer, on every page.
//
// Each term must link to a real page that answers it - a product, a grooming
// guide or a journal article. Links to thin, duplicate or search-result pages
// are what Google treats as keyword stuffing; a term earns its place only if
// the destination would satisfy someone who typed it.

export const POPULAR_SEARCHES: { term: string; href: string }[] = [
  { term: 'natural dog shampoo', href: '/dog-grooming' },
  { term: 'sulphate-free dog shampoo', href: '/products/gentle-daily-shampoo-santal-white-tea' },
  { term: 'natural cat shampoo', href: '/cat-grooming' },
  { term: 'dry shampoo for cats', href: '/products/dry-foam-shampoo' },
  { term: 'waterless dog shampoo', href: '/products/dry-foam-shampoo' },
  { term: 'paw cleaner for dogs', href: '/products/paw-cleaner' },
  { term: 'how to clean dog paws after a walk', href: '/journal/paw-cleaner-for-dogs-post-walk-paw-care' },
  { term: 'natural tick spray for dogs', href: '/products/anti-tick-flea-spray' },
  { term: 'how to remove ticks from a dog', href: '/journal/ticks-fleas-and-the-indian-dog' },
  { term: 'dog perfume spray', href: '/products/refreshing-mist' },
  { term: 'why does my dog smell after a bath', href: '/journal/why-your-dog-still-smells-after-a-bath' },
  { term: 'how often to bathe a dog', href: '/journal/how-often-should-you-bathe-your-dog' },
  { term: 'monsoon dog care', href: '/journal/the-monsoon-ritual' },
  { term: 'sandalwood dog shampoo', href: '/products/gentle-daily-shampoo-santal-white-tea' },
  { term: 'fig & neroli dog shampoo', href: '/products/gentle-daily-shampoo-fig-neroli' },
  { term: 'violet leaf dog shampoo', href: '/products/gentle-daily-shampoo-violet-leaf-muslin' },
  { term: 'probiotic pet shampoo', href: '/journal/the-probiotic-question' },
  { term: 'natural pet shampoo ingredients', href: '/ingredients' },
  { term: 'how to read pet shampoo labels', href: '/journal/reading-the-inci-list' },
  { term: 'is natural dog shampoo safer', href: '/journal/what-does-natural-mean-in-pet-care' },
  { term: 'pet shampoo ingredients to avoid', href: '/journal/what-we-found-in-most-pet-shampoos' },
  { term: 'dog grooming FAQ', href: '/faq' },
  { term: 'pet grooming products India', href: '/shop' },
];
