'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Post {
  id: string;
  caption: string;
  url: string;
  displayUrl: string;
  likesCount: number;
  timestamp: string;
  category: string;
}

const warmGradients = [
  'from-orange-400 to-amber-300',
  'from-amber-500 to-yellow-400',
  'from-orange-500 to-red-400',
  'from-yellow-500 to-orange-400',
  'from-amber-400 to-orange-300',
  'from-red-400 to-orange-400',
];

function parseCaption(caption: string) {
  // Extract season and episode from Arabic caption
  const seasonMatch = caption.match(/الـموسـم\s*([٠-٩]+|[\d]+)/);
  const episodeMatch = caption.match(/الـحلـقـة\s*:\s*([٠-٩]+|[\d]+)/);
  const season = seasonMatch?.[1] ?? '';
  const episode = episodeMatch?.[1] ?? '';
  return { season, episode };
}

function QuoteCard({ post, index, onOpen }: { post: Post; index: number; onOpen: (p: Post) => void }) {
  const [imgError, setImgError] = useState(false);
  const gradient = warmGradients[index % warmGradients.length];
  const { season, episode } = parseCaption(post.caption);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <button
        onClick={() => onOpen(post)}
        className="group w-full block rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      >
        {/* Image / Gradient card */}
        {post.displayUrl && !imgError ? (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.displayUrl}
              alt={post.caption}
              className="w-full object-cover aspect-square"
              onError={() => setImgError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 right-0 left-0 p-4 text-right">
              <p className="text-white text-xs font-bold opacity-80">الموسم {season} · الحلقة {episode}</p>
            </div>
          </div>
        ) : (
          <div className={`bg-gradient-to-br ${gradient} aspect-square flex flex-col items-center justify-center p-8 relative`}>
            {/* Decorative circles */}
            <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-white/10" />
            <div className="absolute bottom-4 right-4 w-24 h-24 rounded-full bg-white/10" />

            {/* Season / episode badge */}
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 mb-4">
              <p className="text-white font-black text-sm text-center" dir="rtl">
                الموسم {season} · الحلقة {episode}
              </p>
            </div>

            {/* Large icon */}
            <div className="text-6xl mb-4">🚀</div>

            {/* Caption */}
            <p className="text-white font-black text-xl text-center leading-relaxed" dir="rtl">
              رحلة التدريب
            </p>
          </div>
        )}

        {/* Card footer */}
        <div className={`bg-gradient-to-r ${gradient} p-4 text-right`}>
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-xs flex items-center gap-1">
              <span>♥</span> {post.likesCount}
            </span>
            <span className="text-white font-black text-sm">رحلة التدريب</span>
          </div>
          <p className="text-white/70 text-xs mt-0.5">
            {new Date(post.timestamp).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long' })}
          </p>
        </div>
      </button>
    </motion.div>
  );
}

function Lightbox({ post, onClose }: { post: Post; onClose: () => void }) {
  const [imgError, setImgError] = useState(false);
  const { season, episode } = parseCaption(post.caption);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-3xl overflow-hidden max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {post.displayUrl && !imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.displayUrl}
            alt={post.caption}
            className="w-full object-cover max-h-[60vh]"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="bg-gradient-to-br from-orange-400 to-amber-300 p-12 text-center">
            <div className="text-7xl mb-4">🚀</div>
            <p className="text-white font-black text-2xl" dir="rtl">رحلة التدريب</p>
            <p className="text-white/80 font-bold mt-1" dir="rtl">الموسم {season} · الحلقة {episode}</p>
          </div>
        )}
        <div className="p-6 text-right" dir="rtl">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold mb-3">
            🚀 رحلة التدريب · الموسم {season} · الحلقة {episode}
          </div>
          <p className="text-slate-700 text-sm mb-3 leading-relaxed">{post.caption}</p>
          <p className="text-slate-400 text-xs mb-5">
            {new Date(post.timestamp).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}
            {' · '}♥ {post.likesCount}
          </p>
          <div className="flex gap-3 flex-row-reverse">
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

export default function TrainingJourneySection({ posts }: { posts: Post[] }) {
  const [selected, setSelected] = useState<Post | null>(null);

  if (posts.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 bg-amber-100 border border-amber-200 rounded-2xl px-5 py-2.5 mb-5">
              <span className="text-2xl">🚀</span>
              <span className="text-amber-800 font-black text-lg" dir="rtl">من رحلة التدريب</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4" dir="rtl">
              لحظات <span className="bg-clip-text text-transparent bg-gradient-to-l from-orange-500 to-amber-500">لا تُنسى</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-lg" dir="rtl">
              أبرز لحظات مواسم رحلة التدريب — الرحلة التي يعيشها طلاب كوب كل فصل دراسي.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, i) => (
            <QuoteCard key={post.id} post={post} index={i} onOpen={setSelected} />
          ))}
        </div>

        {/* Instagram link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="https://www.instagram.com/coop.psu/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-orange-500 to-amber-400 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg"
          >
            ← متابعة على إنستغرام
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <Lightbox post={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
