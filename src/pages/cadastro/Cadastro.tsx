import React, {  useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { cadastrarUsuario } from '../../services/Sercives';
import { Code, UserPlus } from '@phosphor-icons/react';
import type { Usuario } from '../../models/Usuario';

function Cadastro() {
  const navigate = useNavigate();

  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

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
    oportunidade: ''
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
      [e.target.name]: e.target.value
    });
  }

  async function cadastrarAoSubmeter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      try {
        // Removemos campos que podem causar erro no back-end se enviados vazios ou em formato incorreto
        const { dataCriacao, oportunidade, ...dadosCadastro } = usuario;
        
        await cadastrarUsuario(`/usuarios/cadastrar`, dadosCadastro, setUsuarioResult);
        alert('Usuária cadastrada com sucesso!');
      } catch (error: any) {
        console.error("// erro_cadastro_detalhado:", error.response?.data || error.message);
        alert('Erro ao cadastrar a Usuária. Verifique se o e-mail já existe.');
      }
    } else {
      alert('Dados inconsistentes. Verifique as informações de cadastro e se a senha tem no mínimo 8 caracteres.');
      setConfirmarSenha("");
      setUsuario({
        ...usuario,
        senha: ""
      });
    }
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 bg-slate-950 relative overflow-hidden font-sans">
      
      {/* Background Decorativo */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] -z-10"></div>

      <div className="w-full max-w-2xl">
        <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50"></div>

          <div className="text-center mb-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-700 text-white font-mono font-black mb-4 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <UserPlus size={32} weight="bold" />
            </div>
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">Criar Conta Dev</h2>
            
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
                  onChange={(e) => atualizarEstado(e)}
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-fuchsia-400 uppercase tracking-[0.2em] ml-1">
                  Email
                </label>
                <input
                  type="email"
                  id="usuario"
                  name="usuario"
                  placeholder="dev@connectelas.com"
                  className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 transition-all font-mono text-sm"
                  value={usuario.usuario}
                  onChange={(e) => atualizarEstado(e)}
                  required
                />
              </div>

              {/* Foto URL */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-fuchsia-400 uppercase tracking-[0.2em] ml-1">
                  Foto Perfil
                </label>
                <input
                  type="text"
                  id="foto"
                  name="foto"
                  placeholder="Link da sua melhor foto"
                  className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 transition-all font-mono text-sm"
                  value={usuario.foto}
                  onChange={(e) => atualizarEstado(e)}
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
                  onChange={(e) => atualizarEstado(e)}
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
                  onChange={(e) => atualizarEstado(e)}
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
                  onChange={(e) => handleConfirmarSenha(e)}
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
                className="flex-[2] group relative flex items-center justify-center rounded-xl bg-white px-8 py-4 text-slate-950 font-black uppercase tracking-tighter transition-all hover:bg-violet-600 hover:text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] active:scale-95"
              >
                Compilar Cadastro
                <span className="ml-3 font-mono text-lg transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </form>

          {/* Logs Terminal */}
          <div className="mt-8 pt-6 border-t border-white/5">
             <div className="flex justify-between items-center text-[9px] font-mono text-slate-700 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Code size={12} className="text-violet-500" />
                DADOS_VALIDADOS: TRUE
              </div>
              <span>SSL_ENCRYPTION: ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
