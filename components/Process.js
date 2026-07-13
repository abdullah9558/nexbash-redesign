export default function Process({ process = [] }) {
  return (
    <section className="bg2" id="process">
      <div className="eyebrow">PROCESS</div>
      <h2>From idea to launch — the journey we take together</h2>
      <div className="steps">
        {process.flatMap((p, i) => {
          const nodes = [
            <div className={`step${i === 0 ? ' first' : ''}`} tabIndex={0} key={p.name}>
              <div className="step-tooltip">{p.tip}</div>
              <div className="circle">{p.step}</div>
              <span>{p.name}</span>
            </div>,
          ];
          if (i < process.length - 1) {
            nodes.push(<div className="line" key={`line-${p.name}`} />);
          }
          return nodes;
        })}
      </div>
    </section>
  );
}
