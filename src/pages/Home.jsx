import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NewsCard, { formatRelativeTime } from "../components/NewsCard";
import { CheckCircle2 } from "lucide-react";
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

export default function Home() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Newsletter State
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    // Fetch articles & blogs in parallel
    Promise.all([
      fetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=13").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch articles");
        return res.json();
      }),
      fetch("https://api.spaceflightnewsapi.net/v4/blogs/?limit=4").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blogs");
        return res.json();
      })
    ])
      .then(([articlesData, blogsData]) => {
        setArticles(articlesData.results || []);
        setBlogs(blogsData.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch homepage data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);



  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    localStorage.setItem("newsletter_email", email);
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 flex flex-col items-center justify-center gap-4 text-center">
        {/* Loading Spinner */}
        <div className="w-10 h-10 border-4 border-accent-red border-t-transparent rounded-full animate-spin"></div>
        <div className="tag-label text-muted-foreground mt-2">Receiving satellite telemetry...</div>
      </div>
    );
  }

  // Decompose articles for layout grid
  const heroArticle = articles[0] || null;
  const developingArticles = articles.slice(1, 5); // 4 items
  const frontierArticles = articles.slice(5, 9);    // 4 items
  const briefArticles = articles.slice(9, 13);      // 4 items

  return (
    <div className="fade-in">
      {/* 1. Top stories & Spotlight Grid */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex items-baseline justify-between">
          <h1 className="tag-label text-accent-red text-sm font-bold">Top stories</h1>
          <Link to="/articles" className="tag-label hover:underline text-xs">
            All articles →
          </Link>
        </div>

        <motion.div 
          className="top-stories-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {/* Hero spotlight */}
          {heroArticle && (
            <motion.div
              variants={itemVariants}
              onClick={() => navigate(`/articles/${heroArticle.id}`)}
              className="group block cursor-pointer hover-lift"
            >
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={heroArticle.image_url}
                  alt={heroArticle.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform-image duration-500"
                />
              </div>
              <div className="mt-4 flex items-center gap-3 tag-label text-muted-foreground">
                <span className="text-accent-red font-semibold">{heroArticle.news_site}</span>
                <span>·</span>
                <span>{formatRelativeTime(heroArticle.published_at)}</span>
              </div>
              <h2 className="headline-xl mt-2 group-hover:text-accent-red transition-colors duration-200" style={{ fontSize: "clamp(1.5rem, 4vw, 2.8rem)", lineHeight: 1.05 }}>
                {heroArticle.title}
              </h2>
              <p className="mt-3 line-clamp-2 text-base text-muted-foreground serif">
                {heroArticle.summary ? heroArticle.summary.replace(/The post .* appeared first on .*/g, "") : ""}
              </p>
            </motion.div>
          )}

          {/* Also developing sidebar — shows as list below on mobile, right column on desktop */}
          <div className="also-developing-sidebar">
            <h2 className="sidebar-list-header">Also developing</h2>
            <div className="sidebar-list">
              {developingArticles.map((article) => (
                <motion.div
                  key={article.id}
                  variants={itemVariants}
                  onClick={() => navigate(`/articles/${article.id}`)}
                  className="sidebar-item-card group hover-lift"
                >
                  <div className="flex items-center gap-2 tag-label text-muted-foreground">
                    <span className="text-accent-red font-semibold">{article.news_site}</span>
                    <span>{formatRelativeTime(article.published_at)}</span>
                  </div>
                  <h3 className="serif mt-1 text-lg font-semibold leading-snug group-hover:text-accent-red transition-colors duration-200 text-foreground">
                    {article.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. More from the frontier (4 cards row) */}
      <section className="mx-auto max-w-7xl px-6 py-10 rule-top">
        <h2 className="tag-label text-accent-red mb-6 font-bold">More from the frontier</h2>
        <motion.div 
          className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {frontierArticles.map((article) => (
            <motion.div key={article.id} variants={itemVariants} className="hover-lift">
              <NewsCard 
                item={article} 
                type="article"
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. Split Blogs & Briefs */}
      <section className="mx-auto max-w-7xl px-6 py-10 rule-top">
        <div className="blogs-briefs-grid">
          
          {/* Blogs list */}
          <div>
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="tag-label text-accent-red font-bold">From the blogs</h2>
              <Link to="/blogs" className="tag-label hover:underline text-xs">
                All blogs →
              </Link>
            </div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
            >
              {blogs.map((blog) => (
                <motion.div 
                  key={blog.id}
                  variants={itemVariants}
                  onClick={() => navigate(`/blogs/${blog.id}`)}
                  className="blog-home-card group hover-lift"
                >
                  <div className="blog-home-img">
                    <img 
                      src={blog.image_url} 
                      alt={blog.title} 
                      loading="lazy" 
                      className="h-full w-full object-cover transition-transform-image duration-500"
                    />
                  </div>
                  <div className="blog-home-content">
                    <div className="flex items-center gap-2 tag-label text-muted-foreground">
                      <span className="text-accent-red font-semibold">{blog.news_site}</span>
                      <span>·</span>
                      <span>{formatRelativeTime(blog.published_at)}</span>
                    </div>
                    <h3 className="serif mt-1 font-semibold leading-tight group-hover:text-accent-red transition-colors duration-200" style={{fontSize:"clamp(1.1rem, 3vw, 1.75rem)"}}>
                      {blog.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground serif">
                      {blog.summary}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Quick Briefs + Newsletter */}
          <aside>
            <h2 className="sidebar-list-header text-accent-red">Quick Briefs</h2>
            <motion.div 
              className="sidebar-list"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
            >
              {briefArticles.map((article) => (
                <motion.div 
                  key={article.id}
                  variants={itemVariants}
                  onClick={() => navigate(`/articles/${article.id}`)}
                  className="sidebar-item-card group hover-lift"
                >
                  <div className="flex items-center gap-2 tag-label text-muted-foreground">
                    <span className="text-accent-red font-semibold">{article.news_site}</span>
                    <span>{formatRelativeTime(article.published_at)}</span>
                  </div>
                  <h3 className="serif mt-1 text-lg font-semibold leading-snug group-hover:text-accent-red transition-colors duration-200 text-foreground">
                    {article.title}
                  </h3>
                </motion.div>
              ))}
            </motion.div>

            {/* Newsletter widget */}
            <div className="newsletter-widget">
              <div className="tag-label text-accent-red font-bold" style={{fontSize:"0.7rem", letterSpacing:"0.08em"}}>Newsletter</div>
              <h3 style={{fontFamily:"var(--font-serif)", fontSize:"1.35rem", fontWeight:700, marginTop:"0.5rem", lineHeight:1.2, letterSpacing:"-0.02em"}}>The Dispatch, every morning.</h3>
              <p style={{fontSize:"0.875rem", color:"var(--muted-foreground)", marginTop:"0.4rem"}}>Five stories, two minutes. Free.</p>
              {subscribed ? (
                <div className="mt-4 flex items-center gap-2 text-xs tag-label text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-accent-red" />
                  Successfully subscribed!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{marginTop:"1rem", display:"flex", border:"1px solid var(--foreground)"}}>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@earth.io" 
                    style={{flex:1, background:"transparent", padding:"0.6rem 0.75rem", fontSize:"0.875rem", color:"var(--foreground)", outline:"none", border:"none"}}
                  />
                  <button style={{background:"var(--foreground)", color:"var(--background)", padding:"0.6rem 1rem", fontSize:"0.875rem", fontWeight:600, border:"none", cursor:"pointer", whiteSpace:"nowrap"}}>
                    Join
                  </button>
                </form>
              )}
            </div>
          </aside>

        </div>
      </section>

    </div>
  );
}
