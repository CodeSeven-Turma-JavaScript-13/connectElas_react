import React, { useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { buscar, atualizar , cadastrar, atualizarParcial } from '../../../services/Sercives';
import { 
   
  BriefcaseIcon,
  BuildingsIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  PlusCircleIcon,
  RocketLaunchIcon
} from '@phosphor-icons/react';
import type { Oportunidade } from '../../../models/Oportunidade';
import { ToastAlerta } from '../../../util/ToastAlerta';

function FormOportunidade() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { estaLogado, usuario } = useAuth();

  const [oportunidade, setOportunidade] = useState<Oportunidade>({
    id: 0,
    titulo: '',
    empresa: '',
    area: '',
    descricao: '',
    tipoContrato: '',
    modalidade: '',
    salario: '',
    localizacao: '',
    nivelExperiencia: '',
    beneficios: '',
    ativa: true,
    status: 'DISPONIVEL',
    dataCriacao: new Date().toISOString(),
    dataAtualizacao: new Date().toISOString(),
    candidata: [],
    usuario: null as any
  });

  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (!estaLogado) {
      ToastAlerta('Você precisa estar logada para gerenciar vagas.', 'info');
      navigate('/login');
    }
  }, [estaLogado, navigate]);

  useEffect(() => {
    if (id !== undefined) {
      buscarVaga(id);
    }
  }, [id]);

  async function buscarVaga(id: string) {
    try {
      await buscar(`/oportunidades/${id}`, setOportunidade, {
        headers: { Authorization: usuario.token }
      });
    } catch (error) {
      ToastAlerta("Erro ao buscar vaga!", "erro")
      console.error("Erro ao buscar vaga", error);
    }
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setOportunidade({
      ...oportunidade,
      [e.target.name]: e.target.value
    });
  }

  async function gerarNovaVaga(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setCarregando(true);

  const tokenHeader = { headers: { Authorization: usuario.token } };

  try {
    if (id !== undefined) {
  const camposAlterados = Object.fromEntries(
    Object.entries(oportunidade).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
  );
  await atualizarParcial(`/oportunidades/${id}`, camposAlterados, setOportunidade, tokenHeader);
  ToastAlerta('Vaga atualizada com sucesso!', 'sucesso');
  } else {
      await cadastrar(`/oportunidades`, oportunidade, setOportunidade, tokenHeader);
      ToastAlerta('Vaga anunciada com sucesso!', 'sucesso');
    }
    navigate('/oportunidades');
  } catch (error) {
    console.error("Erro ao processar vaga", error);
    ToastAlerta('Ocorreu um erro ao salvar a vaga.', 'erro');
  } finally {
    setCarregando(false);
  }
}

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 relative overflow-hidden">
      
      {/* Background Decorativo */}
      <div className="absolute top-1/4 right-0 w-125 h-125 bg-fuchsia-600/5 rounded-full blur-[150px] -z-10"></div>
      
      <div className="mx-auto max-w-4xl">
        <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl relative">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-linear-to-r from-transparent via-fuchsia-500 to-transparent"></div>

          <div className="text-center mb-12">
            <div className="h-16 w-16 bg-linear-to-br from-fuchsia-600 to-violet-700 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-[0_0_30px_rgba(192,38,211,0.3)]">
              <PlusCircleIcon size={36} weight="bold" />
            </div>
            <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
              {id !== undefined ? 'Editar Oportunidade' : 'Anunciar Nova Vida Tech'}
            </h1>
            <p className="text-slate-500 font-mono text-[10px] mt-2 uppercase tracking-[0.3em]">
               // open_job_protocol.v2
            </p>
          </div>

          <form onSubmit={gerarNovaVaga} className="space-y-8">
            {/* Seção 1: Essenciais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-fuchsia-400 uppercase tracking-widest ml-1">Título da Vaga</label>
                <div className="relative">
                  <BriefcaseIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    type="text"
                    name="titulo"
                    placeholder="Ex: Senior React Engineer"
                    className="w-full bg-slate-950/60 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-slate-200 focus:outline-none focus:border-fuchsia-500/50 transition-all font-mono text-sm"
                    value={oportunidade.titulo}
                    onChange={atualizarEstado}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-fuchsia-400 uppercase tracking-widest ml-1">Empresa</label>
                <div className="relative">
                  <BuildingsIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    type="text"
                    name="empresa"
                    placeholder="Nome da sua Empresa"
                    className="w-full bg-slate-950/60 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-slate-200 focus:outline-none focus:border-fuchsia-500/50 transition-all font-mono text-sm"
                    value={oportunidade.empresa}
                    onChange={atualizarEstado}
                  />
                </div>
              </div>
            </div>

            {/* Seção 2: Detalhes Técnicos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Área</label>
                <input
                  type="text"
                  name="area"
                  
                  placeholder="Ex: Front-end"
                  className="w-full bg-slate-950/60 border border-white/5 rounded-2xl px-4 py-4 text-slate-200 focus:outline-none focus:border-fuchsia-500/50 transition-all font-mono text-sm"
                  value={oportunidade.area}
                  onChange={atualizarEstado}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Modalidade</label>
                <select
                  name="modalidade"
                  className="w-full bg-slate-950/60 border border-white/5 rounded-2xl px-4 py-4 text-slate-200 focus:outline-none focus:border-fuchsia-500/50 transition-all font-mono text-sm appearance-none"
                  value={oportunidade.modalidade}
                  onChange={atualizarEstado}
                >
                  <option value="">Selecione...</option>
                  <option value="Remoto">Remoto</option>
                  <option value="Híbrido">Híbrido</option>
                  <option value="Presencial">Presencial</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nível</label>
                <input
                  type="text"
                  name="nivelExperiencia"
                  placeholder="Ex: Pleno / Sênior"
                  className="w-full bg-slate-950/60 border border-white/5 rounded-2xl px-4 py-4 text-slate-200 focus:outline-none focus:border-fuchsia-500/50 transition-all font-mono text-sm"
                  value={oportunidade.nivelExperiencia}
                  onChange={atualizarEstado}
                />
              </div>

              
            </div>
            {/* Status da Vaga - só aparece na edição */}
              {id !== undefined && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-fuchsia-400 uppercase tracking-widest ml-1">Status da Vaga</label>
                  <select
                    name="status"
                    className="w-full bg-slate-950/60 border border-white/5 rounded-2xl px-4 py-4 text-slate-200 focus:outline-none focus:border-fuchsia-500/50 transition-all font-mono text-sm appearance-none"
                    value={oportunidade.status}
                    onChange={atualizarEstado}
                  >
                    <option value="DISPONIVEL">🟢 Disponível</option>
                    <option value="EM_ANDAMENTO">🔵 Em Andamento</option>
                    <option value="INDISPONIVEL">⚪ Indisponível</option>
                  </select>
                </div>
              )}

            {/* Seção 3: Local e Salário */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Localização</label>
                <div className="relative">
                  <MapPinIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    type="text"
                    name="localizacao"
                    placeholder="Ex: São Paulo, SP ou Remoto"
                    className="w-full bg-slate-950/60 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-slate-200 focus:outline-none focus:border-fuchsia-500/50 transition-all font-mono text-sm"
                    value={oportunidade.localizacao}
                    onChange={atualizarEstado}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Salário / Range</label>
                <div className="relative">
                  <CurrencyDollarIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    type="text"
                    name="salario"
                    placeholder="Ex: R$ 10k - 15k"
                    className="w-full bg-slate-950/60 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-slate-200 focus:outline-none focus:border-fuchsia-500/50 transition-all font-mono text-sm"
                    value={oportunidade.salario}
                    onChange={atualizarEstado}
                  />
                </div>
              </div>
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Descrição Detalhada</label>
              <textarea
                name="descricao"
                rows={6}
                placeholder="Detalhe os requisitos técnicos, cultura da empresa e o que você busca nesse talento..."
                className="w-full bg-slate-950/60 border border-white/5 rounded-3xl px-6 py-4 text-slate-200 focus:outline-none focus:border-fuchsia-500/50 transition-all font-mono text-sm resize-none"
                value={oportunidade.descricao}
                onChange={atualizarEstado}
              />
            </div>

            {/* Botões */}
            <div className="flex flex-col md:flex-row gap-4 pt-8">
              <button
                type="button"
                onClick={() => navigate('/oportunidades')}
                className="flex-1 rounded-2xl border border-white/10 px-8 py-5 text-slate-500 font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all text-center"
              >
                Cancelar Operação
              </button>
              <button
                type="submit"
                disabled={carregando}
                className="flex-2 group relative flex items-center justify-center rounded-2xl bg-linear-to-r from-fuchsia-600 to-violet-700 px-8 py-5 text-white font-black uppercase tracking-tighter transition-all hover:shadow-[0_0_40px_rgba(192,38,211,0.4)] hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                {carregando ? "Compilando Dados..." : id !== undefined ? "Salvar Alterações" : "Publicar Oportunidade"}
                <RocketLaunchIcon size={24} weight="bold" className="ml-3 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </form>

          {/* Terminal Logs */}
          <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center text-[8px] font-mono text-slate-700 uppercase tracking-[0.3em]">
             <span className="flex items-center gap-2 italic"><CheckCircleIcon size={10} /> SYSTEM_READY</span>
             <span>ID_VAGA: {id || 'NEW_ENTRY'}</span>
             <span>AES_256_ACTIVE</span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FormOportunidade;
