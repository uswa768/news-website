import React from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useBookmarks } from "../hooks/useBookmarks";

// Helper to format time relative to now (e.g. "8h ago", "2d ago")
export function formatRelativeTime(dateString) {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins || 1}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${diffDays}d ago`;
    }
  } catch (e) {
    return "";
  }
}

export default function NewsCard({ item, onClick, type = "article" }) {
  const navigate = useNavigate();
  const { toggleBookmark, isBookmarked } = useBookmarks();
  
  const bookmarked = isBookmarked(item.id, type);

  const handleToggleBookmark = (e) => {
    e.stopPropagation();
    toggleBookmark(item, type);
  };

  const handleClick = () => {
    if (onClick) {
      onClick(item);
    } else {
      navigate(`/${type}s/${item.id}`);
    }
  };

  return (
    <div 
      onClick={handleClick} 
      className="group block cursor-pointer fade-in"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img 
          src={item.image_url || "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=60"} 
          alt={item.title} 
          loading="lazy" 
          className="h-full w-full object-cover transition-transform-image duration-500"
        />
        {/* Bookmark Overlay Button — plain white icon, no circle */}
        <button 
          onClick={handleToggleBookmark}
          className="bookmark-icon-btn"
          title={bookmarked ? "Remove bookmark" : "Save article"}
          aria-label="Bookmark"
        >
          {bookmarked ? (
            <BookmarkCheck className="w-4 h-4" style={{ color: "var(--accent-red)", fill: "var(--accent-red)" }} />
          ) : (
            <Bookmark className="w-4 h-4" style={{ color: "white", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.6))" }} />
          )}
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2 tag-label text-muted-foreground">
        <span className="text-accent-red font-semibold">{item.news_site}</span>
        <span>·</span>
        <span>{formatRelativeTime(item.published_at)}</span>
      </div>

      <h3 className="serif mt-1 text-lg font-semibold leading-snug group-hover:text-accent-red transition-colors duration-200">
        {item.title}
      </h3>
      
      {item.summary && (
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {item.summary.replace(/The post .* appeared first on .*/g, "")}
        </p>
      )}
    </div>
  );
}
