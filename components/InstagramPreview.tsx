'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
  quote: 'رحلة التدريب',
};

function PreviewCard({ post, index }: { post: Post; index: number }) {
  const [imgError, setImgError] = useState(false);
  const gradient = getPostGradient(post.id);

  return (
    <motion.a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
    >
      {post.displayUrl && !imgError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.displayUrl}
          alt={post.caption || 'COOP Club'}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center p-4`}>
          <div className="text-white/80 text-4xl mb-2">
            {post.category === 'milestone' ? '🏆' : post.category === 'event' ? '🎉' : '📸'}
          </div>
          {post.caption ? (
            <p className="text-white text-xs text-center font-medium leading-snug line-clamp-3" dir="rtl">
              {post.caption}
            </p>
          ) : (
            <p className="text-white/70 text-xs font-medium">عرض على إنستغرام ←</p>
          )}
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-white text-xs font-semibold">
            <span>♥</span>
            <span>{post.likesCount}</span>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getCategoryColor(post.category)}`}>
            {categoryAr[post.category] ?? post.category}
          </span>
        </div>
        <p className="text-white/70 text-xs mt-1 text-right">{formatDate(post.timestamp)}</p>
      </div>
    </motion.a>
  );
}

export default function InstagramPreview({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {posts.map((post, i) => (
        <PreviewCard key={post.id} post={post} index={i} />
      ))}
    </div>
  );
}
