import React from "react";
import { Link } from "react-router-dom";

export default function Legal({ defaultTab = "terms" }) {
  const renderContent = () => {
    switch (defaultTab) {
      case "terms":
        return (
          <div className="fade-in">
            <div className="tag-label text-accent-red">Legal</div>
            <h1 className="headline-xl mt-3 text-5xl text-foreground">Terms of Service</h1>
            <div className="tag-label text-muted-foreground mt-2" style={{ marginBottom: "3rem" }}>Last Updated: June 2026</div>
            
            <div className="space-y-8 serif text-base md:text-lg leading-relaxed text-muted-foreground">
              <p>
                By accessing Orbit Dispatch you agree to these terms. Orbit Dispatch is a demonstration project; content is aggregated from third-party publishers via the Spaceflight News API.
              </p>
              
              <div>
                <h2 className="serif text-xl md:text-2xl font-bold text-foreground mb-2">Use of the service</h2>
                <p>
                  You may read and share article links freely. Do not attempt to disrupt service or scrape at unreasonable rates.
                </p>
              </div>
              
              <div>
                <h2 className="serif text-xl md:text-2xl font-bold text-foreground mb-2">Content ownership</h2>
                <p>
                  All article copy, images, and headlines belong to their original publishers. Orbit Dispatch claims no rights over third-party content.
                </p>
              </div>
              
              <div>
                <h2 className="serif text-xl md:text-2xl font-bold text-foreground mb-2">Liability</h2>
                <p>
                  This service is provided "as-is" without warranty. We are not liable for indirect damages arising from use of the site.
                </p>
              </div>
            </div>
          </div>
        );
      case "privacy":
        return (
          <div className="fade-in">
            <div className="tag-label text-accent-red">Legal</div>
            <h1 className="headline-xl mt-3 text-5xl text-foreground">Privacy Policy</h1>
            <div className="tag-label text-muted-foreground mt-2" style={{ marginBottom: "3rem" }}>Last Updated: June 2026</div>
            
            <div className="space-y-8 serif text-base md:text-lg leading-relaxed text-muted-foreground">
              <p>
                Orbit Dispatch respects your privacy. This is a demo project and we do not collect personal data.
              </p>
              
              <div>
                <h2 className="serif text-xl md:text-2xl font-bold text-foreground mb-2">Information we collect</h2>
                <p>
                  We do not run ads or third-party trackers. The only data stored locally is your mock sign-in email, kept in your browser's localStorage.
                </p>
              </div>
              
              <div>
                <h2 className="serif text-xl md:text-2xl font-bold text-foreground mb-2">Cookies</h2>
                <p>
                  We do not set cookies for tracking. See our <Link to="/cookies" className="underline hover:text-accent-red transition-colors">Cookie Policy</Link>.
                </p>
              </div>
              
              <div>
                <h2 className="serif text-xl md:text-2xl font-bold text-foreground mb-2">Third parties</h2>
                <p>
                  Story metadata is fetched at read-time from the public Spaceflight News API. Linked articles are hosted by their original publishers.
                </p>
              </div>
              
              <div>
                <h2 className="serif text-xl md:text-2xl font-bold text-foreground mb-2">Contact</h2>
                <p>
                  Questions? Email privacy@orbitdispatch.news.
                </p>
              </div>
            </div>
          </div>
        );
      case "cookies":
        return (
          <div className="fade-in">
            <div className="tag-label text-accent-red">Legal</div>
            <h1 className="headline-xl mt-3 text-5xl text-foreground">Cookie Policy</h1>
            <div className="tag-label text-muted-foreground mt-2" style={{ marginBottom: "3rem" }}>Last Updated: June 2026</div>
            
            <div className="space-y-8 serif text-base md:text-lg leading-relaxed text-muted-foreground">
              <p>
                Orbit Dispatch does not use tracking cookies. We use browser localStorage only to remember a mock sign-in session for demo purposes.
              </p>
              <p>
                You can clear this at any time by signing out or clearing your browser's site data.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-6 page-container">
      {renderContent()}
    </div>
  );
}
