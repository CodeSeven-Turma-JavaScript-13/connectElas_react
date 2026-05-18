import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { buscar } from '../../services/Sercives';

import { 
  
  BriefcaseIcon,
  BuildingsIcon,
  CalendarIcon,
  CaretLeftIcon,
  CheckCircleIcon,
  ClockIcon,
  TrashIcon
} from '@phosphor-icons/react';
import type { Oportunidade } from '../../models/Oportunidade';

function MinhasCandidaturas() {
  const navigate = useNavigate();
  const { estaLogado, usuario } = useAuth();
  
  const [candidaturas, setCandidaturas] = useState<Oportunidade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!estaLogado) {
      navigate('/login');
    }
  }, [estaLogado, navigate]);

  useEffect(() => {
    async function carregarCandidaturas() {
      try {
        // Endpoint fictício conforme plano de implementação
        await buscar(`/oportunidades/usuario/${usuario.id}`, setCandidaturas, {
          headers: { Authorization: usuario.token }
        });
      } catch (error) {
        console.error("Erro ao carregar candidaturas", error);
        // Mock de dados para demonstração se falhar
        setCandidaturas([
          {
            id: 1,
            titulo: "React Developer Junior",
            empresa: "TechWomen Solutions",
            area: "Front-end",
            descricao: "Vaga para desenvolvedora React...",
            tipoContrato: "CLT",
            modalidade: "Remoto",
            salario: "R$ 4.500,00",
            localizacao: "São Paulo, SP",
            nivelExperiencia: "Junior",
            beneficios: "VR, VA, Seguro de Vida",
            ativa: true,
            status: "DISPONIVEL",
            dataCriacao: new Date().toISOString(),
            dataAtualizacao: new Date().toISOString(),
            candidata: [],
            usuario: { nome: '', usuario: '', senha: '', foto: '', dataNascimento: '', dataCriacao: '', oportunidade: '' }
          }
        ]);
      } finally {
        setLoading(false);
      }
    }
    if (usuario.id !== 0) carregarCandidaturas();
  }, [usuario]);

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 relative overflow-hidden text-slate-300">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-200 bg-violet-600/5 rounded-full blur-[150px] -z-10"></div>

      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <button 
            onClick={() => navigate('/perfil')}
            className="flex items-center gap-2 text-slate-600 hover:text-white transition-colors mb-4 font-mono text-xs uppercase tracking-widest"
          >
            <CaretLeftIcon size={16} />
            Retornar_ao_perfil
          </button>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
            {usuario.tipo?.toLowerCase() === 'recruiter' ? 'Vagas ' : 'Minhas '}
            <span className="bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              {usuario.tipo?.toLowerCase() === 'recruiter' ? 'Anunciadas' : 'Candidaturas'}
            </span>
          </h1>
          <p className="text-slate-500 font-mono text-[10px] mt-2 uppercase tracking-[0.3em]">
            // process_tracking.log
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {candidaturas.length > 0 ? (
              candidaturas.map((vaga) => (
                <div key={vaga.id} className="group bg-slate-900/40 backdrop-blur-2xl border border-white/5 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-violet-500/30 transition-all shadow-lg">
                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-violet-600/20 to-fuchsia-600/20 flex items-center justify-center text-violet-400 border border-violet-500/20">
                      <BuildingsIcon size={28} weight="duotone" />
                    </div>
                    <div>
                      <h3 className="text-white font-black text-lg uppercase tracking-tight group-hover:text-violet-400 transition-colors">
                        {vaga.titulo}
                      </h3>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                         {vaga.empresa} • <span className="text-violet-500/80">{vaga.modalidade}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-8">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-1">Status</span>
                      <span className="flex items-center gap-2 text-xs text-green-400 font-bold bg-green-500/5 px-3 py-1 rounded-full border border-green-500/20">
                        <CheckCircleIcon size={14} weight="bold" />
                        {usuario.tipo?.toLowerCase() === 'recruiter' ? vaga.status : 'Em Análise'}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-1">
                        {usuario.tipo?.toLowerCase() === 'recruiter' ? 'Criada em' : 'Aplicada em'}
                      </span>
                      <span className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                        <ClockIcon size={14} />
                        {new Date(vaga.dataCriacao).toLocaleDateString('pt-BR')}
                      </span>
                    </div>

                    <div className="flex gap-2">
                       <Link 
                        to={`/oportunidades/${vaga.id}`}
                        className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                      >
                        Ver Vaga
                      </Link>
                      <button className="bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 p-2.5 rounded-xl transition-all">
                        <TrashIcon size={18} weight="bold" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center bg-slate-900/20 border border-dashed border-white/10 rounded-[40px]">
                <div className="h-16 w-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BriefcaseIcon size={32} className="text-slate-700" />
                </div>
                <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">
                  {usuario.tipo?.toLowerCase() === 'recruiter' ? 'Você ainda não anunciou nenhuma vaga.' : 'Você ainda não realizou nenhuma candidatura.'}
                </p>
                <Link to="/oportunidades" className="mt-6 inline-block text-fuchsia-500 font-black uppercase text-[10px] tracking-widest hover:text-white transition-colors">
                  Explorar_Mural_de_Vagas →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tip */}
        <div className="mt-12 bg-linear-to-r from-violet-600/10 to-fuchsia-600/10 border border-violet-500/20 p-6 rounded-3xl flex items-start gap-4">
           <div className="h-10 w-10 shrink-0 bg-violet-600/20 rounded-xl flex items-center justify-center text-violet-400">
             <CalendarIcon size={20} weight="bold" />
           </div>
           <div>
             <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-1">Dica de Carreira</h4>
             <p className="text-[10px] text-slate-400 leading-relaxed uppercase tracking-tighter">
               Mantenha seu perfil atualizado e confira regularmente o status de suas candidaturas. Soft skills são tão importantes quanto o código que você escreve!
             </p>
           </div>
        </div>
      </div>
    </div>
  );
}

export default MinhasCandidaturas;
