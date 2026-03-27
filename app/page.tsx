import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import InstagramPreview from '@/components/InstagramPreview';
import StatsCounter from '@/components/StatsCounter';
import EscapeRoomRegistration from '@/components/EscapeRoomRegistration';
import instagramData from '@/data/instagram.json';

export default function HomePage() {
  const latestPosts = instagramData.filter((p) => p.category !== 'quote').slice(0, 6);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="blob absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-100/60 animate-float" />
          <div className="blob absolute top-1/2 -left-40 w-[400px] h-[400px] bg-cyan-100/50 animate-float-delayed" />
          <div className="blob absolute -bottom-20 right-1/4 w-[350px] h-[350px] bg-violet-100/40 animate-float-slow" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#2563EB 1px, transparent 1px), linear-gradient(90deg, #2563EB 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <AnimatedSection delay={0}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-bold mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              نادي التدريب التعاوني · نشط
            </span>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none mb-6">
              <span className="block text-slate-900">COOP</span>
              <span className="block text-gradient">Club</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-2xl sm:text-3xl text-slate-600 font-black mb-3 max-w-2xl mx-auto">
              نربط الطلاب بعالم العمل المهني
            </p>
            <p className="text-lg text-slate-400 mb-10 font-medium">
              Bridging Students with the Professional World
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply" className="btn-primary text-base px-8 py-4">
                قدّم للانضمام ✦
              </Link>
              <Link href="/about" className="btn-outline text-base px-8 py-4">
                ← قصتنا
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <div className="mt-16 flex flex-col items-center gap-2 text-slate-400">
              <span className="text-xs font-medium tracking-widest">مرر للأسفل</span>
              <div className="w-px h-12 bg-gradient-to-b from-blue-400 to-transparent animate-pulse" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Stats Bar ──────────────────────────────────────────────── */}
      <StatsCounter />

      {/* ── Instagram Preview ────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
              <div>
                <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-2">@coop.psu</p>
                <h2 className="section-heading text-slate-900">
                  آخر ما نشرناه على <span className="text-gradient">إنستغرام</span>
                </h2>
              </div>
              <a
                href="https://www.instagram.com/coop.psu/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-sm py-2.5"
              >
                ← عرض كل المنشورات
              </a>
            </div>
          </AnimatedSection>
          <InstagramPreview posts={latestPosts} />
        </div>
      </section>

      {/* ── Escape Failure 2.0 Registration (temporary) ─────────── */}
      <EscapeRoomRegistration />

      {/* ── Programmes ───────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">ما نقدمه</p>
            <h2 className="section-heading text-slate-900 mb-4">
              <span className="text-gradient">برامجنا</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              من رحلات التدريب الميداني إلى حوار الخريجين — نصمّم تجارب تُهيّئ الطلاب لعالم العمل الحقيقي.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🚀',
                name: 'رحلة التدريب',
                sub: 'Training Journey',
                desc: 'برنامج يستضيف طلاباً في مرحلة التدريب التعاوني لمشاركة تجاربهم الحقيقية داخل الشركات — لقاءات حية تُلهم الطلاب المقبلين على هذه المرحلة.',
                color: 'from-blue-500 to-cyan-400',
                bg: 'bg-blue-50',
              },
              {
                icon: '🎓',
                name: 'حوار الخريجين',
                sub: 'Graduate Dialogue',
                desc: 'لقاءات ملهمة مع خريجين وقادة في مختلف القطاعات يشاركون تجاربهم المهنية وخبراتهم في سوق العمل.',
                color: 'from-violet-500 to-blue-500',
                bg: 'bg-violet-50',
              },
              {
                icon: '⭐',
                name: 'تميَّز',
                sub: 'Tamayuz',
                desc: 'ملتقى يجمع أكاديميات وشركات تقدم دورات تدريبية متخصصة لاكتشاف مسارات التطوير المهني وتعزيز الملف قبل التدريب.',
                color: 'from-amber-400 to-orange-400',
                bg: 'bg-amber-50',
              },
              {
                icon: '🔐',
                name: 'غرف الهروب المهنية',
                sub: 'Escape Rooms',
                desc: 'غرف هروب ذات طابع مهني يواجه فيها المشارك تحديات من عالم العمل الحقيقي ويحلّها تحت ضغط الوقت في تجربة تعليمية فريدة.',
                color: 'from-violet-600 to-indigo-500',
                bg: 'bg-violet-50',
              },
              {
                icon: '🏢',
                name: 'مسارك المهني',
                sub: 'Career Path',
                desc: 'ملتقى مهني يجمع الطلاب بالشركات في منصة تفاعلية تُتيح التعرّف على فرص التدريب التعاوني والتوظيف بشكل مباشر.',
                color: 'from-sky-500 to-blue-600',
                bg: 'bg-sky-50',
              },
              {
                icon: '💡',
                name: 'ملهم',
                sub: 'Mulham',
                desc: 'استضافة شخصيات ناجحة من القطاعين الحكومي والخاص لمشاركة تجاربهم المهنية وإلهام الطلاب نحو التميز.',
                color: 'from-emerald-500 to-teal-400',
                bg: 'bg-emerald-50',
              },
            ].map((p, i) => (
              <AnimatedSection key={p.name} delay={i * 0.1}>
                <div className={`${p.bg} rounded-2xl p-6 card-hover h-full border border-white shadow-sm`}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-2xl mb-4 shadow-md`}>
                    {p.icon}
                  </div>
                  <h3 className="font-black text-slate-900 text-lg mb-0.5">{p.name}</h3>
                  <p className="text-slate-400 text-xs font-medium mb-3">{p.sub}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-bl from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="blob absolute -top-20 -left-20 w-64 h-64 bg-white/5" />
        <div className="blob absolute -bottom-10 -right-10 w-48 h-48 bg-cyan-400/10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              مستعد لبدء رحلتك؟
            </h2>
            <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
              انضم إلى مئات الطلاب الذين يبنون مستقبلهم المهني مع نادي التدريب التعاوني.
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-black rounded-xl text-base hover:bg-blue-50 transition-colors shadow-xl shadow-blue-900/20"
            >
              قدّم الآن ✦
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
