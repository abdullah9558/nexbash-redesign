'use client';

import { useState } from 'react';
import { API } from './Nav';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', text: '' });

    try {
      const res = await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      setStatus({ type: 'ok', text: 'Thanks — we got your message and will reply soon.' });
      setForm({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      setStatus({ type: 'err', text: err.message || 'Could not send message' });
    } finally {
      setLoading(false);
    }
  }

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  return (
    <>
      <section className="cta-section">
        <div>
          <h2 style={{ marginBottom: 12, color: 'var(--text)' }}>
            Ready to see exactly what you&apos;ll get?
          </h2>
          <p className="sub" style={{ color: 'var(--sub)' }}>
            Tell us what you&apos;re building and we&apos;ll map out the deliverables, timeline, and
            outcome — no jargon.
          </p>
          <a href="#contact" className="btn btn-sm">
            Start Your Project →
          </a>
        </div>
      </section>

      <section id="contact" style={{ minHeight: 'auto', paddingTop: 36, paddingBottom: 36 }}>
        <div className="eyebrow">CONTACT</div>
        <h2>Start a conversation</h2>
        <p className="sub">Share a bit about your project and we&apos;ll get back to you.</p>
        <form
          onSubmit={onSubmit}
          style={{
            maxWidth: 640,
            margin: '0 auto',
            display: 'grid',
            gap: 14,
            width: '100%',
          }}
        >
          <input
            required
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={update('name')}
            style={fieldStyle}
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Work email"
            value={form.email}
            onChange={update('email')}
            style={fieldStyle}
          />
          <input
            name="company"
            placeholder="Company (optional)"
            value={form.company}
            onChange={update('company')}
            style={fieldStyle}
          />
          <textarea
            required
            name="message"
            placeholder="What are you building?"
            rows={5}
            value={form.message}
            onChange={update('message')}
            style={{ ...fieldStyle, resize: 'vertical' }}
          />
          <button className="btn" type="submit" disabled={loading} style={{ justifySelf: 'start' }}>
            {loading ? 'Sending…' : 'Send message'}
          </button>
          {status.text ? (
            <p style={{ color: status.type === 'ok' ? 'var(--green)' : '#c0392b', margin: 0 }}>
              {status.text}
            </p>
          ) : null}
        </form>
      </section>
    </>
  );
}

const fieldStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 10,
  border: '1px solid var(--border)',
  background: '#1a2b44',
  color: '#ffffff',
  fontSize: 15,
  fontFamily: 'inherit',
};
