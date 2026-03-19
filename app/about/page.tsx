import AnimatedSection from '@/components/AnimatedSection';
import TimelineSection from '@/components/TimelineSection';
import timelineData from '@/data/timeline.json';

const values = [
  {
    icon: '🎯',
    title: 'الرسالة',
    text: 'ردم الهوة بين التعليم الأكاديمي والواقع المهني من خلال تجارب هادفة تُهيّئ الطلاب لمسيرة مهنية ناجحة.',
    color: 'border-blue-500 bg-blue-50',
  },
  {
    icon: '🔭',
    title: 'الرؤية',
    text: 'أن نكون المرجع الأول لكل طالب على أعتاب مرحلة التدريب التعاوني — نُجهّزه مهنياً، نربطه بالشركات، ونمنحه المهارات والثقة التي يحتاجها قبل أن تبدأ رحلته التعاونية.',
    color: 'border-violet-500 bg-violet-50',
  },
  {
    icon: '💎',
    title: 'القيم',
    text: 'التميز، الانتماء، المبادرة، والاحترافية. نؤمن بأن كل طالب يستحق فرصة اكتشاف هويته المهنية وبناءها.',
    color: 'border-cyan-500 bg-cyan-50',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
        <div className="blob absolute -top-24 -left-24 w-96 h-96 bg-blue-100/50 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <AnimatedSection>
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">قصتنا</p>
            <h1 className="section-heading text-slate-900 mb-6">
              عن <span className="text-gradient">نادي التدريب التعاوني</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              وُلد النادي من فكرة بسيطة — أن الطلاب يستحقون أكثر من الكتب المدرسية — ليتحول إلى مجتمع نابض بالحياة يُغيّر طريقة تعامل طلاب الجامعة مع العالم المهني.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Club Story */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="right">
              <div>
                <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">من نحن</p>
                <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight">
                  أكثر من مجرد نادٍ —{' '}
                  <span className="text-gradient">منصة إطلاق</span>
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    بدأ نادي التدريب التعاوني كمبادرة صغيرة من طلاب آمنوا بأن التدريب التعاوني يمكن أن يكون أكثر من مجرد متطلب تخرج — أرادوا منه مغامرة حقيقية.
                  </p>
                  <p>
                    عبر رحلات التدريب، وجلسات حوار الخريجين، وفعاليات تميز المتعددة، بنينا شيئاً مميزاً: مجتمعاً تلتقي فيه الطموحات بالفرص.
                  </p>
                  <p>
                    اليوم، يضم نادي التدريب التعاوني أكثر من مئتي عضو متحمس موزعين على أقسام متعددة — من الموارد البشرية إلى التصميم، ومن الرعاية إلى العمليات — جميعهم يسعون نحو هدف واحد: مساعدة الطلاب على الازدهار.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'سنة التأسيس', value: '٢٠٢٢', icon: '🏁' },
                  { label: 'الأعضاء', value: '+٢٠٠', icon: '👥' },
                ].map((s) => (
                  <div key={s.label} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 text-center border border-blue-100">
                    <div className="text-3xl mb-2">{s.icon}</div>
                    <div className="text-3xl font-black text-blue-700 mb-1">{s.value}</div>
                    <div className="text-sm text-slate-500 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">ما يحركنا</p>
            <h2 className="section-heading text-slate-900">
              الرسالة والرؤية <span className="text-gradient">والقيم</span>
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <div className={`${v.color} rounded-2xl p-8 border-r-4 card-hover h-full`}>
                  <div className="text-4xl mb-4">{v.icon}</div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">{v.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{v.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">منذ ٢٠٢٢</p>
            <h2 className="section-heading text-slate-900">
              <span className="text-gradient">مسيرتنا</span>
            </h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">
              من فكرة واحدة إلى أربع سنين من الابتكار، هكذا وصلنا إلى هنا.
            </p>
          </AnimatedSection>
          <TimelineSection items={timelineData} />
        </div>
      </section>
    </>
  );
}
