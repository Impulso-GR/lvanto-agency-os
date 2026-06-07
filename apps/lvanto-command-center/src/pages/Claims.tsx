import { claimsByBrand } from '../data/mockData'
import type { BrandClaims } from '../data/mockData'
import { Chip, PageHeader, SectionTitle } from '../components/ui'

function Column({ title, items, tone }: { title: string; items: string[]; tone: 'green' | 'red' | 'amber' }) {
  const dot = tone === 'green' ? 'bg-emerald-400' : tone === 'red' ? 'bg-red-400' : 'bg-amber-400'
  return (
    <div className="rounded-[10px] border border-hair bg-panel p-3">
      <div className="mb-2 flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
        <span className="section-label">{title}</span>
      </div>
      <ul className="space-y-1.5">
        {items.length ? (
          items.map((c) => (
            <li key={c} className="text-[12px] leading-snug text-mute">
              {c}
            </li>
          ))
        ) : (
          <li className="text-[12px] text-mute2">—</li>
        )}
      </ul>
    </div>
  )
}

function BrandPanel({ b }: { b: BrandClaims }) {
  return (
    <div
      className={`rounded-xl2 border bg-panel2 p-4 ${
        b.highlight ? 'border-accent/40' : 'border-hair'
      }`}
    >
      <div className="mb-3 flex items-center gap-2">
        <h3 className="text-sm font-medium text-warm">{b.brand}</h3>
        {b.highlight && <Chip tone="accent">Protect Pack focus</Chip>}
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <Column title="Allowed" items={b.allowed} tone="green" />
        <Column title="Blocked" items={b.blocked} tone="red" />
        <Column title="Needs data" items={b.needsData} tone="amber" />
      </div>
    </div>
  )
}

export default function Claims() {
  return (
    <>
      <PageHeader
        title="Claims Guard"
        subtitle="Brand-specific claim boundaries — safety surface"
        chip={<Chip tone="gold">safety</Chip>}
      />
      <SectionTitle right={<Chip tone="gray">{claimsByBrand.length} brands</Chip>}>
        Per-brand claim panels
      </SectionTitle>
      <div className="space-y-4">
        {claimsByBrand.map((b) => (
          <BrandPanel key={b.brand} b={b} />
        ))}
      </div>
    </>
  )
}
