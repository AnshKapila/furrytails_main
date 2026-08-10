import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Instagram Mockup Rotation
content = content.replace('transform rotate-[-2deg] hover:rotate-0', 'transform rotate-0')

# 2. Amazon and Flipkart logos
old_logos = """<div className="flex items-center justify-center gap-10 md:gap-16">
          <a href="https://amazon.in" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity duration-300" aria-label="Amazon">
            <span className="text-2xl md:text-3xl font-bold tracking-tighter text-[#3B3A38]" style={{ fontFamily: 'var(--font-inter)' }}>amazon</span>
          </a>
          <a href="https://flipkart.com" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity duration-300" aria-label="Flipkart">
            <span className="text-2xl md:text-3xl font-bold tracking-tight text-[#3B3A38] italic" style={{ fontFamily: 'var(--font-inter)', color: '#2874F0' }}>Flipkart</span>
          </a>
        </div>"""
new_logos = """<div className="flex items-center justify-center gap-10 md:gap-16">
          <a href="https://amazon.in" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 saturate-50 hover:saturate-100 transition-all duration-300 w-[100px] md:w-[130px] flex justify-center items-center" aria-label="Amazon">
            <img src="/amazon_logo.png" alt="Amazon" className="w-full object-contain" />
          </a>
          <a href="https://flipkart.com" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 saturate-50 hover:saturate-100 transition-all duration-300 w-[100px] md:w-[130px] flex justify-center items-center" aria-label="Flipkart">
            <img src="/flipkart_logo.png" alt="Flipkart" className="w-full object-contain" />
          </a>
        </div>"""
content = content.replace(old_logos, new_logos)

# 3. Why Furrytail Exists Saturation
old_bp = 'className="object-cover object-center transition-all duration-[1200ms] ease-out hover:scale-[1.015] saturate-[80%] hover:saturate-[110%] sepia-[20%] hover:sepia-0"'
new_bp = 'className="object-cover object-center transition-all duration-[1200ms] ease-out hover:scale-[1.015] saturate-[50%] hover:saturate-[100%] sepia-[20%] hover:sepia-0"'
content = content.replace(old_bp, new_bp)

# 4. A Place To Start (Pillars) - Move button on mobile
old_pillars_btn = """              <SecondaryOutlineBtn
                href="/shop"
                data-kite-cta-id="pillars-explore-all"
                data-kite-role="secondary"
                data-kite-event="range_explored"
              >
                Shop Collection
              </SecondaryOutlineBtn>"""
new_pillars_btn = """              <SecondaryOutlineBtn
                href="/shop"
                className="hidden sm:inline-flex"
                data-kite-cta-id="pillars-explore-all"
                data-kite-role="secondary"
                data-kite-event="range_explored"
              >
                Shop Collection
              </SecondaryOutlineBtn>"""
content = content.replace(old_pillars_btn, new_pillars_btn)

old_pillars_end = """            <PillarAccordionRow />
          </div>
        </section>"""
new_pillars_end = """            <PillarAccordionRow />
            <div className="sm:hidden mt-8 flex justify-center">
              <SecondaryOutlineBtn
                href="/shop"
                data-kite-cta-id="pillars-explore-all-mobile"
                data-kite-role="secondary"
                data-kite-event="range_explored"
              >
                Shop Collection
              </SecondaryOutlineBtn>
            </div>
          </div>
        </section>"""
content = content.replace(old_pillars_end, new_pillars_end)

# 5. Best Sellers - Move button on mobile
old_bestsellers_btn = """              <SecondaryOutlineBtn
                href="/shop"
                data-kite-cta-id="bestsellers-view-all"
                data-kite-role="secondary"
                data-kite-event="range_explored"
              >
                Shop Collection
              </SecondaryOutlineBtn>"""
new_bestsellers_btn = """              <SecondaryOutlineBtn
                href="/shop"
                className="hidden sm:inline-flex"
                data-kite-cta-id="bestsellers-view-all"
                data-kite-role="secondary"
                data-kite-event="range_explored"
              >
                Shop Collection
              </SecondaryOutlineBtn>"""
content = content.replace(old_bestsellers_btn, new_bestsellers_btn)

old_bestsellers_end = """              ))}
            </div>
          </div>
        </RevealSection>"""
new_bestsellers_end = """              ))}
            </div>
            <div className="sm:hidden mt-10 flex justify-center">
              <SecondaryOutlineBtn
                href="/shop"
                data-kite-cta-id="bestsellers-view-all-mobile"
                data-kite-role="secondary"
                data-kite-event="range_explored"
              >
                Shop Collection
              </SecondaryOutlineBtn>
            </div>
          </div>
        </RevealSection>"""
content = content.replace(old_bestsellers_end, new_bestsellers_end)

# 6. CommitmentCardItem - Make mobile friendly with explicit toggle
old_commitment_fn = """function CommitmentCardItem({ commitment }: { commitment: typeof CORE_COMMITMENTS[number] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className="group relative overflow-hidden rounded-[2px] cursor-pointer min-h-[340px] md:min-h-[400px] flex flex-col justify-end p-6 md:p-8 transition-all duration-700 ease-out border border-[#E9E2D7]/60 hover:border-[#8D9A83]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}"""
new_commitment_fn = """function CommitmentCardItem({ commitment }: { commitment: typeof CORE_COMMITMENTS[number] }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const isOpen = isHovered || isToggled;

  return (
    <article
      className="group relative overflow-hidden rounded-[2px] cursor-pointer min-h-[340px] md:min-h-[400px] flex flex-col justify-end p-6 md:p-8 transition-all duration-700 ease-out border border-[#E9E2D7]/60 hover:border-[#8D9A83]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onClick={() => setIsToggled(!isToggled)}"""
