import re

with open('src/app/shop/ShopClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update states and constants
states_regex = re.compile(
    r"const \[activeRitual, setActiveRitual\] = useState<string>\('All'\);.*?"
    r"const TYPE_FILTERS = \['Shampoo', 'Supplement', 'Balm'\];",
    re.DOTALL
)

new_states = '''const [activeRitual, setActiveRitual] = useState<string>('All');
  const [activePet, setActivePet] = useState<string>('All pets');
  const [activeSort, setActiveSort] = useState<SortValue>('default');

  const [filterHovered, setFilterHovered] = useState(false);
  const [filterPinned, setFilterPinned] = useState(false);
  const filterOpen = filterHovered || filterPinned;

  const [sortHovered, setSortHovered] = useState(false);
  const [sortPinned, setSortPinned] = useState(false);
  const sortOpen = sortHovered || sortPinned;

  const [ritualHovered, setRitualHovered] = useState(false);
  const [ritualPinned, setRitualPinned] = useState(true);
  const ritualOpen = ritualHovered || ritualPinned;

  const [petHovered, setPetHovered] = useState(false);
  const [petPinned, setPetPinned] = useState(false);
  const petOpen = petHovered || petPinned;

  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  const RITUAL_FILTERS = [
    { label: 'Ritual', id: 'Daily Ritual' },
    { label: 'Defense', id: 'Defense' },
    { label: 'Refresh', id: 'Refresh' },
    { label: 'Remedy', id: 'Remedy' }
  ];
  const PET_FILTERS = ['Dog', 'Cat', 'Dog & Cat'];'''
content = states_regex.sub(new_states, content)

# 2. Update filter matching logic
filter_logic_regex = re.compile(
    r"const baseFiltered = products\.filter\(\(p\) => \{.*?"
    r"return ritualMatch && petMatch && typeMatch;\n    \}\);",
    re.DOTALL
)

new_filter_logic = '''const baseFiltered = products.filter((p) => {
      const prod = p as any;
      const ritualMatch = activeRitual === 'All' || p.category === activeRitual;
      
      let petMatch = activePet === 'All pets';
      if (!petMatch && prod.species) {
        if (activePet === 'Dog & Cat') petMatch = prod.species === 'both';
        else if (activePet === 'Dog') petMatch = prod.species === 'dog' || prod.species === 'both';
        else if (activePet === 'Cat') petMatch = prod.species === 'cat' || prod.species === 'both';
      }
      
      return ritualMatch && petMatch;
    });'''
content = filter_logic_regex.sub(new_filter_logic, content)

# 3. Update hasActiveFilter and activeFilterCount
has_filter_regex = re.compile(
    r"const hasActiveFilter = activeRitual !== 'All' \|\| activePet !== 'All pets' \|\| activeType !== 'All types';\n"
    r"  const activeFilterCount = \(activeRitual !== 'All' \? 1 : 0\) \+ \(activePet !== 'All pets' \? 1 : 0\) \+ \(activeType !== 'All types' \? 1 : 0\);"
)

new_has_filter = '''const hasActiveFilter = activeRitual !== 'All' || activePet !== 'All pets';
  const activeFilterCount = (activeRitual !== 'All' ? 1 : 0) + (activePet !== 'All pets' ? 1 : 0);'''
content = has_filter_regex.sub(new_has_filter, content)

# 4. Update clear button onClick
clear_btn_regex = re.compile(r"onClick=\{\(\) => \{ setActiveRitual\('All'\); setActivePet\('All pets'\); setActiveType\('All types'\); \}\}")
content = clear_btn_regex.sub("onClick={() => { setActiveRitual('All'); setActivePet('All pets'); }}", content)


# 5. Update filter dropdown UI
ui_regex = re.compile(
    r"<div>\n\s*<button type=\"button\" onClick=\{\(\) => setRitualPinned.*?"
    r"\{type\}\</button>\n\s*\)\)\}\n\s*</div>\n\s*</div>",
    re.DOTALL
)

new_ui = '''<div>
                    <button type="button" onClick={() => setRitualPinned((v) => !v)} onMouseEnter={() => setRitualHovered(true)} onMouseLeave={() => setRitualHovered(false)} className="w-full flex items-center justify-between px-4 py-3 text-[0.75rem] font-normal text-[#3B3A38] hover:text-[#68735F] focus:outline-none border-b border-[#E9E2D7]">
                      <span>Ritual</span><ChevronIcon open={ritualOpen} />
                    </button>
                    <div className={px-4 pb-4 pt-2 flex flex-wrap gap-1.5 border-b border-[#E9E2D7] }>
                      <button type="button" onClick={() => setActiveRitual('All')} className={px-2.5 py-1 text-[0.625rem] font-normal tracking-[0.04em] rounded-[2px] transition-colors }>All</button>
                      {RITUAL_FILTERS.map((cat) => (
                        <button key={cat.id} type="button" onClick={() => setActiveRitual(cat.id)} className={px-2.5 py-1 text-[0.625rem] font-normal tracking-[0.04em] rounded-[2px] transition-colors }>{cat.label}</button>
                      ))}
                    </div>
                    
                    <button type="button" onClick={() => setPetPinned((v) => !v)} onMouseEnter={() => setPetHovered(true)} onMouseLeave={() => setPetHovered(false)} className="w-full flex items-center justify-between px-4 py-3 text-[0.75rem] font-normal text-[#3B3A38] hover:text-[#68735F] focus:outline-none border-b border-[#E9E2D7]">
                      <span>Pet</span><ChevronIcon open={petOpen} />
                    </button>
                    <div className={px-4 pb-4 pt-2 flex flex-wrap gap-1.5 }>
                      {PET_FILTERS.map((pet) => (
                        <button key={pet} type="button" onClick={() => setActivePet(pet)} className={px-2.5 py-1 text-[0.625rem] font-normal tracking-[0.04em] rounded-[2px] transition-colors }>{pet}</button>
                      ))}
                    </div>
                  </div>'''
content = ui_regex.sub(new_ui, content)

with open('src/app/shop/ShopClient.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
