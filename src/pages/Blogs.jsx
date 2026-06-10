import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatRelativeTime } from "../components/NewsCard";
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

export default function Blogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);

  const limit = 10; // 10 blogs per page

  // Fetch blogs based on offset pagination
  useEffect(() => {
    setLoading(true);
    const url = `https://api.spaceflightnewsapi.net/v4/blogs/?limit=${limit}&offset=${offset}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("API error fetching blogs");
        return res.json();
      })
      .then((data) => {
        setBlogs(data.results || []);
        setCount(data.count || 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch blogs:", err);
        setLoading(false);
      });
  }, [offset]);

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
          <h1 className="headline-xl mt-2 text-5xl md:text-6xl text-foreground">Blogs</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground serif text-base">
            Longform analysis from across the spaceflight community.
          </p>
        </div>
      </header>

      {/* Main List Section */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 tag-label text-muted-foreground">
          {count.toLocaleString()} entries
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-3 border-accent-red border-t-transparent rounded-full animate-spin"></div>
            <div className="tag-label text-muted-foreground">Updating blog feed...</div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-rule p-8 rounded bg-muted/10">
            <p className="serif text-lg text-muted-foreground">No blog posts available.</p>
          </div>
        ) : (
          <>
            {/* Horizontal Stack Layout with Divider Rules */}
            <motion.div 
              className="blogs-list-container"
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
                  className="blog-post-card group hover-lift"
                >
                  {/* Left Column: Image */}
                  <div className="blog-post-image-wrap">
                    <img 
                      src={blog.image_url || "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=60"} 
                      alt={blog.title} 
                      loading="lazy" 
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  {/* Right Column: Metadata & Text */}
                  <div className="blog-post-content-wrap">
                    <div className="flex items-center gap-2 tag-label text-muted-foreground">
                      <span className="text-accent-red font-semibold">{blog.news_site}</span>
                      <span>·</span>
                      <span>{formatRelativeTime(blog.published_at)}</span>
                    </div>
                    <h3 className="serif mt-1 text-xl md:text-2xl font-bold leading-snug group-hover:text-accent-red transition-colors duration-200 text-foreground">
                      {blog.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground serif leading-relaxed">
                      {blog.summary ? blog.summary.replace(/The post .* appeared first on .*/g, "") : ""}
                    </p>
                  </div>
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
