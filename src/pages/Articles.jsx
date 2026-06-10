import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);

  const limit = 12;

  // Fetch articles based on search queries
  useEffect(() => {
    setLoading(true);
    let url = `https://api.spaceflightnewsapi.net/v4/articles/?limit=${limit}&offset=${offset}`;
    if (debouncedSearch) {
      url += `&search=${encodeURIComponent(debouncedSearch)}`;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("API error fetching articles");
        return res.json();
      })
      .then((data) => {
        setArticles(data.results || []);
        setCount(data.count || 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch articles:", err);
        setLoading(false);
      });
  }, [offset, debouncedSearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setDebouncedSearch(search);
    setOffset(0); // Reset offset on new search
  };

  const handleNextPage = () => {
    if (offset + limit < count) {
      setOffset((prev) => prev + limit);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (offset - limit >= 0) {
      setOffset((prev) => prev - limit);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(count / limit) || 1;

  return (
    <div className="fade-in">
      {/* Header Section */}
      <header className="border-b border-rule">
        <div className="mx-auto max-w-7xl px-6 page-container" style={{paddingBottom: "clamp(2rem, 6vw, 4rem)"}}>
          <div className="tag-label text-accent-red">Section</div>
          <h1 className="headline-xl mt-2 text-5xl md:text-6xl text-foreground">Articles</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground serif text-base">
            Reporting from every launchpad on Earth.
          </p>
          <form onSubmit={handleSearchSubmit} className="search-bar-form">
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search rockets, missions, agencies…" 
              className="search-bar-input"
            />
            <button 
              type="submit" 
              className="search-bar-button"
            >
              Search
            </button>
          </form>
        </div>
      </header>

      {/* Main Grid Section */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-4 tag-label text-muted-foreground">
          {count.toLocaleString()} results
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-3 border-accent-red border-t-transparent rounded-full animate-spin"></div>
            <div className="tag-label text-muted-foreground">Updating article feed...</div>
          </div>
        ) : articles.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-rule p-8 rounded bg-muted/10">
            <p className="serif text-lg text-muted-foreground">No articles match your search parameters.</p>
            <button 
              onClick={() => { setSearch(""); setDebouncedSearch(""); }}
              className="tag-label mt-4 px-4 py-2 bg-foreground text-background cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            {/* 3-column layout */}
            <motion.div 
              className="articles-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
            >
              {articles.map((article) => (
                <motion.div key={article.id} variants={itemVariants} className="hover-lift">
                  <NewsCard 
                    item={article} 
                    type="article"
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-between rule-top pt-6">
                <button 
                  onClick={handlePrevPage}
                  disabled={offset === 0}
                  className={`tag-label transition ${offset === 0 ? "opacity-30 cursor-not-allowed pointer-events-none" : "hover:text-accent-red cursor-pointer"}`}
                >
                  ← Previous
                </button>
                
                <div className="tag-label text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </div>

                <button 
                  onClick={handleNextPage}
                  disabled={offset + limit >= count}
                  className={`tag-label transition ${offset + limit >= count ? "opacity-30 cursor-not-allowed pointer-events-none" : "hover:text-accent-red cursor-pointer"}`}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </section>

    </div>
  );
}
