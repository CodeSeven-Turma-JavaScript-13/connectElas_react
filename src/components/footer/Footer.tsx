import React from 'react';

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-950 py-12 px-4">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <div className="text-white font-bold uppercase tracking-widest text-xs mb-2">ConnectElas System v1.0</div>
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">
            Criado com ♥ pela 7Code
          </p>
        </div>

        <div className="flex gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <a href="#" className="hover:text-fuchsia-500 transition-colors">GitHub</a>
          <a href="#" className="hover:text-fuchsia-500 transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-fuchsia-500 transition-colors">Diretrizes</a>
        </div>
        
        <div className="text-[10px] text-fuchsia-600 font-mono">
          &lt;/&gt; Status: Compilado com sucesso
        </div>
      </div>
    </footer>
  );
}

export default Footer;