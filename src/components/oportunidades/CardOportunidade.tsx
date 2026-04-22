import React from 'react';
import { Link } from 'react-router-dom';

import { 
  Briefcase, MapPin, CurrencyDollar, 
  Calendar, Buildings, Pencil, Trash 
} from '@phosphor-icons/react';
import type { Oportunidade } from '../../models/Oportunidade';

interface CardOportunidadeProps {
  oportunidade: Oportunidade;
}

function CardOportunidade({ oportunidade }: CardOportunidadeProps) {
  return (
    <div className={`group relative bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 transition-all hover:border-fuchsia-500/30 hover:shadow-[0_0_40px_rgba(217,70,239,0.1)] overflow-hidden ${
      !oportunidade.ativa ? 'opacity-60 grayscale-[0.5]' : ''
    }`}>
      
      {/* Detalhe de Gradiente no Hover - pointer-events-none para não bloquear cliques */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

      <div className="flex flex-col h-full relative z-10">
        {/* Header do Card */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br flex items-center justify-center border transition-all ${
              oportunidade.ativa 
                ? 'from-fuchsia-600/20 to-violet-600/20 text-fuchsia-400 border-fuchsia-500/20' 
                : 'from-slate-700/20 to-slate-800/20 text-slate-500 border-white/10'
            }`}>
              <Buildings size={24} weight="duotone" />
            </div>
            <div>
              <h3 className={`text-white font-black text-lg tracking-tight group-hover:text-fuchsia-400 transition-colors uppercase ${
                !oportunidade.ativa ? 'text-slate-400' : ''
              }`}>
                {oportunidade.titulo}
              </h3>
              <p className={`font-mono text-[10px] uppercase tracking-widest font-bold ${
                oportunidade.ativa ? 'text-fuchsia-500/80' : 'text-slate-600'
              }`}>
                {oportunidade.empresa}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
              oportunidade.ativa ? 'border-green-500/30 text-green-400 bg-green-500/5' : 'border-slate-500/30 text-slate-400 bg-slate-500/5'
            }`}>
              {oportunidade.ativa ? 'Disponível' : 'Indisponível'}
            </span>
            
            {/* Opções de Gestão - z-20 para garantir prioridade de clique */}
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity relative z-20">
              <Link 
                to={`/editar-vaga/${oportunidade.id}`}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all cursor-pointer"
                title="Editar Vaga"
              >
                <Pencil size={16} weight="bold" />
              </Link>
              <Link 
                to={`/deletar-vaga/${oportunidade.id}`}
                className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:scale-110 transition-all cursor-pointer"
                title="Deletar Vaga"
               >
                <Trash size={16} weight="bold" />
              </Link>
            </div>
          </div>
        </div>

        {/* Descrição Curta */}
        <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
          {oportunidade.descricao}
        </p>

        {/* Tags de Detalhes */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="flex items-center gap-2 text-slate-500">
            <MapPin size={16} className="text-violet-500" />
            <span className="text-[11px] font-medium">{oportunidade.localizacao} ({oportunidade.modalidade})</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <Briefcase size={16} className="text-violet-500" />
            <span className="text-[11px] font-medium">{oportunidade.tipoContrato}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <CurrencyDollar size={16} className="text-violet-500" />
            <span className="text-[11px] font-medium">{oportunidade.salario}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <Calendar size={16} className="text-violet-500" />
            <span className="text-[11px] font-medium">Nível: {oportunidade.nivelExperiencia}</span>
          </div>
        </div>

        {/* Footer do Card */}
        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between relative z-20">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 w-6 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[8px] text-fuchsia-400 font-bold">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
            <div className="h-6 w-6 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[8px] text-slate-500">
              +12
            </div>
          </div>
          
          <Link 
            to={`/oportunidades/${oportunidade.id}`}
            className="text-[10px] font-black text-white uppercase tracking-widest bg-gradient-to-r from-fuchsia-600 to-violet-600 px-5 py-2.5 rounded-xl hover:shadow-[0_0_15px_rgba(192,38,211,0.4)] transition-all active:scale-95 text-center relative z-20"
          >
            Ver Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CardOportunidade;
