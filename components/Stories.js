export default function Stories({ stories = [] }) {
  return (
    <section id="stories">
      <div className="eyebrow">SUCCESS STORIES</div>
      <h2>Real problems, real solutions, real results</h2>
      <div className="grid3">
        {stories.map((s) => (
          <div className="story" data-story={s.id} key={s.id}>
            <div className="story-body">
              <div className="lbl">PROBLEM</div>
              {s.problem}
              <div className="lbl sol">↓ SOLUTION</div>
              {s.solution}
              <div className="lbl res">↓ RESULT</div>
              <div className="result">{s.result}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
