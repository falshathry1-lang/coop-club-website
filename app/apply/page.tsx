import AnimatedSection from '@/components/AnimatedSection';
import ApplyForm from '@/components/ApplyForm';

export default function ApplyPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
        <div className="blob absolute -top-20 -left-20 w-80 h-80 bg-blue-100/50 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              التقديم مفتوح الآن
            </span>
            <h1 className="section-heading text-slate-900 mb-6">
              انضم إلى <span className="text-gradient">نادي التدريب التعاوني</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              ابدأ خطوتك الأولى نحو بناء مستقبلك المهني. نبحث عن طلاب متحمسين وطموحين يريدون صنع الفارق.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Perks */}
      <section className="py-8 bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: '🚀', text: 'رحلات تدريبية' },
              { icon: '🤝', text: 'شبكة علاقات مهنية' },
              { icon: '🏆', text: 'فعاليات تميز' },
              { icon: '🎓', text: 'حوار الخريجين' },
            ].map((p) => (
              <div key={p.text} className="flex flex-col items-center gap-2 text-center p-4 rounded-2xl bg-blue-50/60">
                <span className="text-2xl">{p.icon}</span>
                <span className="text-sm font-bold text-slate-700">{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-blue-50/50 p-8 sm:p-10">
              <h2 className="text-2xl font-black text-slate-900 mb-2 text-right">استمارة التقديم</h2>
              <p className="text-slate-400 text-sm mb-8 text-right">الحقول المُعلَّمة بـ * إلزامية.</p>
              <ApplyForm />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
