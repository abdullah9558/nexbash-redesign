'use client';

import { useState } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const sendQuery = async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    setSending(true);
    setError('');
    const form = new FormData(formElement);
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const message = String(form.get('message') || '').trim();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Unable to send your query right now.');
      setSent(true);
      formElement.reset();
    } catch (submitError) {
      setError(submitError.message || 'Unable to send your query right now.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="band contact screen" id="contact" data-reveal>
      <div className="contact-shell reveal-child tilt" style={{ '--i': 0 }}>
        <div className="contact-copy">
          <p className="kicker">Contact</p>
          <h2>Send Us Your Query</h2>
          <p className="lede">Tell us the terrain. We reply with a clear next step.</p>
          <div className="contact-pulse" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
        {sent ? (
          <div className="thanks anim-pop">
            <h3>Signal received.</h3>
            <p>We&apos;ll be in touch shortly.</p>
          </div>
        ) : (
          <form
            className="contact-form"
            onSubmit={sendQuery}
          >
            <label className="field-dance" style={{ '--i': 0 }}>
              Name
              <input name="name" required placeholder="Alex Rivera" />
            </label>
            <label className="field-dance" style={{ '--i': 1 }}>
              Email
              <input name="email" type="email" required placeholder="alex@company.com" />
            </label>
            <label className="field-dance" style={{ '--i': 2 }}>
              Notes
              <textarea name="message" rows={4} required placeholder="What are you building?" />
            </label>
            <button type="submit" className="go go-pulse" disabled={sending}>
              {sending ? 'Sending…' : 'Send Query'}
            </button>
            {error && <p className="form-error" role="alert">{error}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
