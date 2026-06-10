import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setFormData({ name: "", email: "", message: "" });
      // Clear success notification after 5 seconds
      setTimeout(() => setSent(false), 5000);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="mx-auto max-w-6xl px-6 contact-grid fade-in page-container">
      {/* Left Column: Details */}
      <div>
        <div className="tag-label text-accent-red">Contact</div>
        <h1 className="headline-xl mt-3 text-5xl text-foreground">Tip line open.</h1>
        <p className="mt-6 text-muted-foreground serif text-lg max-w-md">
          Have a story, correction, or partnership in mind? We read every message.
        </p>
      </div>

      {/* Right Column: Form */}
      <div>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="contact-form-group">
            <label className="tag-label text-muted-foreground block">Name</label>
            <input 
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-12 border border-foreground bg-transparent px-4 outline-none text-foreground text-base focus:border-accent-red transition-colors rounded-none"
            />
          </div>
          <div className="contact-form-group">
            <label className="tag-label text-muted-foreground block">Email</label>
            <input 
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-12 border border-foreground bg-transparent px-4 outline-none text-foreground text-base focus:border-accent-red transition-colors rounded-none"
            />
          </div>
          <div className="contact-form-group">
            <label className="tag-label text-muted-foreground block">Message</label>
            <textarea 
              required
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="w-full min-h-[120px] border border-foreground bg-transparent p-4 outline-none text-foreground text-base focus:border-accent-red transition-colors resize-none rounded-none"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="form-submit-btn"
          >
            {loading ? "Sending..." : "Send message"}
          </button>
        </form>

        {sent && (
          <div className="mt-4 border border-accent-red p-4 bg-muted/10 flex items-start gap-3 rounded-sm animate-in fade-in duration-300">
            <CheckCircle2 className="w-5 h-5 text-accent-red shrink-0" />
            <div>
              <h4 className="tag-label text-accent-red font-bold text-xs">Message Sent</h4>
              <p className="text-sm text-muted-foreground mt-0.5 serif">
                Your message has been delivered to the newsroom. Thank you.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
