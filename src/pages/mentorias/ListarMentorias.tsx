import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import { buscar } from '../../services/Sercives';
import { ArrowRightIcon, FunnelIcon, GithubLogoIcon, GraduationCapIcon, LinkedinLogoIcon, MagnifyingGlassIcon, SparkleIcon } from '@phosphor-icons/react';
import type { Mentoria } from '../../models/Mentoria';
import { ToastAlerta } from '../../util/ToastAlerta';

function ListarMentorias() {
  const navigate = useNavigate();
  const { estaLogado, usuario } = useAuth();
  
  const [mentorias, setMentorias] = useState<Mentoria[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    if (!estaLogado) {
      ToastAlerta('Você precisa estar logada para acessar a área de mentoria.', 'info');
      navigate('/login');
    }
  }, [estaLogado, navigate]);

  useEffect(() => {
    async function carregarMentorias() {
      try {
        const tokenHeader = { headers: { Authorization: usuario.token } };
        await buscar('/mentorias', setMentorias, tokenHeader);
      } catch (error) {
        
        console.error("Erro ao carregar mentorias", error);
        // Mock de dados se falhar
        setMentorias([
          {
            id: 1,
            nome: "Aimee Tompson",
            especialidade: "Java & Spring",
            bio: "Especialista em Java, focada em performance e escalabilidade. Atualmente Instrutora na Generation Brasil.",
            foto: "https://media.licdn.com/dms/image/v2/C4D03AQG-GED78ZIu3g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1605569367685?e=1778716800&v=beta&t=WVgc9rJaLVjIjwPWj92iqKHZhCCbiOD1Kl3bfjMA9aY",
            linkedin: "https://www.linkedin.com/in/aimeezita/",
            disponivel: true
          },
          {
            id: 2,
            nome: "Rafael Queiróz",
            especialidade: "React & TypeScript",
            bio: "Com mais de 25 anos de experiência na área de Tecnologia da Informação. Ajudo as pessoas a dominarem a área da tecnologia.",
            foto: "https://avatars.githubusercontent.com/u/60499241?v=4",
            linkedin: "https://linkedin.com",
            github: "https://github.com/rafaelq80",
            disponivel: true
          },
          {
             id: 3,
             nome: "Vitória Hardt",
             especialidade: "Empregabilidade & Carreira",
             bio: "Mentora de Empregabilidade: Humanizando processos seletivos e destravando carreiras.",
             foto: "https://media.licdn.com/dms/image/v2/D4D03AQHDp4j1URIfBA/profile-displayphoto-scale_400_400/B4DZzKo_2rHYAg-/0/1772926272942?e=1778716800&v=beta&t=bvS4FLmuCzIVPwF2S-aizbq0ubNY43vacyeL6bCXydQ",
             linkedin: "https://www.linkedin.com/in/vithardt/",
             disponivel: false
          }
        ]);
      } finally {
        setCarregando(false);
      }
    }
    carregarMentorias();
  }, [usuario.token]);

   const mentoriasFiltradas = mentorias.filter(op => 
    op.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    op.especialidade.toLowerCase().includes(filtro.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-12 px-4 relative overflow-hidden text-slate-300">
      
      {/* Background Decorativo */}
      <div className="absolute top-1/4 left-1/4 w-150 h-150 bg-violet-600/5 rounded-full blur-[150px] -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-150 h-150 bg-cyan-600/5 rounded-full blur-[150px] -z-10"></div>

      <div className="mx-auto max-w-7xl">
        

        {/* Hero Section Mentoria */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-20 bg-slate-900/40 backdrop-blur-3xl border border-white/5 p-10 md:p-16 rounded-[48px] relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-10">
              <GraduationCapIcon size={160} weight="thin" />
           </div>
           
           <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-600/10 border border-violet-500/20 rounded-full text-[10px] font-black text-violet-400 uppercase tracking-widest mb-6">
               <SparkleIcon size={14} weight="fill" />
               Acelere seu Conhecimento
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-[0.9] mb-6">
              Mentoras de <span className="bg-linear-to-r pr-5 pl-1 from-violet-400 to-cyan-400 bg-clip-text text-transparent">Alta Performance</span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-lg mb-8">
              Encontre o guia certo para sua carreira. Nossos mentores são líderes do mercado prontas para compartilhar experiências reais e técnicas.
            </p>
            <div className="flex items-center gap-6">
               <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="h-10 w-10 rounded-full border-2 border-slate-900" />
                  ))}
               </div>
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">+50 Mentoras Ativas</span>
            </div>
           </div>

           <div className="relative group">
              <div className="absolute inset-0 bg-violet-600 opacity-20 blur-[60px] group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-slate-950 border border-white/10 p-8 rounded-4xl w-full lg:w-80 shadow-2xl">
                 <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Seja uma Mentora</h4>
                 <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-tighter mb-6">Compartilhe seu brilho e ajude a formar as próximas líderes tech.</p>
                 <button className="w-full bg-white text-slate-950 px-6 py-4 rounded-2xl font-black uppercase tracking-tighter text-xs hover:bg-violet-500 hover:text-white transition-all active:scale-95">
                   Inscrição para Mentoria
                 </button>
              </div>
           </div>
        </div>


        {/* Toolbar de Filtros */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
           <div className="relative w-full md:max-w-md">
             <MagnifyingGlassIcon size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" />
             <input 
               type="text" 
               placeholder="FILTRARPER_ESPECIALIDADE_OU_NOME..."
               className="w-full bg-slate-900/60 border border-white/5 rounded-2xl pl-16 pr-6 py-4 text-xs font-mono uppercase tracking-widest text-slate-400 focus:outline-none focus:border-violet-500/30 transition-all"
               value={filtro}
               onChange={(e) => setFiltro(e.target.value)}
             />
           </div>
           <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600/10 text-violet-400 border border-violet-500/20 text-[9px] font-black uppercase tracking-widest shrink-0"><FunnelIcon size={14} /> Filtros</button>
              {['React', 'Typescript', 'Java', 'Spring', 'Empregabilidade', 'Carreira'].map(stack => (
                <button key={stack} className="px-5 py-3 rounded-xl border border-white/5 text-slate-500 hover:text-white hover:bg-white/5 transition-all text-[9px] font-black uppercase tracking-widest shrink-0">{stack}</button>
              ))}
           </div>
        </div>



        {/* Grid de Mentoras */}
        {carregando ? (
          <div className="py-20 flex justify-center">
             <div className="h-10 w-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentoriasFiltradas.map(mentora => (
              <div key={mentora.id} className="group relative bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[40px] p-8 hover:border-violet-500/30 transition-all overflow-hidden flex flex-col h-full shadow-lg">
                <div className="flex items-start justify-between mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-violet-600/20 rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <img 
                      src={mentora.foto} 
                      alt={mentora.nome} 
                      className="relative h-20 w-20 rounded-3xl object-cover border-2 border-white/5"
                    />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.2em] border ${mentora.disponivel ? 'bg-green-500/5 text-green-400 border-green-500/20' : 'bg-red-500/5 text-red-400 border-red-500/20'}`}>
                    {mentora.disponivel ? 'Disponível' : 'Agenda Cheia'}
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase group-hover:text-violet-400 transition-colors">
                      {mentora.nome}
                    </h3>
                    <p className="text-violet-500 font-bold uppercase tracking-widest text-[10px] mt-1">{mentora.especialidade}</p>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                    {mentora.bio}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex gap-3">
                    <a href={mentora.linkedin} className="h-8 w-8 rounded-lg bg-slate-950 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-violet-600 transition-all">
                       <LinkedinLogoIcon size={18} weight="bold" />
                    </a>
                    {mentora.github && (
                      <a href={mentora.github} className="h-8 w-8 rounded-lg bg-slate-950 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-violet-600 transition-all">
                        <GithubLogoIcon size={18} weight="bold" />
                      </a>
                    )}
                  </div>
                  
                  <button className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-tighter hover:text-violet-400 transition-colors">
                    Solicitar Agenda <ArrowRightIcon size={16} weight="bold" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}


        {/* Footer info */}
        <div className="mt-20 text-center border-t border-white/5 pt-12">
           <p className="text-[10px] text-slate-700 font-mono uppercase tracking-[0.4em]">system_active: mentor_network_sync // AES_256_ACTIVE</p>
        </div>

      </div>
    </div>
  );
}

export default ListarMentorias;
