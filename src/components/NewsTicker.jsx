import React, { useEffect, useState } from "react";

const FALLBACK_TICKERS = [
  "NASA concludes MAVEN mission at Mars, uses data to discover new atmospheric phenomenon",
  "What’s Happening in Space Policy June 7-13, 2026",
  "SpaceX to launch Falcon 9 rocket booster on record-breaking 35th flight",
  "NASA to select new headquarters building by end of year",
  "SpaceX launches 2 Starshield satellites during Saturday night Starlink mission",
  "Five ISS Crew Members Temporarily Take Shelter Due to Russian Segment Air Leak"
];

export default function NewsTicker() {
  const [headlines, setHeadlines] = useState(FALLBACK_TICKERS);

  useEffect(() => {
    // Fetch latest 6 headlines for ticker
    fetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=6")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const apiHeadlines = data.results.map((article) => article.title);
          setHeadlines(apiHeadlines);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch live ticker headlines, using fallback.", err);
      });
  }, []);

  // Concatenate headlines for the marquee loop
  const tickerText = headlines.join("   ·   ");

  return (
    <div className="border-b border-rule bg-foreground text-background transition-colors">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-2 text-xs">
        <span className="tag-label rounded-sm bg-accent-red px-2 py-0.5 text-white font-bold select-none">
          LIVE
        </span>
        <div className="flex-1 ticker-wrap">
          <div className="ticker-content opacity-90">
            {/* Display twice to make seamless infinite scroll loop */}
            <span>{tickerText} &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; </span>
            <span>{tickerText} &nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp; </span>
          </div>
        </div>
      </div>
    </div>
  );
}
