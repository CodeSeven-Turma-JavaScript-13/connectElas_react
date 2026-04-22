import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { TagIcon, TrashIcon, WarningIcon } from '@phosphor-icons/react';
import type { Tema } from '../../../../models/Tema';
import { useAuth } from '../../../../contexts/AuthContext';
import { buscar, deletar } from '../../../../services/Sercives';


function DeletarTema() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { estaLogado, usuario } = useAuth();

  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: ''
  });

  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (!estaLogado) {
      navigate('/login');
    }
  }, [estaLogado, navigate]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function buscarPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: usuario.token }
      });
    } catch (error) {
      console.error("Erro ao buscar tema", error);
    }
  }

  async function executarExclusao() {
    setCarregando(true);
    try {
      await deletar(`/temas/${id}`, {
        headers: { Authorization: usuario.token }
      });
      alert('Tema excluído permanentemente.');
      navigate('/temas');
    } catch (error) {
      console.error("Erro ao excluir tema", error);
      alert('Não foi possível excluir o tema. Verifique se existem postagens vinculadas a ele.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-12 px-4 relative overflow-hidden text-slate-300">
      
      {/* Background Decorativo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-red-600/5 rounded-full blur-[150px] -z-10"></div>

      <div className="mx-auto max-w-xl">
        <div className="bg-slate-900/60 backdrop-blur-3xl border border-red-500/20 p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden text-center">
          
          <div className="h-20 w-20 bg-red-500/10 rounded-3xl flex items-center justify-center text-red-500 mx-auto mb-8 border border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.2)]">
            <TrashIcon size={40} weight="bold" />
          </div>

          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4">
             Eliminar Tópico?
          </h2>
          
          <div className="bg-slate-950/60 rounded-2xl p-6 border border-white/5 mb-8">
            <div className="flex items-center justify-center gap-3 text-red-400 mb-2">
              <TagIcon size={20} weight="bold" />
              <span className="font-mono text-lg font-black uppercase">#{tema.descricao}</span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em]">
               System_ID: {tema.id}
            </p>
          </div>

          <div className="flex items-start gap-4 text-left p-4 bg-red-500/5 rounded-2xl border border-red-500/10 mb-8">
             <div className="text-red-500 mt-1"><WarningIcon size={20} weight="fill" /></div>
             <p className="text-[10px] text-red-400/80 uppercase font-mono leading-relaxed">
                Atenção: A exclusão de um tema pode afetar a visibilidade de postagens vinculadas a ele. Esta ação é irreversível.
             </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/temas')}
              className="rounded-2xl border border-white/10 px-6 py-4 text-slate-500 font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all"
            >
              Abortar
            </button>
            <button 
              onClick={executarExclusao}
              disabled={carregando}
              className="rounded-2xl bg-red-600 text-white font-black uppercase tracking-tighter px-6 py-4 hover:bg-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all active:scale-95 disabled:opacity-50"
            >
              {carregando ? "Eliminando..." : "Confirmar Exclusão"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DeletarTema;
