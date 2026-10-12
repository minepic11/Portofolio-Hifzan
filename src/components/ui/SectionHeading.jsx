export default function SectionHeading({ number, label, children, className = '' }) {
  return (
    <div className={`section-heading ${className}`}>
      <p className="eyebrow"><span>{number}</span> / {label}</p>
      <h2>{children}</h2>
    </div>
  )
}
