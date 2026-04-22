import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import { buscar, deletar } from '../../services/Sercives';
import { 
  Trash, Warning, CaretLeft, 
  CheckCircle, Buildings 
} from '@phosphor-icons/react';
import type { Oportunidade } from '../../models/Oportunidade';

function DeletarOportunidade() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { estaLogado, usuario } = useAuth();

  const [oportunidade, setOportunidade] = useState<Oportunidade | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!estaLogado) {
      navigate('/login');
    }
  }, [estaLogado, navigate]);

  useEffect(() => {
    if (id) {
      buscarVaga(id);
    }
  }, [id]);

  async function buscarVaga(id: string) {
    try {
      await buscar(`/oportunidades/${id}`, setOportunidade, {
        headers: { Authorization: usuario.token }
      });
    } catch (error) {
      console.error("Erro ao buscar vaga", error);
    } finally {
      setCarregando(false);
    }
  }

  async function deletarVaga() {
    try {
      await deletar(`/oportunidades/${id}`, {
        headers: { Authorization: usuario.token }
      });
      alert('Vaga removida com sucesso de nossos servidores.');
      navigate('/oportunidades');
    } catch (error) {
      console.error("Erro ao deletar vaga", error);
      alert('Erro ao tentar remover a vaga. Tente novamente mais tarde.');
    }
  }

  if (carregando) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="h-10 w-10 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-12 px-4 relative overflow-hidden">
      
      {/* Background Decorativo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[150px] -z-10"></div>

      <div className="mx-auto max-w-xl">
        <div className="bg-slate-900/60 backdrop-blur-3xl border border-red-500/10 p-8 md:p-12 rounded-[40px] shadow-2xl relative text-center">
          
          <button 
            onClick={() => navigate(-1)}
            className="absolute top-8 left-8 flex items-center gap-2 text-slate-600 hover:text-white transition-colors font-mono text-[9px] uppercase tracking-widest"
          >
            <CaretLeft size={16} /> Voltar
          </button>

          <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 text-red-500 mb-8 border border-red-500/20">
            <Trash size={40} weight="duotone" />
          </div>

          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4">
            Confirmar Exclusão?
          </h2>
          
          <div className="bg-slate-950/40 p-6 rounded-3xl border border-white/5 mb-8 text-left">
            <div className="flex items-center gap-3 mb-2">
              <Buildings size={18} className="text-slate-500" />
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{oportunidade?.empresa}</p>
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-2">
              {oportunidade?.titulo}
            </h3>
            <p className="text-xs text-slate-400 line-clamp-2">
              {oportunidade?.descricao}
            </p>
          </div>

          <div className="flex items-center gap-3 mb-10 text-left px-4">
            <Warning size={24} className="text-red-500 shrink-0" weight="fill" />
            <p className="text-[10px] text-slate-500 uppercase tracking-tighter leading-relaxed">
              Esta ação é <span className="text-red-400 font-black underline">irreversível</span>. Os logs desta vaga e todas as candidaturas vinculadas serão permanentemente removidos.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <button
               onClick={deletarVaga}
               className="w-full bg-red-600 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-tighter hover:bg-red-500 hover:shadow-[0_0_40px_rgba(239,68,68,0.3)] transition-all active:scale-95"
            >
              Apagar Permanentemente
            </button>
            <button 
              onClick={() => navigate('/oportunidades')}
              className="text-[10px] font-black text-slate-600 uppercase tracking-widest hover:text-white transition-colors"
            >
              Cancelar_Operacao
            </button>
          </div>

          {/* Logic Log */}
          <div className="mt-12 pt-6 border-t border-white/5 flex justify-center items-center text-[7px] font-mono text-slate-800 uppercase tracking-[0.4em]">
             <CheckCircle size={10} className="mr-2" /> SESSION_KEY_VALIDATED // DELETE_AUTH_LEVEL_2
          </div>

        </div>
      </div>
    </div>
  );
}

export default DeletarOportunidade;
