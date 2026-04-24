import React, {  useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';



import { CaretLeftIcon, ChatCircleDotsIcon, PaperPlaneTiltIcon, TagIcon, TextAaIcon } from '@phosphor-icons/react';

import { useAuth } from '../../../../contexts/AuthContext';
import { buscar, atualizar, cadastrar } from '../../../../services/Sercives';
import type { Tema } from '../../../../models/Tema';
import type { Postagem } from '../../../../models/Postagem';

function FormPostagem() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { estaLogado, usuario } = useAuth();

  const [temas, setTemas] = useState<Tema[]>([]);
  const [tema, setTema] = useState<Tema>({ id: 0, descricao: '' });

  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    titulo: '',
    texto: '',
    data: new Date().toISOString(),
    tema: null,
    usuario: null
  });

  useEffect(() => {
    if (!estaLogado) {
      navigate('/login');
    }
  }, [estaLogado, navigate]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const tokenHeader = { headers: { Authorization: usuario.token } };
        await buscar('/temas', setTemas, tokenHeader);
        if (id !== undefined) {
          await buscar(`/postagens/${id}`, setPostagem, tokenHeader);
        }
      } catch (error) {
        console.error("Erro ao carregar dados", error);
      }
    }
    carregarDados();
  }, [id, usuario.token]);

  useEffect(() => {
    postagem.tema = tema;
  }, [tema]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value
    });
  }

  function buscarTemaPorId(id: string) {
    const temaEncontrado = temas.find(t => t.id === Number(id));
    if (temaEncontrado) {
      setTema(temaEncontrado);
    }
  }

  async function salvarPostagem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const tokenHeader = { headers: { Authorization: usuario.token } };

    try {
      if (id !== undefined) {
        await atualizar(`/postagens`, postagem, setPostagem, tokenHeader);
        alert('Publicação atualizada!');
      } else {
        await cadastrar(`/postagens`, postagem, setPostagem, tokenHeader);
        alert('Publicação enviada para o feed!');
      }
      navigate('/comunidade');
    } catch (error) {
      console.error("Erro ao salvar postagem", error);
      alert('Erro ao processar sua publicação.');
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-12 px-4 relative overflow-hidden text-slate-300">
      
      {/* Background Decorativo */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] -z-10"></div>

      <div className="mx-auto max-w-3xl">
        <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
          
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-600 hover:text-white transition-colors mb-8 font-mono text-[10px] uppercase tracking-widest"
          >
            <CaretLeftIcon size={16} /> Abortar_Envio
          </button>

          <header className="mb-12">
            <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-2">
               {id !== undefined ? 'Editar Discussão' : 'Iniciar Novo Diálogo'}
            </h1>
            <p className="text-slate-500 font-mono text-[9px] uppercase tracking-[0.3em]">
               // open_channel.social_v2
            </p>
          </header>

          <form onSubmit={salvarPostagem} className="space-y-8">
            
            {/* Título */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-violet-400 uppercase tracking-widest ml-1">Assunto Vital</label>
              <div className="relative">
                <TextAaIcon size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" />
                <input 
                  type="text"
                  name="titulo"
                  required
                  placeholder="O que está na sua mente dev?"
                  className="w-full bg-slate-950/60 border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-slate-200 focus:outline-none focus:border-violet-500/50 transition-all font-mono text-sm"
                  value={postagem.titulo}
                  onChange={atualizarEstado}
                />
              </div>
            </div>

            {/* Tema Selector */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-violet-400 uppercase tracking-widest ml-1">Categorização (Tema)</label>
              <div className="relative">
                <TagIcon size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" />
                <select 
                  className="w-full bg-slate-950/60 border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-slate-200 focus:outline-none focus:border-violet-500/50 transition-all font-mono text-sm appearance-none"
                  onChange={(e) => buscarTemaPorId(e.target.value)}
                  value={tema.id || ""}
                  required
                >
                  <option value="" disabled>Selecione um tópico...</option>
                  {temas.map(t => (
                    <option key={t.id} value={t.id}>{t.descricao}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-violet-400 uppercase tracking-widest ml-1">Corpo da Mensagem</label>
              <textarea 
                name="texto"
                rows={8}
                required
                placeholder="Desenvolva sua ideia aqui... (Markdown suportado mentalmente)"
                className="w-full bg-slate-950/60 border border-white/5 rounded-4xl px-8 py-6 text-slate-200 focus:outline-none focus:border-violet-500/50 transition-all font-mono text-sm resize-none leading-relaxed"
                value={postagem.texto}
                onChange={atualizarEstado}
              />
            </div>

            <button 
              type="submit"
              className="w-full group relative flex items-center justify-center rounded-2xl bg-linear-to-r from-violet-600 to-fuchsia-700 px-8 py-5 text-white font-black uppercase tracking-tighter transition-all hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:scale-[1.01] active:scale-95"
            >
              Transmitir Agora
              <PaperPlaneTiltIcon size={24} weight="bold" className="ml-3 transition-transform group-hover:translate-x-1" />
            </button>

          </form>

          {/* Footer Info */}
          <footer className="mt-12 pt-6 border-t border-white/5 flex items-center gap-4 text-[8px] font-mono text-slate-700 uppercase tracking-widest">
            <ChatCircleDotsIcon size={16} />
            Lembre-se: Respeito e sororidade são os pilares da nossa comunidade.
          </footer>

        </div>
      </div>
    </div>
  );
}

export default FormPostagem;
