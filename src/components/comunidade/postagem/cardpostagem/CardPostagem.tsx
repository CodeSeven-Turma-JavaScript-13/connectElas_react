

import { CalendarBlankIcon, ChatCircleDotsIcon, QuotesIcon, TagIcon } from '@phosphor-icons/react';
import type { Postagem } from '../../../../models/Postagem';


interface CardPostagemProps {
  post: Postagem;
}

function CardPostagem({ post }: CardPostagemProps) {
  return (
    <div className="group relative bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[40px] p-8 hover:border-fuchsia-500/20 transition-all shadow-xl overflow-hidden">
      
      {/* Detalhe de Design */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-600/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="flex flex-col h-full gap-6">
        {/* Header do Post */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-center p-0.5 overflow-hidden">
               <img 
                 src={post.usuario?.foto || "https://i.imgur.com/8KpeS9w.png"} 
                 alt={post.usuario?.nome} 
                 className="h-full w-full object-cover rounded-xl"
               />
            </div>
            <div>
              <p className="text-white font-black text-sm uppercase tracking-tighter italic">
                {post.usuario?.nome || "Usuária ConnectElas"}
              </p>
              <div className="flex items-center gap-2 text-slate-500 font-mono text-[9px] uppercase tracking-widest mt-0.5">
                 <CalendarBlankIcon size={12} className="text-violet-500" />
                 {new Date(post.data).toLocaleDateString('pt-BR')}
              </div>
            </div>
          </div>
          
          <span className="px-3 py-1 bg-violet-600/10 border border-violet-500/20 rounded-full text-[9px] font-black text-violet-400 uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
             <TagIcon size={12} weight="bold" />
             #{post.tema?.descricao || 'Tech'}
          </span>
        </div>

        {/* Conteúdo */}
        <div className="relative">
          <div className="absolute -left-2 -top-4 opacity-5 text-fuchsia-500 group-hover:opacity-10 transition-opacity">
            <QuotesIcon size={60} weight="fill" />
          </div>
          <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-4 leading-tight group-hover:text-fuchsia-400 transition-colors">
            {post.titulo}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
            {post.texto}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between font-mono text-xs uppercase tracking-widest">
           <button className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group/btn">
              <ChatCircleDotsIcon size={20} className="text-violet-500 group-hover/btn:scale-110 transition-transform" />
              <span className="text-[10px] font-bold">Ler Discussão</span>
           </button>
           
           <div className="flex -space-x-2">
             {[1,2,3].map(i => (
               <div key={i} className="h-6 w-6 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[8px] text-fuchsia-400 font-black">
                 {String.fromCharCode(64 + i)}
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}

export default CardPostagem;
