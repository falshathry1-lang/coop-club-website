import AnimatedSection from '@/components/AnimatedSection';
import GalleryGrid from '@/components/GalleryGrid';
import TrainingJourneySection from '@/components/TrainingJourneySection';
import instagramData from '@/data/instagram.json';

export default function GalleryPage() {
  const quotePosts = instagramData.filter((p) => p.category === 'quote');
  const galleryPosts = instagramData.filter((p) => p.category !== 'quote');

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-violet-50 to-white relative overflow-hidden">
        <div className="blob absolute -top-16 -left-16 w-72 h-72 bg-violet-100/40 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <AnimatedSection>
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">@coop.psu</p>
            <h1 className="section-heading text-slate-900 mb-6">
              <span className="text-gradient">المعرض</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              يوميات بصرية لرحلاتنا التدريبية وفعالياتنا وإنجازاتنا — مباشرةً من إنستغرام.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="mt-6">
            <a
              href="https://www.instagram.com/coop.psu/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              تابعنا @coop.psu
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Gallery */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryGrid posts={galleryPosts} />
        </div>
      </section>

      {/* Training Journey Section */}
      <TrainingJourneySection posts={quotePosts} />
    </>
  );
}
