import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import { buscar } from '../../services/Sercives';
import CardPostagem from '../../components/comunidade/CardPostagem';
import { 
  Users, PlusCircle, MagnifyingGlass, 
  Funnel, Terminal, Lightning 
} from '@phosphor-icons/react';
import type { Postagem } from '../../models/Postagem';
import type { Tema } from '../../models/Tema';

function ListarPostagens() {
  const navigate = useNavigate();
  const { estaLogado, usuario } = useAuth();
  
  const [postagens, setPostagens] = useState<Postagem[]>([]);
  const [temas, setTemas] = useState<Tema[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!estaLogado) {
      alert('Você precisa estar logada para acessar a comunidade.');
      navigate('/login');
    }
  }, [estaLogado, navigate]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const tokenHeader = { headers: { Authorization: usuario.token } };
        await buscar('/postagens', setPostagens, tokenHeader);
        await buscar('/temas', setTemas, tokenHeader);
      } catch (error) {
        console.error("Erro ao carregar dados da comunidade", error);
      } finally {
        setCarregando(false);
      }
    }
    carregarDados();
  }, [usuario.token]);

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-12 px-4 relative overflow-hidden text-slate-300">
      
      {/* Background Decorativo */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[600px] bg-fuchsia-600/5 rounded-full blur-[150px] -z-10"></div>

      <div className="mx-auto max-w-7xl">
        
        {/* Header Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-[0.9]">
              Nossa <span className="text-fuchsia-500">Comunidade</span>
            </h1>
            <p className="mt-4 text-slate-500 font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-2">
              <Terminal size={16} className="text-fuchsia-400" />
              // connect_elas.social_graph_active
            </p>
          </div>
          
          <Link 
            to="/comunidade/postar"
            className="inline-flex items-center gap-3 bg-white text-slate-950 px-8 py-5 rounded-[24px] font-black uppercase tracking-tighter hover:bg-fuchsia-500 hover:text-white hover:shadow-[0_0_40px_rgba(217,70,239,0.3)] transition-all active:scale-95 whitespace-nowrap"
          >
            <PlusCircle size={24} weight="bold" />
            Nova Publicação
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar Esquerda: Filtros e Temas */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 p-8 rounded-[32px]">
              <h3 className="text-white font-black uppercase tracking-widest text-[10px] mb-6 flex items-center gap-2">
                <Funnel size={16} className="text-fuchsia-500" />
                Explorar_Tópicos
              </h3>
              
              <div className="space-y-2">
                <button className="w-full text-left p-3 rounded-xl bg-fuchsia-600/10 text-fuchsia-400 border border-fuchsia-500/20 text-[10px] font-black uppercase tracking-widest">
                   Todos os Fluxos
                </button>
                {temas.map(tema => (
                  <button key={tema.id} className="w-full text-left p-3 rounded-xl border border-white/5 text-slate-500 hover:text-white hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-widest">
                    #{tema.descricao}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-white/10 p-8 rounded-[32px]">
               <Lightning size={32} className="text-white mb-4" />
               <h4 className="text-white font-black uppercase italic tracking-tighter text-xl mb-2">Trendings</h4>
               <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-relaxed">
                 O que as devs estão comentando agora sobre React 19 e SSR.
               </p>
            </div>
          </div>

          {/* Feed Principal */}
          <div className="lg:col-span-3 space-y-8">
            {/* Barra de Busca */}
            <div className="relative group">
              <MagnifyingGlass size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-fuchsia-400 transition-colors" />
              <input 
                type="text" 
                placeholder="PROCURAR_POSTAGENS..."
                className="w-full bg-slate-900/40 border border-white/5 rounded-[24px] pl-16 pr-8 py-5 text-slate-300 font-mono text-xs uppercase tracking-widest focus:outline-none focus:border-fuchsia-500/30 transition-all shadow-xl"
              />
            </div>

            {carregando ? (
              <div className="py-20 flex justify-center">
                <div className="h-12 w-12 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {postagens.length > 0 ? (
                  postagens.map(post => (
                    <CardPostagem key={post.id} post={post} />
                  ))
                ) : (
                  <div className="col-span-2 py-40 text-center bg-slate-900/20 border border-dashed border-white/10 rounded-[40px]">
                    <Users size={48} className="mx-auto text-slate-800 mb-6" />
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.3em]">
                      // vácuo_digital: nenhuma postagem encontrada
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default ListarPostagens;
