import React from "react";

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-6 fade-in page-container">      
      <div className="tag-label text-accent-red">About</div>
      <h1 className="headline-xl mt-3 text-foreground max-w-4xl" style={{fontSize: "clamp(1.8rem, 6vw, 3.5rem)", lineHeight: 1.05}}>
        A newsroom for the second space age.
      </h1>
      <p className="mt-6 text-muted-foreground leading-relaxed serif max-w-4xl" style={{fontSize: "clamp(1rem, 2.5vw, 1.25rem)"}}>
        Orbit Dispatch is an independent digital newsroom that aggregates, verifies, and contextualizes reporting from the world's best spaceflight publications. We don't chase clicks. We chase orbits.
      </p>

      {/* Stats Counter Section */}
      <div className="about-stats-grid">
        <div>
          <div className="serif text-5xl font-bold text-foreground">34k+</div>
          <div className="tag-label text-muted-foreground mt-1.5">Articles Archived</div>
        </div>
        <div>
          <div className="serif text-5xl font-bold text-foreground">60+</div>
          <div className="tag-label text-muted-foreground mt-1.5">Source Publications</div>
        </div>
        <div>
          <div className="serif text-5xl font-bold text-foreground">24/7</div>
          <div className="tag-label text-muted-foreground mt-1.5">Live Updates</div>
        </div>
      </div>

      {/* Principles Section below stats */}
      <div style={{marginTop: "5rem", paddingTop: "1.5rem"}} className="max-w-4xl">
        <h2 className="serif text-3xl md:text-4xl text-foreground font-bold mb-6">Our principles</h2>
        <ul className="about-principles-list">
          <li>
            <strong className="text-foreground font-semibold">Sources before scoops.</strong> Every story links to its origin publication.
          </li>
          <li>
            <strong className="text-foreground font-semibold">No ads, no trackers.</strong> Reading the news shouldn't cost your privacy.
          </li>
          <li>
            <strong className="text-foreground font-semibold">Built in the open.</strong> Powered by the Spaceflight News API.
          </li>
        </ul>
      </div>
    </div>
  );
}
