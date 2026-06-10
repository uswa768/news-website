import React from "react";
import { X, ExternalLink, Calendar, User, Globe } from "lucide-react";
import { formatRelativeTime } from "./NewsCard";

export default function NewsDetailModal({ item, onClose, type = "article" }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in-0 duration-200">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />
      
      {/* Modal Content Card */}
      <div className="relative w-full max-w-2xl bg-background border border-rule shadow-2xl rounded-sm overflow-hidden z-10 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header toolbar */}
        <div className="flex items-center justify-between border-b border-rule px-4 py-2 bg-muted/20">
          <span className="tag-label text-accent-red font-semibold">{type} Dispatch</span>
          <button 
            onClick={onClose} 
            className="p-1 rounded hover:bg-muted text-foreground transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 flex-1">
          {/* Headline */}
          <h2 className="serif text-2xl md:text-3xl font-bold leading-tight text-foreground">
            {item.title}
          </h2>

          {/* Metadata Grid */}
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-y border-rule py-3 text-xs text-muted-foreground tag-label">
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-accent-red" />
              Source: <span className="text-foreground">{item.news_site}</span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Published: <span className="text-foreground">{new Date(item.published_at).toLocaleDateString()} ({formatRelativeTime(item.published_at)})</span>
            </span>
            {item.authors && item.authors.length > 0 && (
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                By: <span className="text-foreground">{item.authors.map(a => a.name).join(", ")}</span>
              </span>
            )}
          </div>

          {/* Large Image */}
          {item.image_url && (
            <div className="mt-6 aspect-[16/9] overflow-hidden bg-muted border border-rule">
              <img 
                src={item.image_url} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Main Body/Summary */}
          <div className="mt-6 text-foreground leading-relaxed serif text-base md:text-lg">
            <p className="whitespace-pre-line">
              {item.summary ? item.summary.replace(/The post .* appeared first on .*/g, "") : "No summary available."}
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="border-t border-rule p-4 bg-muted/20 flex justify-end gap-3">
          <button 
            onClick={onClose} 
            className="tag-label px-4 py-2 border border-rule text-foreground hover:bg-muted transition-colors rounded-sm"
          >
            Close
          </button>
          <a 
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="tag-label bg-foreground text-background px-4 py-2 hover:opacity-95 transition-opacity flex items-center gap-1.5 rounded-sm"
          >
            Read original site
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
