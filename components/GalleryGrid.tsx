'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDate, getPostGradient, getCategoryColor } from '@/lib/utils';

interface Post {
  id: string;
  caption: string;
  url: string;
  displayUrl: string;
  likesCount: number;
  commentsCount: number;
  timestamp: string;
  category: string;
}

const categoryAr: Record<string, string> = {
  event: 'فعالية',
  milestone: 'إنجاز',
  announcement: 'إعلان',
  partner: 'شراكة',
  general: 'عام',
};

function PostCard({ post, onOpen, index }: { post: Post; onOpen: (p: Post) => void; index: number }) {
  const [imgError, setImgError] = useState(false);
  const gradient = getPostGradient(post.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, delay: (index % 12) * 0.04 }}
      className="break-inside-avoid mb-4"
    >
      <button
        onClick={() => onOpen(post)}
        className="group w-full text-left rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
      >
        {/* Image area */}
        {post.displayUrl && !imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.displayUrl}
            alt={post.caption || 'COOP Club'}
            className="w-full object-cover"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`w-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center p-8 min-h-[180px]`}>
            <span className="text-white/70 text-5xl mb-3">
              {post.category === 'milestone' ? '🏆' : '📸'}
            </span>
            {post.caption ? (
              <p className="text-white text-sm text-center font-medium leading-snug" dir="rtl">
                {post.caption}
              </p>
            ) : (
              <p className="text-white/60 text-xs">عرض على إنستغرام</p>
            )}
          </div>
        )}

        {/* Card footer */}
        <div className="bg-white p-3 border border-slate-100">
          <div className="flex items-center justify-between">
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${getCategoryColor(post.category)}`}>
              {categoryAr[post.category] ?? post.category}
            </span>
            <span className="text-slate-500 text-xs flex items-center gap-1">
              <span className="text-red-400">♥</span> {post.likesCount}
            </span>
          </div>
          <p className="text-slate-400 text-xs mt-1">{formatDate(post.timestamp)}</p>
        </div>
      </button>
    </motion.div>
  );
}

function Lightbox({ post, onClose }: { post: Post; onClose: () => void }) {
  const [imgError, setImgError] = useState(false);
  const gradient = getPostGradient(post.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {post.displayUrl && !imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.displayUrl}
            alt={post.caption || 'منشور'}
            className="w-full object-cover max-h-[70vh]"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`w-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center p-12 min-h-[280px]`}>
            <span className="text-white/70 text-7xl mb-4">
              {post.category === 'milestone' ? '🏆' : '📸'}
            </span>
            {post.caption && (
              <p className="text-white text-center font-medium leading-relaxed max-w-xs" dir="rtl">
                {post.caption}
              </p>
            )}
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs px-3 py-1 rounded-full font-bold ${getCategoryColor(post.category)}`}>
              {categoryAr[post.category] ?? post.category}
            </span>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span className="flex items-center gap-1"><span className="text-red-400">♥</span> {post.likesCount}</span>
              {post.commentsCount > 0 && <span className="flex items-center gap-1"><span>💬</span> {post.commentsCount}</span>}
            </div>
          </div>
          {post.caption && <p className="text-slate-700 text-sm mb-3 leading-relaxed" dir="rtl">{post.caption}</p>}
          <p className="text-slate-400 text-xs mb-4">{formatDate(post.timestamp)}</p>
          <div className="flex gap-3">
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1 justify-center text-sm py-2.5">
              عرض على إنستغرام ↗
            </a>
            <button onClick={onClose} className="btn-outline text-sm py-2.5 px-4">إغلاق</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function GalleryGrid({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selected, setSelected] = useState<Post | null>(null);

  // Only show non-quote posts in gallery
  const galleryPosts = posts.filter((p) => p.category !== 'quote');
  const filtered = activeCategory === 'all'
    ? galleryPosts
    : galleryPosts.filter((p) => p.category === activeCategory);

  const existingCats = ['all', ...Array.from(new Set(galleryPosts.map((p) => p.category)))];
  const catLabels: Record<string, string> = { all: 'الكل', ...categoryAr };

  return (
    <>
      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {existingCats.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            {catLabels[cat] ?? cat} {cat === 'all' && `(${galleryPosts.length})`}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="columns-2 sm:columns-3 lg:columns-4 gap-4"
        >
          {filtered.map((post, i) => (
            <PostCard key={post.id} post={post} onOpen={setSelected} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <p className="text-4xl mb-3">📭</p>
          <p>لا توجد منشورات في هذه الفئة.</p>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selected && <Lightbox post={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
