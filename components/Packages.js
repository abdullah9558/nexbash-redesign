export default function Packages({ packages = [] }) {
  return (
    <section id="packages">
      <div className="eyebrow">PACKAGES</div>
      <h2>What you&apos;ll get — not just what we do</h2>
      <div className="grid3">
        {packages.map((pkg) => (
          <div className={`pkg${pkg.highlight ? ' highlight' : ''}`} key={pkg.name}>
            {pkg.badge ? <div className="badge2">{pkg.badge}</div> : null}
            <h3>{pkg.name}</h3>
            <div className="desc">{pkg.desc}</div>
            <hr className="div" />
            <ul className="check">
              {pkg.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
