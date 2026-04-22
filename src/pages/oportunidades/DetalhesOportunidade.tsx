import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { buscar } from '../../services/Sercives';
import { 
  Briefcase, MapPin, CurrencyDollar, Calendar, 
  Buildings, CaretLeft, CheckCircle, Info, RocketLaunch
} from '@phosphor-icons/react';
import type { Oportunidade } from '../../models/Oportunidade';

function DetalhesOportunidade() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { estaLogado, usuario } = useAuth();
  
  const [oportunidade, setOportunidade] = useState<Oportunidade | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!estaLogado) {
      alert('Você precisa estar logada para ver os detalhes da vaga.');
      navigate('/login');
    }
  }, [estaLogado, navigate]);

  useEffect(() => {
    async function carregarVaga() {
      try {
        // Tentativa 1: Padrão /oportunidades/id/:id (Comum em algumas APIs)
        await buscar(`/oportunidades/id/${id}`, (dados: any) => {
          setOportunidade(Array.isArray(dados) ? dados[0] : dados);
        }, {
          headers: { Authorization: usuario.token }
        });
      } catch (error) {
        try {
          // Tentativa 2: Padrão /oportunidades/:id (Direto)
          await buscar(`/oportunidades/${id}`, (dados: any) => {
            setOportunidade(Array.isArray(dados) ? dados[0] : dados);
          }, {
            headers: { Authorization: usuario.token }
          });
        } catch (innerError: any) {
          console.error("// erro_vaga_detalhes: falha em ambos os padrões", innerError.message);
        }
      } finally {
        setLoading(false);
      }
    }
    if (id) carregarVaga();
  }, [id, usuario.token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!oportunidade) {
    return (
      <div className="min-h-screen bg-slate-950 pt-32 px-4 text-center">
        <h2 className="text-2xl text-white font-black uppercase">Vaga não encontrada</h2>
        <Link to="/oportunidades" className="mt-4 text-fuchsia-400 hover:underline inline-block">
          Voltar para listagem
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-fuchsia-600/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <div className="mx-auto max-w-5xl">
        {/* Botão Voltar */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 font-mono text-xs uppercase tracking-widest"
        >
          <CaretLeft size={16} />
          Voltar    
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Coluna Principal (Conteúdo) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header da Vaga */}
            <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 p-8 rounded-[32px]">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase italic mb-2">
                    {oportunidade.titulo}
                  </h1>
                  <div className="flex items-center gap-3 text-fuchsia-500 font-bold uppercase tracking-widest text-xs">
                    <Buildings size={18} />
                    {oportunidade.empresa}
                  </div>
                </div>
                <span className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-widest">
                  Vaga Ativa
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-white/5">
                <div className="space-y-1">
                  <p className="text-[9px] text-slate-500 font-black uppercase">Local</p>
                  <p className="text-xs text-white flex items-center gap-1.5"><MapPin size={14} className="text-violet-500" /> {oportunidade.localizacao}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] text-slate-500 font-black uppercase">Tipo</p>
                  <p className="text-xs text-white flex items-center gap-1.5"><Briefcase size={14} className="text-violet-500" /> {oportunidade.tipoContrato}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] text-slate-500 font-black uppercase">Nível</p>
                  <p className="text-xs text-white flex items-center gap-1.5"><Calendar size={14} className="text-violet-500" /> {oportunidade.nivelExperiencia}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] text-slate-500 font-black uppercase">Remuneração</p>
                  <p className="text-xs text-white flex items-center gap-1.5"><CurrencyDollar size={14} className="text-violet-500" /> {oportunidade.salario}</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-white font-bold uppercase tracking-widest text-[11px] mb-4 flex items-center gap-2">
                  <Info size={16} className="text-fuchsia-500" />
                  Descrição da Oportunidade
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                  {oportunidade.descricao}
                </p>
              </div>
            </div>

            {/* Benefícios */}
            <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 p-8 rounded-[32px]">
              <h3 className="text-white font-bold uppercase tracking-widest text-[11px] mb-6 flex items-center gap-2">
                <CheckCircle size={18} className="text-fuchsia-500" />
                Vantagens e Benefícios
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(oportunidade.beneficios || "").split(',').map((beneficio, index) => (
                  <div key={index} className="flex items-center gap-3 bg-slate-950/40 p-4 rounded-2xl border border-white/5">
                    <div className="h-2 w-2 rounded-full bg-fuchsia-500"></div>
                    <span className="text-xs text-slate-300">{beneficio.trim()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar de Ação */}
          <div className="space-y-6 relative z-20">
            <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-8 rounded-[32px] sticky top-24">
              <div className="text-center mb-8">
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em] mb-2">status_candidatura</p>
                <div className="text-2xl font-black text-white italic tracking-tighter uppercase mb-4">Interessada?</div>
              </div>
              
              <button 
                onClick={() => navigate(`/oportunidades/${id}/candidatar`)}
                className="w-full flex items-center justify-center gap-3 bg-white text-slate-950 px-6 py-5 rounded-2xl font-black uppercase tracking-tighter hover:bg-fuchsia-500 hover:text-white hover:shadow-[0_0_30px_rgba(217,70,239,0.4)] transition-all active:scale-95 mb-4"
              >
                <RocketLaunch size={24} weight="bold" />
                Candidatar-se
              </button>
              
              <p className="text-[9px] text-slate-600 text-center font-mono uppercase tracking-widest leading-relaxed">
                Ao clicar em candidatar-se, seus dados de perfil serão compartilhados com a empresa {oportunidade.empresa}.
              </p>
            </div>

            <div className="bg-violet-600/10 border border-violet-500/20 p-6 rounded-3xl">
              <h4 className="text-violet-400 font-bold uppercase tracking-widest text-[10px] mb-2 flex items-center gap-2">
                ⚠️ Dica ConnectElas
              </h4>
              <p className="text-[10px] text-slate-400 leading-relaxed uppercase tracking-tighter">
                Certifique-se de que seu LinkedIn e Portfólio no perfil estão atualizados para aumentar suas chances!
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DetalhesOportunidade;
