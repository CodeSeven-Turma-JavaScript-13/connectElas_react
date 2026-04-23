import React, { useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/Sercives';
import { CodeIcon, UserPlusIcon } from '@phosphor-icons/react';
import type { Candidata } from '../../models/Candidata';

function Cadastro() {
  const navigate = useNavigate();
  const { estaLogado } = useAuth();

  const [confirmarSenha, setConfirmarSenha] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const [candidata, setCandidata] = useState<Omit<Candidata, 'id' | 'data_cadastro' | 'oportunidade'>>({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    dataNascimento: '',
    localizacao: '',
    area_profissional: '',
    linkedin: '',
    portfolio: '',
    nivel_experiencia: '',
    pretensao_salarial: '',
    disponibilidade: '',
  });

  useEffect(() => {
    if (estaLogado) navigate('/home');
  }, [estaLogado, navigate]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setCandidata({ ...candidata, [e.target.name]: e.target.value });
  }

  async function cadastrarAoSubmeter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmarSenha !== candidata.senha) {
      alert('As senhas não coincidem.');
      setConfirmarSenha('');
      setCandidata({ ...candidata, senha: '' });
      return;
    }

    if (candidata.senha.length < 8) {
      alert('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    setIsLoading(true);
    try {
      await api.post('/candidatas', candidata);
      alert('Conta criada com sucesso!');
      navigate('/login');
    } catch (error: any) {
      console.error('// erro_cadastro_candidata:', error.response?.data || error.message);
      alert('Erro ao cadastrar. Verifique se o e-mail já está em uso.');
    } finally {
      setIsLoading(false);
    }
  }

  const inputClass = "w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 transition-all font-mono text-sm";
  const labelClass = "text-[10px] font-black text-fuchsia-400 uppercase tracking-[0.2em] ml-1";

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 bg-slate-950 relative overflow-hidden font-sans">

      <div className="absolute top-0 right-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] -z-10"></div>

      <div className="w-full max-w-2xl">
        <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">

          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-violet-500 to-transparent opacity-50"></div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-violet-600 to-fuchsia-700 text-white mb-4 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <UserPlusIcon size={32} weight="bold" />
            </div>
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">Criar Conta Dev</h2>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mt-1">
              // CONNECT_ELAS_V2.0.AUTH
            </p>
          </div>

          <form onSubmit={cadastrarAoSubmeter} className="space-y-8">

            {/* BLOCO 01: Dados Pessoais */}
            <div>
              <p className="text-[14px] font-mono text-slate-600 uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
                <span className="text-violet-500">01</span> Dados Pessoais
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="space-y-2">
                  <label className={labelClass}>Nome Completo</label>
                  <input type="text" name="nome" placeholder="Seu nome completo"
                    className={inputClass} value={candidata.nome} onChange={atualizarEstado} required />
                </div>

                <div className="space-y-2">
                  <label className={labelClass}>E-mail</label>
                  <input type="email" name="email" placeholder="dev@connectelas.com"
                    className={inputClass} value={candidata.email} onChange={atualizarEstado} required />
                </div>

                <div className="space-y-2">
                  <label className={labelClass}>Telefone</label>
                  <input type="tel" name="telefone" placeholder="(21) 99999-0000"
                    className={inputClass} value={candidata.telefone} onChange={atualizarEstado} required />
                </div>

                <div className="space-y-2">
                  <label className={labelClass}>Data de Nascimento</label>
                  <input type="date" name="dataNascimento"
                    className={inputClass} value={candidata.dataNascimento} onChange={atualizarEstado} required />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className={labelClass}>Localização</label>
                  <input type="text" name="localizacao" placeholder="Ex: São Paulo, SP"
                    className={inputClass} value={candidata.localizacao} onChange={atualizarEstado} required />
                </div>

              </div>
            </div>

            <div className="border-t border-white/5"></div>

            {/* BLOCO 02: Perfil Profissional */}
            <div>
              <p className="text-[14px] font-mono text-slate-600 uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
                <span className="text-violet-500">02</span> Perfil Profissional
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="space-y-2">
                  <label className={labelClass}>Área Profissional</label>
                  <select name="area_profissional" className={inputClass} value={candidata.area_profissional} onChange={atualizarEstado} required>
                    <option value="" disabled>Selecione...</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Fullstack">Fullstack</option>
                    <option value="Mobile">Mobile</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Data Science">Data Science</option>
                    <option value="UX/UI Design">UX/UI Design</option>
                    <option value="QA / Testes">QA / Testes</option>
                    <option value="Produto">Produto</option>
                    <option value="Segurança">Segurança</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className={labelClass}>Nível de Experiência</label>
                  <select name="nivel_experiencia" className={inputClass} value={candidata.nivel_experiencia} onChange={atualizarEstado} required>
                    <option value="" disabled>Selecione...</option>
                    <option value="Estágio">Estágio</option>
                    <option value="Trainee">Trainee</option>
                    <option value="Júnior">Júnior</option>
                    <option value="Pleno">Pleno</option>
                    <option value="Sênior">Sênior</option>
                    <option value="Liderança">Liderança</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className={labelClass}>Disponibilidade</label>
                  <select name="disponibilidade" className={inputClass} value={candidata.disponibilidade} onChange={atualizarEstado} required>
                    <option value="" disabled>Selecione...</option>
                    <option value="Home-office">Home-office</option>
                    <option value="Hibrido">Hibrido</option>
                    <option value="Presencial">Presencial</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className={labelClass}>Pretensão Salarial (R$) <span className="text-slate-700 normal-case">(opcional)</span></label>
                  <input type="number" name="pretensao_salarial" placeholder="Ex: 5000"
                    className={inputClass} value={candidata.pretensao_salarial} onChange={atualizarEstado} min="0" />
                </div>

                <div className="space-y-2">
                  <label className={labelClass}>LinkedIn <span className="text-slate-700 normal-case">(opcional)</span></label>
                  <input type="url" name="linkedin" placeholder="https://linkedin.com/in/..."
                    className={inputClass} value={candidata.linkedin} onChange={atualizarEstado} />
                </div>

                <div className="space-y-2">
                  <label className={labelClass}>Portfólio <span className="text-slate-700 normal-case">(opcional)</span></label>
                  <input type="url" name="portfolio" placeholder="https://seuportfolio.dev"
                    className={inputClass} value={candidata.portfolio} onChange={atualizarEstado} />
                </div>

              </div>
            </div>

            <div className="border-t border-white/5"></div>

            {/* BLOCO 03: Credenciais */}
            <div>
              <p className="text-[14px] font-mono text-slate-600 uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
                <span className="text-violet-500">03</span> Credenciais de Acesso
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="space-y-2">
                  <label className={labelClass}>Senha</label>
                  <input type="password" name="senha" placeholder="Mínimo 8 caracteres"
                    className={inputClass} value={candidata.senha} onChange={atualizarEstado} required />
                </div>

                <div className="space-y-2">
                  <label className={labelClass}>Confirmar Senha</label>
                  <input type="password" name="confirmarSenha" placeholder="Repita a senha"
                    className={inputClass} value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)} required />
                </div>

              </div>
            </div>

            {/* Ações */}
            <div className="flex flex-col md:flex-row gap-4 pt-2">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="flex-1 rounded-xl border border-white/10 px-8 py-4 text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-2 group relative flex items-center justify-center rounded-xl bg-white px-8 py-4 text-slate-950 font-black uppercase tracking-tighter transition-all hover:bg-violet-600 hover:text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Compilando...' : 'Compilar Cadastro'}
                {!isLoading && <span className="ml-3 font-mono text-lg transition-transform group-hover:translate-x-1">→</span>}
              </button>
            </div>
          </form>

          {/* Rodapé terminal */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="flex justify-between items-center text-[9px] font-mono text-slate-700 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <CodeIcon size={12} className="text-violet-500" />
                TIPO_CONTA: CANDIDATA
              </div>
              <span>SSL_ENCRYPTION: ACTIVE</span>
            </div>
          </div>
        </div>

        <p className="text-center text-[13px] font-mono text-slate-600 uppercase tracking-widest mt-6">
          É recrutador?{' '}
          <button
            onClick={() => navigate('/cadastro-recrutador')}
            className="text-fuchsia-500 hover:text-fuchsia-400 transition-colors font-black"
          >
            Registrar_Recrutador
          </button>
        </p>
      </div>
    </div>
  );
}

export default Cadastro;
