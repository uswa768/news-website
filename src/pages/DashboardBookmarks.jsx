import React from "react";
import { useNavigate } from "react-router-dom";
import { useBookmarks } from "../hooks/useBookmarks";
import { formatRelativeTime } from "../components/NewsCard";
import { BookmarkCheck, Bookmark as BookmarkIcon } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function DashboardBookmarks() {
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();
  const navigate = useNavigate();

  const handleToggleBookmark = (e, article) => {
    e.stopPropagation();
    toggleBookmark(article, article.type || "article");
  };

  return (
    <motion.div className="fade-in max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10" initial="hidden" animate="visible" variants={containerVariants}>
      <motion.div variants={itemVariants} className="flex items-center gap-4 mb-20">
        <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center shadow-sm">
          <BookmarkIcon className="w-6 h-6 text-accent-red" />
        </div>
        <div>
          <h1 className="font-serif text-4xl font-bold text-foreground">Your Bookmarks</h1>
          <p className="text-muted-foreground text-sm mt-1">Articles saved for later reading.</p>
        </div>
      </motion.div>

      {bookmarks.length === 0 ? (
        <motion.div variants={itemVariants} className="bg-muted/30 rounded-3xl p-16 text-center flex flex-col items-center border border-dashed border-rule mt-10">
          <BookmarkIcon className="w-16 h-16 text-muted-foreground opacity-30 mb-6" />
          <h2 className="font-serif text-3xl font-bold mb-3">No bookmarks yet</h2>
          <p className="text-muted-foreground max-w-md leading-relaxed text-lg">
            Your reading list is empty. Click the bookmark icon on any article across Orbit Dispatch to save it here for later.
          </p>
        </motion.div>
      ) : (
        <div className="w-full mt-16 pt-4">
          <div className="masonry-grid">
            {bookmarks.map((article, index) => {
              const bookmarked = isBookmarked(article.id, article.type || "article");
              
              // Randomize aspect ratio slightly to enhance the Pinterest masonry effect
              const aspectRatios = ["aspect-[4/3]", "aspect-[3/4]", "aspect-square", "aspect-[16/9]"];
              const randomAspect = aspectRatios[index % aspectRatios.length];

              return (
                <motion.div 
                  key={`${article.type}-${article.id}`}
                  variants={itemVariants}
                  onClick={() => navigate(`/${article.type || 'article'}s/${article.id}`)}
                  className="masonry-item cursor-pointer group"
                >
                  {/* Clean Image Section */}
                  <div className={`relative w-full rounded-2xl overflow-hidden mb-4 bg-muted shadow-sm group-hover:shadow-md transition-all ${randomAspect}`}>
                    <img 
                      src={article.image_url} 
                      alt={article.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    
                    {/* Bookmark inside Image */}
                    <div className="absolute top-4 right-4 z-10">
                      <button 
                        onClick={(e) => handleToggleBookmark(e, article)}
                        className="p-2 rounded-full bg-background/50 backdrop-blur-md hover:bg-background transition-colors shadow-sm"
                      >
                        {bookmarked ? (
                          <BookmarkCheck className="w-5 h-5 text-accent-red fill-accent-red" />
                        ) : (
                          <BookmarkIcon className="w-5 h-5 text-white" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Extremely Clean Text Section Below Image */}
                  <div className="flex flex-col px-1">
                    <div className="text-muted-foreground text-[11px] font-bold tracking-wide uppercase mb-2">
                      {formatRelativeTime(article.published_at || article.bookmarkedAt)}
                    </div>
                    <h4 className="font-serif font-bold text-xl leading-snug mb-2 group-hover:text-accent-red transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                    {article.summary && (
                      <p className="text-muted-foreground text-sm line-clamp-1">
                        {article.summary}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}
