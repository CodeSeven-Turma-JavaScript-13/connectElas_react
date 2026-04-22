import React, { useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {  CaretLeftIcon, PlusCircleIcon, RocketLaunchIcon, TagIcon } from '@phosphor-icons/react';
import type { Tema } from '../../../../models/Tema';
import { useAuth } from '../../../../contexts/AuthContext';
import { buscar, atualizar, cadastrar } from '../../../../services/Sercives';

function FormTema() {
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
      alert('Você precisa estar logada para acessar esta área.');
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

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value
    });
  }

  async function salvarTema(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCarregando(true);

    const tokenHeader = {
      headers: { Authorization: usuario.token }
    };

    try {
      if (id !== undefined) {
        // Atualização
        await atualizar(`/temas`, tema, setTema, tokenHeader);
        alert('Tema atualizado com sucesso!');
      } else {
        // Criação: Limpamos o ID para evitar que o backend rejeite "id: 0"
        const { id: _, ...temaLimpo } = tema;
        
        try {
          // Tentativa 1: Plural (padrão)
          await cadastrar(`/temas`, temaLimpo, setTema, tokenHeader);
        } catch (err) {
          // Tentativa 2: Singular (fallback comum)
          await cadastrar(`/tema`, temaLimpo, setTema, tokenHeader);
        }
        
        alert('Novo tema registrado!');
      }
      navigate('/temas');
    } catch (error: any) {
      console.error("// erro_tema_cadastro", error.response?.data || error.message);
      alert('Ocorreu um erro ao salvar o tema.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-12 px-4 relative overflow-hidden text-slate-300">
      
      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-[100px] -z-10"></div>

      <div className="mx-auto max-w-2xl">
        <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-600 hover:text-white transition-colors mb-8 font-mono text-[10px] uppercase tracking-widest"
          >
            <CaretLeftIcon size={16} /> Voltar
          </button>

          <header className="text-center mb-12">
            <div className="h-16 w-16 bg-linear-to-br from-fuchsia-600 to-violet-700 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-[0_0_30px_rgba(192,38,211,0.3)]">
              <TagIcon size={32} weight="bold" />
            </div>
            <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              {id !== undefined ? 'Editar Tópico' : 'Novo Tópico de Discussão'}
            </h1>
            <p className="text-slate-500 font-mono text-[9px] uppercase tracking-[0.3em] mt-2">
               // schema.category_definition.v1
            </p>
          </header>

          <form onSubmit={salvarTema} className="space-y-8">
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-fuchsia-400 uppercase tracking-widest ml-1">Nome do Tema</label>
              <div className="relative">
                <PlusCircleIcon size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" />
                <input 
                  type="text"
                  name="descricao"
                  required
                  placeholder="Ex: Inteligência Artificial, Carreira, Dicas"
                  className="w-full bg-slate-950/60 border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-slate-200 focus:outline-none focus:border-fuchsia-500/50 transition-all font-mono text-sm"
                  value={tema.descricao}
                  onChange={atualizarEstado}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={carregando}
              className="w-full group relative flex items-center justify-center rounded-2xl bg-linear-to-r from-fuchsia-600 to-violet-700 px-8 py-5 text-white font-black uppercase tracking-tighter transition-all hover:shadow-[0_0_40px_rgba(192,38,211,0.4)] hover:scale-[1.01] active:scale-95 disabled:opacity-50"
            >
              {carregando ? "Sincronizando..." : id !== undefined ? "Salvar Alterações" : "Criar Categoria"}
              <RocketLaunchIcon size={24} weight="bold" className="ml-3 transition-transform group-hover:translate-x-1" />
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default FormTema;
