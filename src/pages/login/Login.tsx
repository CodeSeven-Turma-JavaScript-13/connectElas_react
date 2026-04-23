import React, {  useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/Sercives';
import { useAuth } from '../../contexts/AuthContext';
import type { UsuarioLogin } from '../../models/UsuarioLogin';
import { ToastAlerta } from '../../util/ToastAlerta';

function Login() {
  const navigate = useNavigate();
  const { handleLogin, estaLogado } = useAuth();

  // Estado para armazenar os dados do formulário de login
  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
    id: 0,
    usuario: '',
    senha: '',
    token: '',
    nome: '',
    foto: '',
    tipo: ''
  });

  // Efeito para redirecionar caso a usuária já esteja autenticada
  useEffect(() => {
    if (estaLogado) {
      navigate('/home');
    }
  }, [estaLogado, navigate]);

  // Função para atualizar o estado conforme a usuária digita
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    });
  }

  // Função para processar o login
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      // Chamada para a função de login no Service.ts
      await login(`/usuarios/logar`, usuarioLogin, handleLogin);
      ToastAlerta('Sucesso na autenticação!!','sucesso')
      console.log("%c// status_autenticacao: acesso_concedido", "color: #d946ef; font-weight: bold;");
    } catch (error) {
      console.error("// status_autenticacao: erro_critico", error);
      ToastAlerta('Erro nos dados de acesso. Verifique seu email e senha.', 'erro');
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 bg-slate-950 relative overflow-hidden font-sans">
      
      {/* Esferas de Brilho Neon (Estética Tech-Feminina) */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-fuchsia-600/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-violet-600/10 rounded-full blur-[100px] -z-10"></div>

      <div className="w-full max-w-md">
        <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          
          {/* Detalhe de linha de código no topo do card */}
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-fuchsia-500 to-transparent opacity-50"></div>

          <div className="text-center mb-10">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-fuchsia-600 to-violet-700 text-white font-mono font-black mb-4 shadow-[0_0_30px_rgba(192,38,211,0.3)]">
              &lt;/&gt;
            </div>
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">Acessar Sistema</h2>
            <p className="text-xs text-slate-500 font-mono mt-2 tracking-widest uppercase opacity-70">
              // connect_elas_v1.0.auth
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            {/* Input de Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-fuchsia-400 uppercase tracking-[0.2em] ml-1">
                autenticacao_email
              </label>
              <input
                type="email"
                id="email"
                name="usuario"
                placeholder="dev@connectelas.com"
                className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-4 text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 transition-all font-mono text-sm"
                value={usuarioLogin.usuario}
                onChange={(e) => atualizarEstado(e)}
                required
              />
            </div>

            {/* Input de Senha */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-fuchsia-400 uppercase tracking-[0.2em]">
                  senha_secreta
                </label>
                <span className="text-[9px] text-slate-600 font-mono cursor-pointer hover:text-violet-400 transition-colors uppercase">
                  ESQUECEU_A_SENHA?
                </span>
              </div>
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="••••••••••••"
                className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-4 text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 transition-all font-mono text-sm"
                value={usuarioLogin.senha}
                onChange={(e) => atualizarEstado(e)}
                required
              />
            </div>

            {/* Botão de Autenticação */}
            <button
              type="submit"
              className="w-full group relative flex items-center justify-center rounded-xl bg-white px-8 py-4 text-slate-950 font-black uppercase tracking-tighter transition-all hover:bg-fuchsia-500 hover:text-white hover:shadow-[0_0_25px_rgba(217,70,239,0.4)] active:scale-95"
            >
              Executar Login
              <span className="ml-3 font-mono text-lg transition-transform group-hover:translate-x-1">→</span>
            </button>
          </form>

          {/* Link para Cadastro */}
          <div className="mt-10 pt-6 border-t border-white/5 text-center">
            <p className="text-[11px] text-slate-500 uppercase tracking-widest">
              Ainda sem credenciais?{' '}
               </p>
              <button 
                onClick={() => navigate('/cadastro')}
                className="text-fuchsia-500 font-black text-[11px] hover:text-fuchsia-400 transition-colors ml-1"
              >
                REGISTRAR_DEV
              </button>
              <span className="text-slate-700 font-mono text-xs"> |</span>

              <button 
                onClick={() => navigate('/cadastro-recrutador')}
                className="text-fuchsia-500 font-black text-[11px] hover:text-fuchsia-400 transition-colors ml-1"
              >
                REGISTRAR_RECRUTADOR
              </button>
           
          </div>
        </div>

        {/* Logs de Rodapé (Estética Terminal) */}
        <div className="mt-6 flex justify-between items-center px-4 text-[9px] font-mono text-slate-700 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
            STATUS_SERVIDOR: ONLINE
          </div>
          <span>CRIPTOGRAFIA: AES-256</span>
        </div>
      </div>
    </div>
  );
}

export default Login;