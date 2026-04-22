import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { buscar } from '../../services/Sercives';
import { Tag, PlusCircle, Pencil, Trash, CaretLeft, Terminal } from '@phosphor-icons/react';
import type { Tema } from '../../models/Tema';

function ListarTemas() {
  const navigate = useNavigate();
  const { estaLogado, usuario } = useAuth();
  
  const [temas, setTemas] = useState<Tema[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!estaLogado) {
      navigate('/login');
    }
  }, [estaLogado, navigate]);

  useEffect(() => {
    async function carregarTemas() {
      try {
        const tokenHeader = { headers: { Authorization: usuario.token } };
        await buscar('/temas', setTemas, tokenHeader);
      } catch (error) {
        console.error("Erro ao carregar temas", error);
      } finally {
        setCarregando(false);
      }
    }
    carregarTemas();
  }, [usuario.token]);

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-12 px-4 relative overflow-hidden text-slate-300">
      
      {/* Background Decorativo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/5 rounded-full blur-[150px] -z-10"></div>

      <div className="mx-auto max-w-4xl">
        
        {/* Header Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <button 
              onClick={() => navigate('/comunidade')}
              className="flex items-center gap-2 text-slate-600 hover:text-white transition-colors mb-4 font-mono text-[10px] uppercase tracking-widest"
            >
              <CaretLeft size={16} /> Voltar_Feed
            </button>
            <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-[0.9]">
              Gerenciar <span className="text-violet-500">Tópicos</span>
            </h1>
            <p className="mt-4 text-slate-500 font-mono text-[9px] uppercase tracking-[0.3em] flex items-center gap-2">
              <Terminal size={14} className="text-violet-400" />
              // schema.taxonomy_management.v1
            </p>
          </div>
          
          <Link 
            to="/cadastrar-tema"
            className="inline-flex items-center gap-3 bg-white text-slate-950 px-6 py-4 rounded-[20px] font-black uppercase tracking-tighter hover:bg-violet-600 hover:text-white transition-all active:scale-95 whitespace-nowrap text-sm"
          >
            <PlusCircle size={20} weight="bold" />
            Novo Tema
          </Link>
        </div>

        {/* Listagem */}
        <div className="space-y-4">
          {carregando ? (
            <div className="py-20 flex justify-center">
              <div className="h-10 w-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : temas.length > 0 ? (
            temas.map(tema => (
              <div 
                key={tema.id}
                className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 p-6 rounded-3xl flex items-center justify-between group hover:border-violet-500/30 transition-all"
              >
                <div className="flex items-center gap-5">
                  <div className="h-12 w-12 rounded-2xl bg-violet-600/10 flex items-center justify-center text-violet-400 border border-violet-500/20 group-hover:bg-violet-600 group-hover:text-white transition-all">
                    <Tag size={24} weight="duotone" />
                  </div>
                  <div>
                    <h3 className="text-white font-black uppercase tracking-tight text-lg italic">
                      #{tema.descricao}
                    </h3>
                    <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                       Topic_ID: 0x{tema.id.toString(16).toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link 
                    to={`/editar-tema/${tema.id}`}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <Pencil size={18} weight="bold" />
                  </Link>
                  <Link 
                    to={`/deletar-tema/${tema.id}`}
                    className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all"
                  >
                    <Trash size={18} weight="bold" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="py-32 text-center bg-slate-900/20 border border-dashed border-white/10 rounded-[40px]">
              <Tag size={48} className="mx-auto text-slate-800 mb-6" />
              <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em]">
                // sem_temas_cadastrados
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default ListarTemas;
