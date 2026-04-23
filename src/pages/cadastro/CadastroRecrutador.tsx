import React, { useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { cadastrarUsuario } from '../../services/Sercives';
import { BriefcaseIcon, CodeIcon } from '@phosphor-icons/react';
import type { Usuario } from '../../models/Usuario';
import { ToastAlerta } from '../../util/ToastAlerta';

function CadastroRecrutador() {
  const navigate = useNavigate();

  const [confirmarSenha, setConfirmarSenha] = useState<string>('');

  const [usuario, setUsuario] = useState<Usuario>({
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    dataNascimento: '',
  });

  const [usuarioResult, setUsuarioResult] = useState<Usuario>({
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    dataNascimento: '',
    dataCriacao: '',
    oportunidade: '',
  });

  useEffect(() => {
    if (usuarioResult.usuario !== '') {
      retornar();
    }
  }, [usuarioResult]);

  function retornar() {
    navigate('/login');
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  async function cadastrarAoSubmeter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      try {
        const { dataCriacao, oportunidade, ...dadosCadastro } = usuario;

        await cadastrarUsuario(`/usuarios/cadastrar`, dadosCadastro, setUsuarioResult);
        ToastAlerta('Recrutador cadastrado com sucesso!', 'sucesso');
      } catch (error: any) {
        console.error('// erro_cadastro_recrutador:', error.response?.data || error.message);
        ToastAlerta('Erro ao cadastrar o Recrutador. Verifique se o e-mail já existe.', 'erro');
      }
    } else {
      ToastAlerta('Dados inconsistentes. Verifique as informações e se a senha tem no mínimo 8 caracteres.', 'erro');
      setConfirmarSenha('');
      setUsuario({ ...usuario, senha: '' });
    }
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 bg-slate-950 relative overflow-hidden font-sans">

      {/* Background Decorativo — tons de âmbar/laranja para diferenciar visualmente do cadastro de candidata */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-500/5 rounded-full blur-[80px] -z-10"></div>

      <div className="w-full max-w-2xl">
        <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">

          {/* Linha decorativa topo */}
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-fuchsia-500 to-transparent opacity-50"></div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-violet-600 to-fuchsia-700 text-white font-mono font-black mb-4 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <BriefcaseIcon size={32} weight="bold" />
            </div>
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">
              Cadastrar Recrutador
            </h2>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mt-1">
              // CONNECT_ELAS_V2.0.RECRUITER
            </p>
          </div>

          <form onSubmit={cadastrarAoSubmeter} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Nome */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-fuchsia-400 uppercase tracking-[0.2em] ml-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Nome Completo"
                  className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 transition-all font-mono text-sm"
                  value={usuario.nome}
                  onChange={atualizarEstado}
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-fuchsia-400 uppercase tracking-[0.2em] ml-1">
                  E-mail Corporativo
                </label>
                <input
                  type="email"
                  id="usuario"
                  name="usuario"
                  placeholder="recruiter@empresa.com"
                  className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 transition-all font-mono text-sm"
                  value={usuario.usuario}
                  onChange={atualizarEstado}
                  required
                />
              </div>

              {/* Foto URL */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-fuchsia-400 uppercase tracking-[0.2em] ml-1">
                  Foto de Perfil
                </label>
                <input
                  type="text"
                  id="foto"
                  name="foto"
                  placeholder="Link da foto"
                  className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 transition-all font-mono text-sm"
                  value={usuario.foto}
                  onChange={atualizarEstado}
                />
              </div>

              {/* Data Nascimento */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-fuchsia-400 uppercase tracking-[0.2em] ml-1">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  id="dataNascimento"
                  name="dataNascimento"
                  className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 transition-all font-mono text-sm"
                  value={usuario.dataNascimento}
                  onChange={atualizarEstado}
                  required
                />
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-fuchsia-400 uppercase tracking-[0.2em] ml-1">
                  Senha
                </label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder="Mínimo 8 caracteres"
                  className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 transition-all font-mono text-sm"
                  value={usuario.senha}
                  onChange={atualizarEstado}
                  required
                />
              </div>

              {/* Confirmar Senha */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-fuchsia-400 uppercase tracking-[0.2em] ml-1">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  id="confirmarSenha"
                  name="confirmarSenha"
                  placeholder="Repita a senha"
                  className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 transition-all font-mono text-sm"
                  value={confirmarSenha}
                  onChange={handleConfirmarSenha}
                  required
                />
              </div>
            </div>

            {/* Ações */}
            <div className="flex flex-col md:flex-row gap-4 mt-8">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="flex-1 rounded-xl border border-white/10 px-8 py-4 text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-2 group relative flex items-center justify-center rounded-xl bg-white px-8 py-4 text-slate-950 font-black uppercase tracking-tighter transition-all hover:bg-violet-600 hover:text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] active:scale-95"
              >
                Compilar Cadastro
                <span className="ml-3 font-mono text-lg transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </form>

          {/* Rodapé terminal */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="flex justify-between items-center text-[9px] font-mono text-slate-700 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <CodeIcon size={12} className="text-violet-500" />
                TIPO_CONTA: RECRUTADOR
              </div>
              <span>SSL_ENCRYPTION: ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Link para cadastro de candidata */}
        <p className="text-center text-[13px] font-mono text-slate-600 uppercase tracking-widest mt-6">
          É candidata?{' '}
          <button
            onClick={() => navigate('/cadastro')}
            className="text-fuchsia-500 hover:text-fuchsia-400 transition-colors font-black"
          >
            Registrar_Dev
          </button>
        </p>
      </div>
    </div>
  );
}

export default CadastroRecrutador;
