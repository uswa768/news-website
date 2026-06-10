import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { formatRelativeTime } from "../components/NewsCard";
import { useBookmarks } from "../hooks/useBookmarks";
import { Bookmark, BookmarkCheck } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
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

export default function Dashboard() {
  const navigate = useNavigate();
  const { toggleBookmark, isBookmarked } = useBookmarks();

  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const userEmail = localStorage.getItem("orbit_auth_email") || "reader@orbit.news";
  const firstName = userEmail.split('@')[0].charAt(0).toUpperCase() + userEmail.split('@')[0].slice(1);

  const fetchArticles = async (currentOffset, isLoadMore = false) => {
    if (isLoadMore) setLoadingMore(true);
    else setLoading(true);

    try {
      const res = await fetch(`https://api.spaceflightnewsapi.net/v4/articles/?limit=${limit}&offset=${currentOffset}`);
      const data = await res.json();
      if (data.results) {
        if (isLoadMore) {
          setAllArticles(prev => [...prev, ...data.results]);
        } else {
          setAllArticles(data.results);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchArticles(0);
  }, []);

  const handleLoadMore = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    fetchArticles(newOffset, true);
  };

  const handleToggleBookmark = (e, article) => {
    e.stopPropagation();
    toggleBookmark(article, "article");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[50vh]">
        <div className="w-8 h-8 border-3 border-accent-red border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div
      className="fade-in max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="mb-24 flex justify-between items-end">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Hello, {firstName}!
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">Your personalized spaceflight feed.</p>
        </div>
      </motion.div>


      <div className="w-full mt-10">
        <div className="masonry-grid">
          {allArticles.map((article, index) => {
            const bookmarked = isBookmarked(article.id, "article");

            // Randomize aspect ratio slightly to enhance the Pinterest masonry effect
            const aspectRatios = ["aspect-[4/3]", "aspect-[3/4]", "aspect-square", "aspect-[16/9]"];
            const randomAspect = aspectRatios[index % aspectRatios.length];

            return (
              <motion.div
                key={`${article.id}-${index}`}
                variants={itemVariants}
                onClick={() => navigate(`/articles/${article.id}`)}
                className="masonry-item cursor-pointer group"
              >
                {/* Clean Image Section */}
                <div className={`relative w-full rounded-2xl overflow-hidden mb-4 bg-muted shadow-sm group-hover:shadow-md transition-all ${randomAspect}`}>
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Floating Bookmark inside Image */}
                  <div className="absolute top-4 right-4 z-10">
                    <button
                      onClick={(e) => handleToggleBookmark(e, article)}
                      className="p-2 rounded-full bg-background/50 backdrop-blur-md hover:bg-background transition-colors shadow-sm"
                    >
                      {bookmarked ? (
                        <BookmarkCheck className="w-5 h-5 text-accent-red fill-accent-red" />
                      ) : (
                        <Bookmark className="w-5 h-5 text-white" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Extremely Clean Text Section Below Image */}
                <div className="flex flex-col px-1">
                  <div className="text-muted-foreground text-[11px] font-bold tracking-wide uppercase mb-2">
                    {formatRelativeTime(article.published_at)}
                  </div>
                  <h4 className="font-serif font-bold text-xl leading-snug mb-2 group-hover:text-accent-red transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-muted-foreground text-sm line-clamp-1">
                    {article.summary}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Load More Button matching Auth UI */}
        <div className="flex justify-center mt-20 mb-12 w-full">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="w-full bg-foreground text-background py-3 px-4 text-base font-semibold tracking-[-0.01em] border-none flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-foreground/90 transition-colors"
          >
            {loadingMore ? (
              <>
                <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </>
            ) : (
              "Load more"
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
