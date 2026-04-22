import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Briefcase, Users, GraduationCap, ArrowRight } from '@phosphor-icons/react';

function Home() {
  const { estaLogado } = useAuth();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-300 relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[150px] -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px] -z-10"></div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-fuchsia-400 mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
            </span>
            Versão 1.0 // Deploy de Carreira
          </div>

          <h1 className="text-6xl font-black tracking-tight text-white sm:text-8xl leading-tight">
            CODANDO O <br />
            <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">FUTURO DELAS</span>
          </h1>
          
          <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-400 font-light leading-relaxed">
            A plataforma onde <span className="text-fuchsia-400 font-medium">Arquitetura Limpa</span> encontra o <span className="text-fuchsia-400 font-medium">Empoderamento Feminino</span>. 
            Conecte-se às melhores oportunidades e às empresas que buscam o seu talento.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {!estaLogado ? (
              <>
                <Link 
                  to="/cadastro"
                  className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black uppercase tracking-tighter hover:bg-fuchsia-500 hover:text-white hover:shadow-[0_0_30px_rgba(217,70,239,0.4)] transition-all active:scale-95 flex items-center gap-3"
                >
                  Registrar Agora <ArrowRight size={20} weight="bold" />
                </Link>
                <Link 
                  to="/login"
                  className="bg-slate-900/60 border border-white/10 px-10 py-5 rounded-2xl font-black uppercase tracking-tighter text-white hover:bg-white/5 transition-all text-sm"
                >
                  Acessar Console
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/oportunidades"
                  className="bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-tighter hover:shadow-[0_0_30px_rgba(192,38,211,0.4)] transition-all active:scale-95 flex items-center gap-3"
                >
                  Ver Oportunidades <Briefcase size={20} weight="bold" />
                </Link>
                <Link 
                  to="/perfil/candidaturas"
                  className="bg-slate-900/60 border border-white/10 px-10 py-5 rounded-2xl font-black uppercase tracking-tighter text-white hover:bg-white/5 transition-all text-sm"
                >
                  Minhas Candidaturas
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Grid de Features */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-slate-900/40 backdrop-blur-3xl p-8 rounded-[32px] border border-white/5 hover:border-fuchsia-500/20 transition-all group">
            <div className="h-12 w-12 bg-fuchsia-600/10 rounded-2xl flex items-center justify-center text-fuchsia-400 mb-6 group-hover:bg-fuchsia-600 group-hover:text-white transition-all">
              <Users size={24} weight="bold" />
            </div>
            <h3 className="text-white font-black text-xl mb-3 uppercase italic tracking-tight">Comunidade Dev</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Troque experiências sobre React, NestJS e TypeScript com quem entende o seu caminho.</p>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-3xl p-8 rounded-[32px] border border-white/5 hover:border-violet-500/20 transition-all group">
            <div className="h-12 w-12 bg-violet-600/10 rounded-2xl flex items-center justify-center text-violet-400 mb-6 group-hover:bg-violet-600 group-hover:text-white transition-all">
              <Briefcase size={24} weight="bold" />
            </div>
            <h3 className="text-white font-black text-xl mb-3 uppercase italic tracking-tight">Vagas Curadas</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Oportunidades em empresas com cultura inclusiva e foco em crescimento técnico real.</p>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-3xl p-8 rounded-[32px] border border-white/5 hover:border-cyan-500/20 transition-all group">
            <div className="h-12 w-12 bg-cyan-600/10 rounded-2xl flex items-center justify-center text-cyan-400 mb-6 group-hover:bg-cyan-600 group-hover:text-white transition-all">
              <GraduationCap size={24} weight="bold" />
            </div>
            <h3 className="text-white font-black text-xl mb-3 uppercase italic tracking-tight">Mentoria Tech</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Conecte-se com mentoras experientes que ajudarão você a dar o próximo passo na sua stack.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;