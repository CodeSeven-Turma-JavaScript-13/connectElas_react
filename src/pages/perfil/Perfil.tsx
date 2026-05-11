import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { buscar } from '../../services/Sercives';

import {  
  CodeIcon,
  IdentificationCardIcon,
  EnvelopeSimpleIcon,
  CalendarIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  BriefcaseIcon,
  CaretRightIcon
} from '@phosphor-icons/react';
import type { Usuario } from '../../models/Usuario';
import type { Oportunidade } from '../../models/Oportunidade';

function Perfil() {
  const navigate = useNavigate();
  const { usuario, estaLogado } = useAuth();
  
  const [perfilCompleto, setPerfilCompleto] = useState<Usuario>({
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    dataNascimento: '',
    dataCriacao: '',
    oportunidade: ''
  });

  const [candidaturas, setCandidaturas] = useState<Oportunidade[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!estaLogado) {
      alert('Você precisa estar logada para acessar o perfil.');
      navigate('/login');
    }
  }, [estaLogado, navigate]);

  useEffect(() => {
  async function carregarDados() {
    if (usuario.id !== 0) {
      try {
        // Busca perfil completo
        await buscar(`/usuarios/${usuario.id}`, setPerfilCompleto, {
          headers: { Authorization: usuario.token }
        });
        
        // Busca candidaturas
        await buscar(`/oportunidades/usuario/${usuario.id}`, setCandidaturas, {
          headers: { Authorization: usuario.token }
        });

      } catch (error) {
        console.error("Erro ao carregar dados.", error);
        // Em vez de criar um objeto novo com foto fixa, 
        // apenas garantimos que o nome e usuario venham do AuthContext
        setPerfilCompleto(prev => ({
          ...prev,
          nome: usuario.nome || "Desenvolvedora Connect",
          usuario: usuario.usuario,
          dataNascimento:"1995-01-01",
          oportunidade: ''
          // Usa a foto do contexto se a busca falhar
        }));
      } finally {
        setIsLoading(false);
      }
    }
  }
  carregarDados();
}, [usuario]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-12 px-4 relative overflow-hidden text-slate-300">
      <div className="absolute top-0 left-1/4 w-125 h-125 bg-fuchsia-600/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-125 h-125 bg-violet-600/5 rounded-full blur-[120px] -z-10"></div>

      <div className="mx-auto max-w-4xl space-y-8">
        {/* Card Principal de Perfil */}
        <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
          <div className="h-48 bg-linear-to-r from-fuchsia-600/20 via-violet-600/20 to-fuchsia-600/20 relative">
             <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <CodeIcon size={120} weight="thin" />
             </div>
          </div>

          <div className="px-8 pb-12 -mt-20 relative">
            <div className="flex flex-col md:flex-row items-end gap-6 mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-tr from-fuchsia-500 to-violet-500 rounded-full blur-md opacity-40 group-hover:opacity-100 transition-opacity"></div>
                <img 
                  src={perfilCompleto?.foto || "https://ik.imagekit.io/Outwake/2606518_5857484(1).jpg"} 
                  className="h-40 w-40 rounded-full border-4 border-slate-950 relative object-cover bg-slate-800"
                  alt="Avatar"
                />
              </div>
              <div className="flex-1 pb-2 text-center md:text-left">
                <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">{perfilCompleto?.nome || usuario?.nome || "Dev"}</h1>
                <p className="text-fuchsia-400 font-mono text-sm font-bold uppercase tracking-widest mt-1">Full Stack Developer // Level 1</p>
              </div>
              <div className="flex gap-3 pb-2 w-full md:w-auto">
                <button className="flex-1 md:flex-none bg-white text-slate-950 px-6 py-3 rounded-2xl font-black uppercase tracking-tighter hover:bg-fuchsia-500 hover:text-white transition-all active:scale-95 text-xs">
                  Editar Perfil
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h3 className="text-white font-bold uppercase tracking-widest text-[10px] mb-4 flex items-center gap-2">
                    <IdentificationCardIcon size={16} className="text-fuchsia-500" /> Sobre Mim
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed bg-slate-950/40 p-6 rounded-3xl border border-white/5">
                    Apaixonada por construir o futuro através do código. Minha stack principal envolve React e TypeScript, e estou sempre em busca de novas formas de empoderar mulheres na tecnologia.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 flex items-center gap-4">
                    <EnvelopeSimpleIcon size={24} className="text-violet-500" />
                    <div><p className="text-[9px] text-slate-500 uppercase font-black">Email</p><p className="text-sm text-slate-200">{perfilCompleto?.usuario || usuario?.usuario || "—"}</p></div>
                  </div>
                  <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 flex items-center gap-4">
                    <CalendarIcon size={24} className="text-violet-500" />
                    <div><p className="text-sm text-slate-200">
                                      {perfilCompleto?.dataCriacao
                                      ? new Date(perfilCompleto.dataCriacao).toLocaleDateString('pt-BR')
                                      : '—'}
                          </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="text-white font-bold uppercase tracking-widest text-[10px] mb-4">Sociais</h3>
                  <div className="space-y-2">
                    <a href="#" className="flex items-center justify-between bg-slate-950/60 p-3 rounded-xl border border-white/5 hover:border-fuchsia-500/30 transition-colors">
                      <div className="flex items-center gap-2"><GithubLogoIcon size={18} /><span className="text-xs">GitHub</span></div>
                    </a>
                    <a href="#" className="flex items-center justify-between bg-slate-950/60 p-3 rounded-xl border border-white/5 hover:border-fuchsia-500/30 transition-colors">
                      <div className="flex items-center gap-2"><LinkedinLogoIcon size={18} /><span className="text-xs">LinkedIn</span></div>
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold uppercase tracking-widest text-[10px] mb-4">Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'NestJS', 'TS'].map(tech => (
                      <span key={tech} className="px-2 py-1 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded text-[8px] font-black text-fuchsia-400 uppercase">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção: Atividades Recentes */}
        <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[40px] p-8">
          <div className="flex items-center justify-between mb-8 px-2">
             <h3 className="text-white font-black uppercase tracking-widest text-sm flex items-center gap-3 italic">
                <BriefcaseIcon size={24} weight="fill" className="text-violet-500" /> Candidaturas Recentes
             </h3>
             <Link to="/perfil/candidaturas" className="text-[10px] font-black text-fuchsia-400 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1">
               Ver Todas <CaretRightIcon size={14} weight="bold" />
             </Link>
          </div>

          <div className="space-y-3">
            {Array.isArray(candidaturas) && candidaturas.length > 0 ? (
              candidaturas.slice(0, 3).map(c => (
                <div key={c?.id} className="bg-slate-950/60 border border-white/5 p-5 rounded-2xl flex justify-between items-center hover:border-violet-500/30 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-violet-600/10 rounded-xl flex items-center justify-center text-violet-400 border border-violet-500/10">
                      <CodeIcon size={20} weight="bold" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white uppercase tracking-tight group-hover:text-violet-400 transition-colors">{c?.titulo || "Oportunidade"}</p>
                      <p className="text-[10px] text-slate-500 uppercase font-mono tracking-widest">{c?.empresa || "—"}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-black text-green-400 bg-green-500/5 px-3 py-1 rounded-full border border-green-500/20 uppercase">
                    Em Análise
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-[10px] text-slate-600 font-mono uppercase tracking-[0.2em]">Nenhuma candidatura recente detectada.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
