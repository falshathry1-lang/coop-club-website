import AnimatedSection from '@/components/AnimatedSection';
import teamData from '@/data/team.json';

type Member = { name: string; role: string; department: string; photo: string };

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map((w) => w[0]).join('');
}

const avatarGradients = [
  'from-blue-500 to-cyan-400',
  'from-violet-500 to-blue-500',
  'from-indigo-500 to-blue-400',
  'from-cyan-500 to-blue-500',
  'from-blue-600 to-violet-500',
  'from-sky-500 to-indigo-500',
];

function Avatar({ name, photo, index }: { name: string; photo: string; index: number }) {
  const gradient = avatarGradients[index % avatarGradients.length];
  if (photo) return <img src={photo} alt={name} className="w-full h-full object-cover" />;
  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
      <span className="text-white font-black text-lg">{getInitials(name)}</span>
    </div>
  );
}

function MemberCard({ member, index }: { member: Member; index: number }) {
  return (
    <AnimatedSection delay={(index % 5) * 0.07}>
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm card-hover text-center">
        <div className="w-16 h-16 rounded-xl overflow-hidden mx-auto mb-3 shadow-md">
          <Avatar name={member.name} photo={member.photo} index={index} />
        </div>
        <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1">{member.name}</h4>
        <p className="text-blue-600 text-xs font-semibold">{member.role}</p>
      </div>
    </AnimatedSection>
  );
}

function DepartmentSection({ title, dept, members, colorClass }: {
  title: string; dept: string; members: Member[]; colorClass: string;
}) {
  const filtered = members.filter((m) => m.department === dept);
  if (filtered.length === 0) return null;
  return (
    <div>
      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${colorClass} text-sm font-bold mb-5`}>
        {title}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((m, i) => <MemberCard key={`${m.name}-${m.department}`} member={m} index={i} />)}
      </div>
    </div>
  );
}

export default function StructurePage() {
  const all = teamData as Member[];
  const exec = all.filter((m) => m.department === 'Executive');
  const president = exec.filter((m) => m.role === 'President');
  const vps = exec.filter((m) => m.role === 'Vice President');
  const avps = exec.filter((m) => m.role === 'Assistant VP');
  const gds = all.filter((m) => m.role === 'General Director');

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-indigo-50 to-white relative overflow-hidden">
        <div className="blob absolute -top-20 -right-20 w-80 h-80 bg-blue-100/40 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <AnimatedSection>
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">الفريق</p>
            <h1 className="section-heading text-slate-900 mb-6">
              <span className="text-gradient">الهيكل التنظيمي</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              تعرّف على الأشخاص الذين يقفون خلف نادي التدريب التعاوني — فريق متفانٍ من الطلاب يبنون شيئاً رائعاً.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Org Chart */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-2xl font-black text-slate-900">القيادة التنفيذية</h2>
          </AnimatedSection>

          {/* President */}
          <div className="flex justify-center mb-6">
            {president.map((m, i) => (
              <AnimatedSection key={m.name} delay={0}>
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-center shadow-xl shadow-blue-200 w-52">
                  <div className="w-16 h-16 rounded-xl overflow-hidden mx-auto mb-3 ring-2 ring-white/40">
                    <Avatar name={m.name} photo={m.photo} index={i} />
                  </div>
                  <h4 className="font-black text-white text-base leading-tight mb-1">{m.name}</h4>
                  <p className="text-blue-200 text-xs font-bold uppercase tracking-wide">President</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="flex justify-center mb-2"><div className="w-px h-8 bg-blue-200" /></div>

          {/* VPs */}
          <div className="flex justify-center gap-6 flex-wrap mb-2">
            {vps.map((m, i) => (
              <AnimatedSection key={m.name} delay={0.1 + i * 0.05}>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 text-center w-44">
                  <div className="w-12 h-12 rounded-lg overflow-hidden mx-auto mb-2">
                    <Avatar name={m.name} photo={m.photo} index={i + 5} />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1">{m.name}</h4>
                  <p className="text-blue-600 text-xs font-semibold">Vice President</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="flex justify-center mb-2"><div className="w-px h-8 bg-blue-200" /></div>

          {/* AVPs */}
          <div className="flex justify-center gap-6 flex-wrap mb-2">
            {avps.map((m, i) => (
              <AnimatedSection key={m.name} delay={0.15 + i * 0.05}>
                <div className="bg-cyan-50 border-2 border-cyan-200 rounded-2xl p-5 text-center w-44">
                  <div className="w-12 h-12 rounded-lg overflow-hidden mx-auto mb-2">
                    <Avatar name={m.name} photo={m.photo} index={i + 10} />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1">{m.name}</h4>
                  <p className="text-cyan-600 text-xs font-semibold">Assistant VP</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="flex justify-center mb-2"><div className="w-px h-8 bg-blue-200" /></div>

          {/* General Directors */}
          <div className="flex justify-center gap-4 flex-wrap mb-12">
            {gds.map((m, i) => (
              <AnimatedSection key={`${m.name}-gd`} delay={0.2 + i * 0.05}>
                <div className="bg-violet-50 border-2 border-violet-200 rounded-2xl p-4 text-center w-40">
                  <div className="w-10 h-10 rounded-lg overflow-hidden mx-auto mb-2">
                    <Avatar name={m.name} photo={m.photo} index={i + 15} />
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs leading-tight mb-1">{m.name}</h4>
                  <p className="text-violet-600 text-xs font-semibold">General Director</p>
                  <p className="text-slate-400 text-xs">{m.department}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimatedSection className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-900">الأقسام</h2>
          </AnimatedSection>
          <DepartmentSection title="👥 الموارد البشرية" dept="Human Resources" members={all} colorClass="bg-blue-100 text-blue-700" />
          <DepartmentSection title="🤝 الرعاية والتمويل" dept="Sponsorship" members={all} colorClass="bg-emerald-100 text-emerald-700" />
          <DepartmentSection title="📣 العلاقات العامة" dept="Public Relations" members={all} colorClass="bg-violet-100 text-violet-700" />
          <DepartmentSection title="⚙️ العمليات" dept="Operations" members={all} colorClass="bg-slate-200 text-slate-700" />
          <DepartmentSection title="🎬 الإعلام" dept="Media" members={all} colorClass="bg-pink-100 text-pink-700" />
          <DepartmentSection title="🎨 التصميم" dept="Design" members={all} colorClass="bg-amber-100 text-amber-700" />
        </div>
      </section>

      {/* Programmes */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimatedSection className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-900">
              فرق <span className="text-gradient">البرامج</span>
            </h2>
          </AnimatedSection>
          <DepartmentSection title="🚀 رحلة التدريب" dept="Training Journey" members={all} colorClass="bg-blue-100 text-blue-700" />
          <DepartmentSection title="🎓 حوار الخريجين" dept="Graduate Dialogue" members={all} colorClass="bg-indigo-100 text-indigo-700" />
          <DepartmentSection title="⭐ تميز" dept="Tamayuz" members={all} colorClass="bg-amber-100 text-amber-700" />
          <DepartmentSection title="🏢 زيارة الشركات" dept="Company Visit" members={all} colorClass="bg-cyan-100 text-cyan-700" />
          <DepartmentSection title="🔐 غرفة الهروب" dept="Escape Room" members={all} colorClass="bg-violet-100 text-violet-700" />
          <DepartmentSection title="🎪 المعرض الأسبوعي" dept="Weekly Fair" members={all} colorClass="bg-emerald-100 text-emerald-700" />
        </div>
      </section>
    </>
  );
}
