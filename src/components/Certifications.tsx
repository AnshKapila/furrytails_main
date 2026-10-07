import Image from 'next/image';

// Certifications row below the customer videos.
//
// Each line must be backed by a current certificate or registration you can
// produce on request (manufacturer's GMP certificate, FDA facility
// registration number, ISO 16128 natural-origin calculation).
//
// The FDA badge is deliberately our own drawing, not the FDA logo: the FDA
// does not allow private use of its logo, and registration of a facility is
// not FDA approval of the product - the label says exactly what is true.

function FacilityBadge() {
  return (
    <svg viewBox="0 0 160 160" className="w-full h-full text-[#3B3A38]" fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="80" cy="80" r="74" strokeWidth="3" />
      <circle cx="80" cy="80" r="64" strokeWidth="1.2" strokeDasharray="2 4" />
      {/* Factory */}
      <path d="M44 104V70l18 11V70l18 11V58h14v46z" strokeWidth="3" strokeLinejoin="round" />
      <path d="M100 104V76h14v28M38 104h84" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M58 94h6m10 0h6m10 0h6" strokeWidth="3" strokeLinecap="round" />
      <text x="80" y="128" textAnchor="middle" fill="currentColor" stroke="none" fontSize="13" fontWeight="700" letterSpacing="2" fontFamily="Inter, Arial, sans-serif">
        FDA
      </text>
      <text x="80" y="47" textAnchor="middle" fill="currentColor" stroke="none" fontSize="9" fontWeight="600" letterSpacing="1.5" fontFamily="Inter, Arial, sans-serif">
        REGISTERED
      </text>
    </svg>
  );
}

const CERTIFICATIONS: { label: string; detail: string; logo: React.ReactNode }[] = [
  {
    label: 'ISO 16128',
    detail: 'Natural origin calculated to the international standard',
    logo: <Image src="/certifications/iso-16128.webp" alt="ISO 16128 natural derived" fill sizes="112px" className="object-contain" />,
  },
  {
    label: 'GMP Certified',
    detail: 'Made under Good Manufacturing Practice',
    logo: <Image src="/certifications/gmp.webp" alt="GMP certified - Good Manufacturing Practice" fill sizes="112px" className="object-contain" />,
  },
  {
    label: 'FDA-Registered Facility',
    detail: 'Manufactured in an FDA-registered facility',
    logo: <FacilityBadge />,
  },
];

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="pt-4 md:pt-6 bg-[#F8F5F1]"
      data-kite-surface="home.certifications"
      data-kite-surface-type="features"
    >
      {/* Heading sits on the page background; only the logos get the band */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <h2
          className="text-[#3B3A38] mb-8 md:mb-10"
          style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 3.2vw, 2.625rem)', fontWeight: 300, lineHeight: 1.15 }}
        >
          Certifications
        </h2>
      </div>
      <div className="bg-[#EDE7DF] py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <ul className="grid grid-cols-3 gap-4 sm:gap-10 md:gap-16 max-w-[900px]">
          {CERTIFICATIONS.map((c) => (
            <li key={c.label} className="flex flex-col items-center text-center">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">{c.logo}</div>
              <p className="mt-4 sm:mt-5 text-[#3B3A38] text-[0.8125rem] sm:text-[1rem] font-normal">{c.label}</p>
              <p className="hidden sm:block mt-1 text-[0.8125rem] font-light text-[#3B3A38]/70 max-w-[220px]">{c.detail}</p>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </section>
  );
}
