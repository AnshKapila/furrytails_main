# SEO keyword plan

Researched 2026-10-12 from Google India autocomplete (`gl=in`) and a scan of who
ranks today. Autocomplete shows what people in India actually type and roughly
how popular a phrasing is, **not** monthly volume. Before committing to a big
piece, check the volume in Google Keyword Planner (location: India); once the
site has been live a few weeks, Search Console > Performance shows the real
queries we already get impressions for - those beat any tool.

## Ground rules

- Target queries we can answer honestly. Skip medicine/treatment intent
  ("dog itching medicine", "skin infection shampoo", "ticks tablet"), price /
  "near me" / service queries, and other brands' names. We can write *about*
  itching or ticks with a clear vet boundary, but never sell a product as a fix.
- One page per intent. A new article gets the long-tail; the product or
  landing page keeps the commercial phrase.
- Every new article: add 1-2 phrases to `src/data/popular-searches.ts`.

## A. Quick wins: work these into existing pages

**Done 2026-10-12.** Product pages take their title, meta description and an
FAQ block (with FAQPage JSON-LD) from `src/data/product-seo.ts`; landing-page
copy is in `src/data/landing.ts`; journal FAQs are in each article's page.

| Page | Add these phrases (title, intro, H2s or FAQs) |
|---|---|
| `/products/refreshing-mist` | dog perfume spray, dog deodorant spray, dog smell remover spray |
| `/products/dry-foam-shampoo` | dog shampoo without water, dry shampoo for dogs how to use, cat dry shampoo, how to keep dog clean between baths |
| `/products/paw-cleaner` | dog paw cleaner spray / foam, how to keep dog clean after walk |
| `/products/anti-tick-flea-spray` | tick spray for dogs, natural tick repellent for dogs, tick spray for street dogs |
| Gentle Daily Shampoo pages + `/dog-grooming` | sulphate free dog shampoo, paraben and sulphate free dog shampoo, natural dog shampoo for sensitive skin, best dog shampoo in India |
| `/cat-grooming` | cat shampoo, can you bathe a cat with dog shampoo, cat dry shampoo |
| Journal: ticks article | how to remove ticks from dog at home, ticks on dogs ears, what attracts dog ticks |
| Journal: smells-after-bath | dog smells bad even after bath, dog smells bad when wet, get rid of dog smell on dog naturally |
| Journal: how often to bathe | can I bathe my dog once a week / daily / twice a week |
| Journal: what we found / natural | dog shampoo ingredients to avoid, dog shampoo pH level vs human |

## Amazon.in search suggestions (2026-10-12)

Read from the amazon.in search box. Buyers there search by **head term + need**:

- dog shampoo: tick and flea, and conditioner, for itchy skin, for hair fall control, for shih tzu / golden retriever / labrador / german shepherd / pomeranian / husky / poodle, **neem**, natural, **nice smell**, no tears, 1 ltr / 5 litre
- cat shampoo: for persian cat, for kitten, for ticks and fleas, and conditioner, under 100
- pet shampoo: for dogs, for cats, for dogs shih tzu, and conditioner, combo
- puppy shampoo: for small dogs, for shih tzu, gentle formula, organic
- dog perfume: spray, **long lasting**, for shih tzu, vanilla
- dog dry shampoo: spray, foam, waterless, powder
- dog paw cleaner: foam / foaming (cups and machines dominate otherwise)
- tick spray for dogs: natural, and cats, lick safe, tick and flea spray

Acted on: "dog shampoo" / "cat shampoo" / "pet shampoo" now lead the titles and
H1s of /dog-grooming, /cat-grooming and /shop; shampoo FAQs cover neem & aloe
vera, nice smell and conditioner; Refreshing Mist covers long-lasting; cat page
covers Persian / long-haired cats. Breed demand on Amazon confirms B5 (add
German Shepherd, Pomeranian and Persian cat to the series). Do **not** target
"no tears", "itchy skin" or "hair fall control" as product claims - the label
does not support them.

## B. New articles, in priority order

| # | Working title | Core queries | Links to |
|---|---|---|---|
| 1 | Can I use human shampoo on my dog (or cat)? | can i use human shampoo on my dog / cat / puppy, dog shampoo pH vs human | Gentle Daily Shampoo, INCI list |
| 2 | How to bathe a dog at home, step by step | how to bathe a dog at home, dog that hates water, how to bathe a puppy first time, when can puppies take a bath | how often, smells-after-bath |
| 3 | The drying step: how to dry a dog after a bath | how to dry a dog after bath / fast / without hair dryer / ears | smells-after-bath, monsoon |
| 4 | How to keep your dog clean between baths | keep dog clean between baths / without bathing / after walk | Dry Foam, Paw Cleaner, Refreshing Mist |
| 5 | Breed series: grooming a Shih Tzu / Golden Retriever / Labrador at home | shih tzu grooming at home, best shampoo for golden retriever / shih tzu / labrador | Gentle Daily Shampoo |
| 6 | Why is my dog licking its paws? | dog licking paws (too much, meaning), red itchy paws | paw problem, vet boundary |
| 7 | Dog hair fall vs normal shedding | dog hair fall, dog shedding season, labrador hair fall | how often, drying |
| 8 | Essential oils and pets: what's safe | is lavender safe for dogs, essential oils for dogs ticks, essential oils for cats | santal primer, natural |
| 9 | How to get rid of dog smell in the house | dog smell in house / on couch / blankets | smells-after-bath, Refreshing Mist |
| 10 | Can you bathe a cat? | can you bathe a cat, cat bathing, cat dry shampoo | cat grooming, Dry Foam |
| 11 | Neem, coconut oil and other home remedies: what the evidence says | neem for dogs skin, coconut oil for dogs skin/paws, homemade dog shampoo | natural, INCI |
| 12 | Summer dog care in India | summer dog care tips, how to take care of dogs in summer | monsoon (seasonal pair) |
| 13 | Dog dandruff and dry skin: grooming vs a vet visit | dog dandruff causes, dog dry skin | how often, vet boundary |

## C. Journal pipeline (2026-10-12)

From "Proposed Journal title.docx" + this plan. Published: How often to bathe,
Ticks & fleas, The Paw Problem, What "natural" means, Why your dog still smells.

Drafted in `docs/journal-drafts/` (text, SEO metadata, FAQs, links, image
brief) - publish when images arrive:

1. Why Human Shampoo Doesn't Belong in Your Dog's Bath (`can-i-use-human-shampoo-on-my-dog`)
2. Dry Bath vs. Wet Bath (`dry-bath-vs-wet-bath-for-dogs`) - absorbs "keep clean between baths"
3. How to Bathe a Dog at Home (`how-to-bathe-a-dog-at-home`) - built on the carton bath ritual
4. Shih Tzu Grooming at Home (`shih-tzu-grooming-at-home`) - first of the breed series

Later: #9 "What makes a good dog shampoo" only as a short buying guide (overlaps
What We Found + INCI); #10 humid weather -> expand The Monsoon Ritual or retarget
to summer heat; #6 essential oils -> on hold (products contain essential oils;
user does not want them raised as a concern).
