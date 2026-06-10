import { useState, useEffect, useCallback } from 'react';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const stored = localStorage.getItem('bookmarks');
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Failed to parse bookmarks", err);
      return [];
    }
  });

  const loadBookmarks = useCallback(() => {
    try {
      const stored = localStorage.getItem('bookmarks');
      setBookmarks(stored ? JSON.parse(stored) : []);
    } catch (err) {}
  }, []);

  useEffect(() => {
    window.addEventListener('bookmarksUpdated', loadBookmarks);
    return () => window.removeEventListener('bookmarksUpdated', loadBookmarks);
  }, [loadBookmarks]);

  const toggleBookmark = (article, type = "article") => {
    setBookmarks((prev) => {
      const isBookmarked = prev.some((b) => b.id === article.id && b.type === type);
      let nextBookmarks;
      if (isBookmarked) {
        nextBookmarks = prev.filter((b) => !(b.id === article.id && b.type === type));
      } else {
        nextBookmarks = [...prev, { ...article, type, bookmarkedAt: new Date().toISOString() }];
      }
      localStorage.setItem('bookmarks', JSON.stringify(nextBookmarks));
      window.dispatchEvent(new Event('bookmarksUpdated'));
      return nextBookmarks;
    });
  };

  const isBookmarked = (id, type = "article") => {
    return bookmarks.some((b) => b.id === id && b.type === type);
  };

  return { bookmarks, toggleBookmark, isBookmarked };
}
