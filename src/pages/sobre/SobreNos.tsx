
import { AppWindowIcon, GlobeIcon, HeartIcon, RocketLaunchIcon, TargetIcon, UsersIcon } from '@phosphor-icons/react';
import Equipe from '../../components/equipe/Equipe';

function SobreNos() {
  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-12 px-4 relative overflow-hidden text-slate-300">
      
      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 w-150 h-150 bg-fuchsia-600/5 rounded-full blur-[150px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-150 h-150 bg-violet-600/5 rounded-full blur-[150px] -z-10"></div>

      <div className="mx-auto max-w-6xl">
        
        {/* Hero Section */}
        <div className="text-center mb-24 relative">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-fuchsia-600 to-violet-700 text-white shadow-[0_0_30px_rgba(192,38,211,0.4)]">
             <RocketLaunchIcon size={36} weight="bold" />
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-[0.8] mb-6">
            Conectando <span className="text-fuchsia-500">Talentos</span><br />
            Construindo <span className="text-violet-500">Futuros</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-500 font-mono text-xs uppercase tracking-[0.3em] leading-relaxed">
            // connect_elas.about_us.manifesto.v2.0
          </p>
        </div>

        {/* Nossa Missão */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/5 text-fuchsia-400 text-[10px] font-black uppercase tracking-widest">
               Nossa Propósito
            </div>
            <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">
              Mais do que uma plataforma,<br />
              um <span className="text-fuchsia-500 from-fuchsia-400 to-violet-400 font-extrabold underline decoration-fuchsia-500/30">Ecossistema</span>.
            </h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              A 7Code nasceu da necessidade de criar um espaço seguro, vibrante e repleto de oportunidades para mulheres na tecnologia. Somos um hub de conexão entre empresas que valorizam a diversidade e profissionais que buscam o próximo nível em suas carreiras.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <h4 className="text-white font-bold uppercase text-xs mb-2">Presença Global</h4>
                <p className="text-slate-500 text-sm">Conectando devs em todo o mundo.</p>
              </div>
              <div>
                <h4 className="text-white font-bold uppercase text-xs mb-2">Comunidade Ativa</h4>
                <p className="text-slate-500 text-sm">Milhares de conexões diárias.</p>
              </div>
            </div>
          </div>
          <div className="relative group">
             <div className="absolute -inset-1 bg-linear-to-r from-fuchsia-600 to-violet-600 rounded-[40px] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
             <div className="relative bg-slate-900 border border-white/5 rounded-[40px] p-12 overflow-hidden flex items-center justify-center min-h-100">
                <GlobeIcon size={120} weight="thin" className="text-fuchsia-500/20 animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-x-0 bottom-12 text-center">
                   <div className="text-5xl font-black text-white italic">+10k</div>
                   <div className="text-[10px] text-fuchsia-500 font-mono uppercase tracking-[0.4em]">impactadas_pela_rede</div>
                </div>
             </div>
          </div>
        </div>

        {/* Valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            { icon: <UsersIcon size={32} />, title: "Sororidade", desc: "Apoio mútuo como base para o crescimento profissional." },
            { icon: <TargetIcon size={32} />, title: "Inovação", desc: "Buscamos o estado da arte em tudo o que construímos." },
            { icon: <HeartIcon size={32} />, title: "Paixão", desc: "Amamos o que fazemos e a comunidade que servimos." }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 p-10 rounded-4xl hover:border-fuchsia-500/30 transition-all group">
              <div className="text-fuchsia-500 mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-white font-black uppercase text-xl italic tracking-tighter mb-4">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Seção Equipe */}
        <Equipe />

        {/* Chamada para Ação */}
        <div className="bg-linear-to-br from-violet-600 to-fuchsia-700 rounded-[50px] p-12 md:p-24 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 opacity-10">
              <AppWindowIcon size={200} />
           </div>
           <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-8 leading-tight">
             Faça parte da nossa história.<br />
             Construa o amanhã conosco.
           </h2>
           <button className="bg-white text-slate-950 px-12 py-5 rounded-2xl font-black uppercase tracking-tighter hover:scale-105 active:scale-95 transition-all shadow-2xl">
              Unir-se à Rede
           </button>
        </div>

      </div>
    </div>
  );
}

export default SobreNos;
