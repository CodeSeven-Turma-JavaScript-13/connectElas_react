import { Link } from 'react-router-dom';
import { 
  BriefcaseIcon, 
  BuildingsIcon, 
  CalendarIcon, 
  CurrencyDollarIcon, 
  MapPinIcon, 
  PencilIcon, 
  TrashIcon, 
  CaretDownIcon 
} from '@phosphor-icons/react';
import type { Oportunidade } from '../../../models/Oportunidade';
import { atualizarParcial } from '../../../services/Sercives';
import { useAuth } from '../../../contexts/AuthContext';
import { ToastAlerta } from '../../../util/ToastAlerta';
import { useState } from 'react';

interface CardOportunidadeProps {
  oportunidade: Oportunidade;
}

const statusConfig = {
  DISPONIVEL:   { label: 'Disponível',   badge: 'border-green-500/30 text-green-400 bg-green-500/5',   icon: 'from-fuchsia-600/20 to-violet-600/20 text-fuchsia-400 border-fuchsia-500/20' },
  EM_ANDAMENTO: { label: 'Em Andamento', badge: 'border-sky-500/30   text-sky-400   bg-sky-500/5',     icon: 'from-sky-600/20    to-blue-600/20   text-sky-400    border-sky-500/20'    },
  INDISPONIVEL: { label: 'Indisponível', badge: 'border-slate-500/30 text-slate-400 bg-slate-500/5',   icon: 'from-slate-700/20  to-slate-800/20  text-slate-500  border-white/10'      },
} as const;

function CardOportunidade({ oportunidade }: CardOportunidadeProps) {
  const { usuario } = useAuth();
  const [carregando, setCarregando] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  const status = statusConfig[oportunidade.status as keyof typeof statusConfig] ?? statusConfig.INDISPONIVEL;
  const isAtiva = oportunidade.status !== 'INDISPONIVEL';

  async function mudarStatus(novoStatus: string) {
    if (novoStatus === oportunidade.status) return;
    
    setCarregando(true);
    try {
      // Criamos o payload mantendo TODOS os dados originais para evitar erro 500
      // O segredo está em passar o oportunidade.id real aqui
      const dadosAtualizados = {
        ...oportunidade,
        id: oportunidade.id, 
        status: novoStatus
      };

      await atualizarParcial(
        `/oportunidades`, // Removi o /id da URL pois o Service já deve lidar com o objeto completo no PUT/PATCH
        dadosAtualizados, 
        () => {
          ToastAlerta("Status da vaga atualizado com sucesso!", "sucesso");
          setTimeout(() => window.location.reload(), 1000);
        }, 
        { headers: { Authorization: usuario.token } }
      );
    } catch (error: any) {
      console.error("Erro ao processar status", error);
      ToastAlerta("Falha ao atualizar status. Verifique sua conexão.", "erro");
    } finally {
      setCarregando(false);
      setMenuAberto(false);
    }
  }

  return (
    <div className={`group relative bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 transition-all hover:border-fuchsia-500/30 hover:shadow-[0_0_40px_rgba(217,70,239,0.1)] overflow-hidden ${
      !isAtiva ? 'opacity-60 grayscale-[0.5]' : ''
    }`}>

      <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

      <div className="flex flex-col h-full relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className={`h-12 w-12 rounded-2xl bg-linear-to-br flex items-center justify-center border transition-all ${status.icon}`}>
              <BuildingsIcon size={24} weight="duotone" />
            </div>
            <div>
              <h3 className={`font-black text-lg tracking-tight group-hover:text-fuchsia-400 transition-colors uppercase ${
                !isAtiva ? 'text-slate-400' : 'text-white'
              }`}>
                {oportunidade.titulo}
              </h3>
              <p className={`font-mono text-[10px] uppercase tracking-widest font-bold ${
                isAtiva ? 'text-fuchsia-500/80' : 'text-slate-600'
              }`}>
                {oportunidade.empresa}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3 relative">
            {/* Badge de Status Interativo */}
            <button 
              disabled={carregando || usuario.tipo?.toLowerCase() !== 'recruiter'}
              onClick={() => setMenuAberto(!menuAberto)}
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all hover:brightness-125 ${status.badge} ${carregando ? 'animate-pulse' : ''} ${usuario.tipo?.toLowerCase() !== 'recruiter' ? 'cursor-default hover:brightness-100' : ''}`}
            >
              {status.label}
             
            </button>

            {/* Menu de Troca de Status */}
            {menuAberto && (
              <div className="absolute top-8 right-0 mt-2 w-40 bg-slate-900 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                {(Object.keys(statusConfig) as Array<keyof typeof statusConfig>).map((key) => (
                  <button
                    key={key}
                    onClick={() => mudarStatus(key)}
                    className="w-full text-left px-4 py-2 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5 last:border-none"
                  >
                    {statusConfig[key].label}
                  </button>
                ))}
              </div>
            )}

            {usuario.tipo?.toLowerCase() === 'recruiter' && (
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity relative z-20">
                <Link
                  to={`/editar-vaga/${oportunidade.id}`}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all"
                  title="Editar Vaga"
                >
                  <PencilIcon size={16} weight="bold" />
                </Link>
                <Link
                  to={`/deletar-vaga/${oportunidade.id}`}
                  className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:scale-110 transition-all"
                  title="Deletar Vaga"
                >
                  <TrashIcon size={16} weight="bold" />
                </Link>
              </div>
            )}
          </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
          {oportunidade.descricao}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="flex items-center gap-2 text-slate-500">
            <MapPinIcon size={16} className="text-violet-500" />
            <span className="text-[11px] font-medium">{oportunidade.localizacao} ({oportunidade.modalidade})</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <BriefcaseIcon size={16} className="text-violet-500" />
            <span className="text-[11px] font-medium">{oportunidade.tipoContrato}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <CurrencyDollarIcon size={16} className="text-violet-500" />
            <span className="text-[11px] font-medium">{oportunidade.salario}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <CalendarIcon size={16} className="text-violet-500" />
            <span className="text-[11px] font-medium">Nível: {oportunidade.nivelExperiencia}</span>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between relative z-20">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 w-6 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[8px] text-fuchsia-400 font-bold">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
            <div className="h-6 w-6 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[8px] text-slate-500">
              +{oportunidade.candidata?.length || 0}
            </div>
          </div>

          <Link
            to={`/oportunidades/${oportunidade.id}`}
            className="text-[10px] font-black text-white uppercase tracking-widest bg-linear-to-r from-fuchsia-600 to-violet-600 px-5 py-2.5 rounded-xl hover:shadow-[0_0_15px_rgba(192,38,211,0.4)] transition-all active:scale-95 text-center relative z-20"
          >
            Ver Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CardOportunidade;