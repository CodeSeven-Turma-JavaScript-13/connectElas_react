
import React from 'react';

interface CardMembroProps {
  nome: string;
  funcao: string;
  foto: string;
}

const CardMembro: React.FC<CardMembroProps> = ({ nome, funcao, foto }) => {
  return (
    <div className="group relative flex flex-col items-center">
      {/* Container da Imagem com efeito de borda brilhante */}
      <div className="relative mb-6">
        <div className="absolute -inset-1 bg-linear-to-r from-fuchsia-600 to-violet-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
        <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-white/10 bg-slate-900 shadow-2xl transition-transform duration-500 group-hover:scale-105">
          <img 
            src={foto} 
            alt={nome} 
            className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </div>

      {/* Informações do Membro */}
      <div className="text-center">
        <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-1 group-hover:text-fuchsia-400 transition-colors">
          {nome}
        </h3>
        <p className="text-slate-500 font-mono text-sm uppercase tracking-[0.2em]">
          {funcao}
        </p>
      </div>
    </div>
  );
};

export default CardMembro;
