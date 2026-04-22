import React, { type ChangeEvent, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/Sercives';
import { 
  PaperPlaneTilt, LinkSimple, IdentificationCard, 
  LinkedinLogo, Money, Clock, Code 
} from '@phosphor-icons/react';
import type { Candidata } from '../../models/Candidata';

function FormCandidatura() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { estaLogado, usuario } = useAuth();
  
  const [candidatura, setCandidatura] = useState<Partial<Candidata>>({
    nome: '',
    email: usuario.usuario,
    telefone: '',
    dataNascimento: '',
    localizacao: '',
    area_profissional: '',
    linkedin: '',
    portfolio: '',
    nivel_experiencia: '',
    pretensao_salarial: '',
    disponibilidade: 'Imediata',
    data_cadastro: new Date().toISOString()
  });

  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (!estaLogado) {
      navigate('/login');
    }
  }, [estaLogado, navigate]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setCandidatura({
      ...candidatura,
      [e.target.name]: e.target.value
    });
  }

  async function submeterCandidatura(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    
    try {
      // Endpoint fictício 
      await api.post(`/oportunidades/${id}/candidatar`, candidatura, {
        headers: { Authorization: usuario.token }
      });
      alert('Candidatura enviada com sucesso! Boa sorte, dev!');
      navigate('/oportunidades');
    } catch (error) {
      console.error("Erro ao enviar candidatura", error);
      alert('Ocorreu um erro ao enviar sua candidatura. Tente novamente mais tarde.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 relative overflow-hidden font-sans text-slate-300">
      
      {/* Background Decorativo */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] -z-10"></div>

      <div className="mx-auto max-w-3xl">
        <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent opacity-50"></div>

          <div className="text-center mb-10">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-600 to-violet-700 text-white font-mono font-black mb-4 shadow-[0_0_30px_rgba(192,38,211,0.3)]">
              <PaperPlaneTilt size={32} weight="bold" />
            </div>
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">Confirmar Candidatura</h2>
            <p className="text-xs text-slate-500 font-mono mt-2 tracking-widest uppercase opacity-70">
              // connect_elas_v1.0.application_form
            </p>
          </div>

          <form onSubmit={submeterCandidatura} className="space-y-8">
            
            {/* Seção: Identificação */}
            <div className="space-y-6">
              <h3 className="text-white font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
                <IdentificationCard size={18} className="text-fuchsia-500" />
                DADOS_DE_IDENTIFICACAO
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nome Completo</label>
                  <input
                    type="text"
                    name="nome"
                    required
                    className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-fuchsia-500/50 transition-all font-mono text-sm"
                    value={candidatura.nome}
                    onChange={atualizarEstado}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Telefone</label>
                  <input
                    type="tel"
                    name="telefone"
                    placeholder="(00) 00000-0000"
                    required
                    className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-fuchsia-500/50 transition-all font-mono text-sm"
                    value={candidatura.telefone}
                    onChange={atualizarEstado}
                  />
                </div>
              </div>
            </div>

            {/* Seção: Links e Portfolio */}
            <div className="space-y-6">
              <h3 className="text-white font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
                <LinkSimple size={18} className="text-fuchsia-500" />
                NODES_DIGITAIS
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">LinkedIn URL</label>
                  <div className="relative">
                    <LinkedinLogo size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                    <input
                      type="url"
                      name="linkedin"
                      placeholder="https://linkedin.com/in/perfil"
                      required
                      className="w-full bg-slate-950/60 border border-white/5 rounded-xl pl-12 pr-4 py-3 text-slate-200 focus:outline-none focus:border-fuchsia-500/50 transition-all font-mono text-sm"
                      value={candidatura.linkedin}
                      onChange={atualizarEstado}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Portfolio / Github</label>
                  <div className="relative">
                    <Code size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                    <input
                      type="url"
                      name="portfolio"
                      placeholder="https://github.com/perfil"
                      required
                      className="w-full bg-slate-950/60 border border-white/5 rounded-xl pl-12 pr-4 py-3 text-slate-200 focus:outline-none focus:border-fuchsia-500/50 transition-all font-mono text-sm"
                      value={candidatura.portfolio}
                      onChange={atualizarEstado}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Seção: Expectativas */}
            <div className="space-y-6">
              <h3 className="text-white font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
                <Money size={18} className="text-fuchsia-500" />
                EXPECTATIVAS_PROFISSIONAIS
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Pretensão Salarial</label>
                  <input
                    type="text"
                    name="pretensao_salarial"
                    placeholder="Ex: R$ 5.000,00"
                    required
                    className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-fuchsia-500/50 transition-all font-mono text-sm"
                    value={candidatura.pretensao_salarial}
                    onChange={atualizarEstado}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Disponibilidade</label>
                  <div className="relative">
                    <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                    <select
                      name="disponibilidade"
                      className="w-full bg-slate-950/60 border border-white/5 rounded-xl pl-12 pr-4 py-3 text-slate-200 focus:outline-none focus:border-fuchsia-500/50 transition-all font-mono text-sm appearance-none"
                      value={candidatura.disponibilidade}
                      onChange={atualizarEstado}
                    >
                      <option value="Imediata">Imediata</option>
                      <option value="15 dias">15 dias</option>
                      <option value="30 dias">30 dias</option>
                      <option value="Freelancer">Apenas Projetos</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="flex flex-col md:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 rounded-2xl border border-white/10 px-8 py-5 text-slate-500 font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all"
              >
                Abortar Missão
              </button>
              <button
                type="submit"
                disabled={enviando}
                className="flex-[2] group relative flex items-center justify-center rounded-2xl bg-gradient-to-r from-fuchsia-600 to-violet-700 px-8 py-5 text-white font-black uppercase tracking-tighter transition-all hover:shadow-[0_0_40px_rgba(192,38,211,0.4)] hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                {enviando ? "Processando Transmissão..." : "Executar Candidatura"}
                <PaperPlaneTilt size={24} weight="bold" className="ml-3 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </form>

          {/* Logs Terminal */}
          <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center text-[8px] font-mono text-slate-700 uppercase tracking-[0.3em]">
             <span>SYSTEM_READY: TRUE</span>
             <span>AES_256_ACTIVE</span>
             <span>ID_VAGA: #{id}</span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FormCandidatura;