content = content.replace(old_commitment_fn, new_commitment_fn)

commitment_card_body = content.split("function CommitmentCardItem")[1].split("</article>")[0]
new_commitment_card_body = commitment_card_body.replace("isHovered ?", "isOpen ?")
new_commitment_card_body = new_commitment_card_body.replace("aria-expanded={isHovered}", "aria-expanded={isOpen}")

toggle_button = """        <div
          className="overflow-hidden transition-all duration-500 ease-out"
          style={{
            maxHeight: isOpen ? '200px' : '0px',
            opacity: isOpen ? 1 : 0,
            marginTop: isOpen ? '12px' : '0px',
          }}
        >"""
new_toggle_button = """        {/* Mobile Read More Indicator */}
        <div className="absolute right-6 bottom-6 md:hidden text-[#F8F5F1] transition-transform duration-500" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>

        <div
          className="overflow-hidden transition-all duration-500 ease-out pr-8 md:pr-0"
          style={{
            maxHeight: isOpen ? '200px' : '0px',
            opacity: isOpen ? 1 : 0,
            marginTop: isOpen ? '12px' : '0px',
          }}
        >"""
new_commitment_card_body = new_commitment_card_body.replace(toggle_button, new_toggle_button)
content = content.split("function CommitmentCardItem")[0] + "function CommitmentCardItem" + new_commitment_card_body + "</article>" + content.split("function CommitmentCardItem")[1].split("</article>")[1]

# 7. MobilePillarItem - Remove auto open and add Read More
old_mobile_pillar_fn = """function MobilePillarItem({ pillar, idx }: { pillar: typeof pillars[number]; idx: number }) {
  const [userToggled, setUserToggled] = useState<boolean | null>(null);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isOpen = userToggled !== null ? userToggled : inView;"""
new_mobile_pillar_fn = """function MobilePillarItem({ pillar, idx }: { pillar: typeof pillars[number]; idx: number }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLElement>(null);"""
content = content.replace(old_mobile_pillar_fn, new_mobile_pillar_fn)

content = content.replace("const handleToggle = () => setUserToggled(!isOpen);", "const handleToggle = () => setIsOpen(!isOpen);")

mobile_pillar_body = content.split("function MobilePillarItem")[1].split("</article>")[0]
toggle_indicator = """        <div className="overflow-hidden" style={{ maxHeight: isOpen ? '240px' : '0px', opacity: isOpen ? 1 : 0, marginTop: isOpen ? '12px' : '0px', transition: 'max-height 800ms cubic-bezier(0.4, 0, 0.2, 1), opacity 700ms ease-out, margin-top 800ms ease-out' }}>"""
new_toggle_indicator = """        <div className="absolute right-5 bottom-8 text-[#F8F5F1] transition-transform duration-500" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>

        <div className="overflow-hidden pr-8" style={{ maxHeight: isOpen ? '240px' : '0px', opacity: isOpen ? 1 : 0, marginTop: isOpen ? '12px' : '0px', transition: 'max-height 800ms cubic-bezier(0.4, 0, 0.2, 1), opacity 700ms ease-out, margin-top 800ms ease-out' }}>"""
new_mobile_pillar_body = mobile_pillar_body.replace(toggle_indicator, new_toggle_indicator)

content = content.split("function MobilePillarItem")[0] + "function MobilePillarItem" + new_mobile_pillar_body + "</article>" + content.split("function MobilePillarItem")[1].split("</article>")[1]

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

# 8. FeaturedIngredients - Move button
with open('src/components/FeaturedIngredients.tsx', 'r', encoding='utf-8') as f:
    fi_content = f.read()

old_fi_btn = """            <SecondaryOutlineBtn
              href="/ingredients"
              data-kite-cta-id="ingredients-view-all"
              data-kite-role="secondary"
              data-kite-event="ingredients_explored"
            >
              View All Ingredients
            </SecondaryOutlineBtn>"""
new_fi_btn = """            <SecondaryOutlineBtn
              href="/ingredients"
              className="hidden md:inline-flex"
              data-kite-cta-id="ingredients-view-all"
              data-kite-role="secondary"
              data-kite-event="ingredients_explored"
            >
              View All Ingredients
            </SecondaryOutlineBtn>"""
fi_content = fi_content.replace(old_fi_btn, new_fi_btn)

old_fi_end = """        {/* sr-only chapter markers for a11y */}"""
new_fi_end = """        <div className="md:hidden w-full flex justify-center py-10 bg-[#F8F5F1] border-t border-[#E9E2D7]">
          <SecondaryOutlineBtn
            href="/ingredients"
            data-kite-cta-id="ingredients-view-all-mobile"
            data-kite-role="secondary"
          >
            View All Ingredients
          </SecondaryOutlineBtn>
        </div>

        {/* sr-only chapter markers for a11y */}"""
fi_content = fi_content.replace(old_fi_end, new_fi_end)

with open('src/components/FeaturedIngredients.tsx', 'w', encoding='utf-8') as f:
    f.write(fi_content)

print("Updates applied")
