'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '/', label: 'الرئيسية' },
  { href: '/about', label: 'من نحن' },
  { href: '/structure', label: 'الهيكل' },
  { href: '/events', label: 'الفعاليات' },
  { href: '/gallery', label: 'المعرض' },
  { href: '/apply', label: 'التقديم' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-glass shadow-lg shadow-blue-100/50 border-b border-blue-100' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo — text only */}
        <Link href="/" className="group">
          <span className="font-black text-xl text-slate-900 tracking-tight">
            COOP <span className="text-gradient">Club</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Apply CTA */}
        <Link href="/apply" className="hidden md:inline-flex btn-primary text-sm py-2 px-4">
          قدّم الآن ✦
        </Link>

        {/* Mobile Burger */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-blue-50 transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="فتح القائمة"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-current transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-glass border-t border-blue-100 overflow-hidden"
          >
            <ul className="px-4 py-3 flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      pathname === l.href
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/apply" className="btn-primary w-full justify-center text-sm">
                  قدّم الآن ✦
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
