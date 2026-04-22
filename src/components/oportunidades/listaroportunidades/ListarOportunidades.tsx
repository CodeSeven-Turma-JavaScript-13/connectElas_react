import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FunnelIcon, MagnifyingGlassIcon, PlusCircleIcon } from '@phosphor-icons/react';
import type { Oportunidade } from '../../../models/Oportunidade';
import { useAuth } from '../../../contexts/AuthContext';
import { buscar } from '../../../services/Sercives';
import CardOportunidade from '../cardoportunidade/CardOportunidade';


function ListarOportunidades() {
  const navigate = useNavigate();
  const { estaLogado, usuario } = useAuth();
  const token = usuario.token;

  const [oportunidades, setOportunidades] = useState<Oportunidade[]>([]);
  const [filtro, setFiltro] = useState("");

  // Redireciona se não estiver logada
  useEffect(() => {
    if (!estaLogado) {
      alert('Você precisa estar logada para acessar as oportunidades.');
      navigate('/login');
    }
  }, [estaLogado, navigate]);

  async function buscarOportunidades() {
    try {
      await buscar('/oportunidades', setOportunidades, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar oportunidades", error);
    }
  }

  useEffect(() => {
    if (token !== "") {
      buscarOportunidades();
    }
  }, [token]);

  const oportunidadesFiltradas = oportunidades.filter(op => 
    op.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
    op.empresa.toLowerCase().includes(filtro.toLowerCase()) ||
    op.area.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-200 h-150 bg-fuchsia-600/5 rounded-full blur-[150px] -z-10"></div>

      <div className="mx-auto max-w-7xl">
        {/* Header da Página */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
              Vagas <span className="bg-linear-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-transparent">Tech Selecionadas</span>
            </h1>
            <p className="text-slate-500 font-mono text-xs mt-2 uppercase tracking-[0.3em]">
              // explorando_oportunidades.root
            </p>
          </div>

          <button 
            onClick={() => navigate('/anunciar-vaga')}
            className="flex items-center justify-center gap-2 bg-white text-slate-950 px-6 py-4 rounded-2xl font-black uppercase tracking-tighter hover:bg-fuchsia-500 hover:text-white hover:shadow-[0_0_30px_rgba(217,70,239,0.3)] transition-all active:scale-95"
          >
            <PlusCircleIcon size={20} weight="bold" />
            Anunciar Vaga
          </button>
        </div>

        {/* Barra de Pesquisa e Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
            <input 
              type="text" 
              placeholder="Pesquisar por cargo, empresa ou tecnologia..."
              className="w-full bg-slate-900/60 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/20 transition-all font-mono text-sm"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center gap-2 bg-slate-900/60 border border-white/5 px-6 py-4 rounded-2xl text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:text-white transition-colors">
            <FunnelIcon size={18} />
            Filtros Avançados
          </button>
        </div>

        {/* Grid de Vagas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {oportunidadesFiltradas.length > 0 ? (
            oportunidadesFiltradas.map((oportunidade) => (
              <CardOportunidade key={oportunidade.id} oportunidade={oportunidade} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="h-20 w-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
                <MagnifyingGlassIcon size={32} className="text-slate-700" />
              </div>
              <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">
                Nenhuma oportunidade encontrada com seu filtro atual.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListarOportunidades;
