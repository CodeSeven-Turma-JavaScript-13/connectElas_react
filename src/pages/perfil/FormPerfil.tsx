import React, { useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { buscar, atualizar, atualizarParcial } from '../../services/Sercives';
import { 
  IdentificationCardIcon,
  FloppyDiskIcon,
  UserCircleIcon,
  LockKeyIcon,
  XCircleIcon,
  BriefcaseIcon
} from '@phosphor-icons/react';
import { ToastAlerta } from '../../util/ToastAlerta';
import type { Candidata } from '../../models/Candidata';
import type { Usuario } from '../../models/Usuario';

function FormPerfil() {
  const navigate = useNavigate();
  const { usuario, estaLogado, handleLogin } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado unificado que pode conter campos de Candidata ou Recrutador
  const [perfil, setPerfil] = useState<any>({
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    dataNascimento: '',
    // Campos de candidata
    telefone: '',
    localizacao: '',
    area_profissional: '',
    linkedin: '',
    portfolio: '',
    nivel_experiencia: '',
    pretensao_salarial: '',
    disponibilidade: ''
  });

  const isRecruiter = usuario.tipo?.toLowerCase() === 'recruiter';

  useEffect(() => {
    if (!estaLogado) {
      ToastAlerta('Você precisa estar logada para acessar essa página.', 'info');
      navigate('/login');
    }
  }, [estaLogado, navigate]);

  useEffect(() => {
    async function carregarDados() {
      if (usuario.id !== 0) {
        try {
          const endpoint = isRecruiter ? `/usuarios/${usuario.id}` : `/candidatas/${usuario.id}`;
          // Busca o perfil completo da usuária para preencher o formulário
          await buscar(endpoint, (dados: any) => {
            setPerfil((prev: any) => ({
              ...prev,
              ...dados,
              senha: '' // Limpamos a senha para não exibir o hash
            }));
          }, {
            headers: { Authorization: usuario.token }
          });
        } catch (error) {
          console.error("Erro ao carregar os dados do perfil.", error);
          ToastAlerta("Não foi possível carregar todas as informações do perfil.", "erro");
        } finally {
          setIsLoading(false);
        }
      }
    }
    carregarDados();
  }, [usuario]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setPerfil({
      ...perfil,
      [e.target.name]: e.target.value
    });
  }

  async function atualizarPerfil(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isRecruiter) {
        // Atualização de Recrutador
        const payload = {
          id: usuario.id,
          nome: perfil.nome,
          usuario: perfil.usuario,
          senha: perfil.senha,
          foto: perfil.foto,
          dataNascimento: perfil.dataNascimento
        };
        
        // Remove senha vazia para não dar erro se não for alterada
        if (!payload.senha) delete (payload as any).senha;

        await atualizar(`/usuarios/atualizar`, payload, (dadosAtualizados: any) => {
          // Opcional: atualizar o contexto caso nome/foto mudem
          handleLogin({ ...usuario, nome: dadosAtualizados.nome, foto: dadosAtualizados.foto });
        }, {
          headers: { Authorization: usuario.token }
        });
        ToastAlerta('Perfil de recrutador atualizado com sucesso!', 'sucesso');

      } else {
        // Atualização de Candidata
        const payload = {
          id: usuario.id,
          ...perfil
        };

        // Remove senha vazia
        if (!payload.senha) delete payload.senha;

        await atualizar(`/candidatas/${usuario.id}`, payload, (dadosAtualizados: any) => {
          handleLogin({ ...usuario, nome: dadosAtualizados.nome, foto: dadosAtualizados.foto });
        }, {
          headers: { Authorization: usuario.token }
        });
        ToastAlerta('Perfil de candidata atualizado com sucesso!', 'sucesso');
      }
      
      navigate('/perfil');
    } catch (error) {
      console.error("Erro ao atualizar perfil", error);
      ToastAlerta('Erro ao atualizar perfil. Verifique os dados e tente novamente.', 'erro');
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass = "w-full bg-slate-950/60 border border-white/5 rounded-2xl px-4 py-4 text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/20 transition-all font-mono text-sm";
  const labelClass = "text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-12 px-4 relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute top-1/4 right-0 w-125 h-125 bg-fuchsia-600/5 rounded-full blur-[150px] -z-10"></div>
      <div className="absolute bottom-0 left-1/4 w-125 h-125 bg-violet-600/5 rounded-full blur-[150px] -z-10"></div>
      
      <div className="mx-auto max-w-4xl">
        <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl relative">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-linear-to-r from-transparent via-fuchsia-500 to-transparent"></div>

          <div className="text-center mb-12">
            <div className="h-16 w-16 bg-linear-to-br from-fuchsia-600 to-violet-700 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-[0_0_30px_rgba(192,38,211,0.3)]">
              <UserCircleIcon size={36} weight="bold" />
            </div>
            <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
              Configurações de Perfil
            </h1>
            <p className="text-slate-500 font-mono text-[10px] mt-2 uppercase tracking-[0.3em]">
               // auth_update_protocol
            </p>
          </div>

          <form onSubmit={atualizarPerfil} className="space-y-8">
            
            {/* Seção 1: Dados Básicos (Ambos) */}
            <div>
               <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
                 <IdentificationCardIcon size={20} className="text-fuchsia-500" />
                 Informações Básicas
               </h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className={labelClass}>Nome Completo</label>
                   <input
                     type="text"
                     name="nome"
                     value={perfil.nome}
                     onChange={atualizarEstado}
                     className={inputClass}
                     required
                   />
                 </div>
                 
                 <div>
                   <label className={labelClass}>{isRecruiter ? 'E-mail Corporativo' : 'E-mail'}</label>
                   <input
                     type="email"
                     name="usuario"
                     value={perfil.usuario || perfil.email} 
                     onChange={atualizarEstado}
                     className={inputClass}
                     required
                   />
                 </div>

                 <div>
                   <label className={labelClass}>URL da Foto</label>
                   <input
                     type="text"
                     name="foto"
                     value={perfil.foto}
                     onChange={atualizarEstado}
                     className={inputClass}
                   />
                 </div>

                 <div>
                   <label className={labelClass}>Data de Nascimento</label>
                   <input
                     type="date"
                     name="dataNascimento"
                     value={perfil.dataNascimento?.split('T')[0]} // Ajuste caso venha com time
                     onChange={atualizarEstado}
                     className={inputClass}
                     required
                   />
                 </div>
               </div>
            </div>

            {/* Seção 2: Dados Profissionais (Somente Candidata) */}
            {!isRecruiter && (
              <div>
                <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 mt-10 flex items-center gap-2 border-b border-white/5 pb-4">
                  <BriefcaseIcon size={20} className="text-violet-500" />
                  Perfil Profissional
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className={labelClass}>Área Profissional</label>
                    <select
                      name="area_profissional"
                      value={perfil.area_profissional}
                      onChange={atualizarEstado}
                      className={`${inputClass} appearance-none`}
                    >
                      <option value="">Selecione...</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Fullstack">Fullstack</option>
                      <option value="Mobile">Mobile</option>
                      <option value="DevOps">DevOps</option>
                      <option value="Data Science">Data Science</option>
                      <option value="UX/UI Design">UX/UI Design</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Nível de Experiência</label>
                    <select
                      name="nivel_experiencia"
                      value={perfil.nivel_experiencia}
                      onChange={atualizarEstado}
                      className={`${inputClass} appearance-none`}
                    >
                      <option value="">Selecione...</option>
                      <option value="Estágio">Estágio</option>
                      <option value="Trainee">Trainee</option>
                      <option value="Júnior">Júnior</option>
                      <option value="Pleno">Pleno</option>
                      <option value="Sênior">Sênior</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Disponibilidade</label>
                    <select
                      name="disponibilidade"
                      value={perfil.disponibilidade}
                      onChange={atualizarEstado}
                      className={`${inputClass} appearance-none`}
                    >
                      <option value="">Selecione...</option>
                      <option value="Home-office">Home-office</option>
                      <option value="Hibrido">Hibrido</option>
                      <option value="Presencial">Presencial</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Localização</label>
                    <input
                      type="text"
                      name="localizacao"
                      value={perfil.localizacao || ''}
                      onChange={atualizarEstado}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Telefone</label>
                    <input
                      type="text"
                      name="telefone"
                      value={perfil.telefone || ''}
                      onChange={atualizarEstado}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Pretensão Salarial</label>
                    <input
                      type="text"
                      name="pretensao_salarial"
                      value={perfil.pretensao_salarial || ''}
                      onChange={atualizarEstado}
                      className={inputClass}
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label className={labelClass}>LinkedIn</label>
                    <input
                      type="url"
                      name="linkedin"
                      value={perfil.linkedin || ''}
                      onChange={atualizarEstado}
                      className={inputClass}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className={labelClass}>Portfólio / GitHub</label>
                    <input
                      type="url"
                      name="portfolio"
                      value={perfil.portfolio || ''}
                      onChange={atualizarEstado}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Seção 3: Segurança */}
            <div>
               <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 mt-10 flex items-center gap-2 border-b border-white/5 pb-4">
                 <LockKeyIcon size={20} className="text-fuchsia-500" />
                 Segurança
               </h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className={labelClass}>Nova Senha <span className="normal-case opacity-50">(deixe em branco para não alterar)</span></label>
                   <input
                     type="password"
                     name="senha"
                     value={perfil.senha}
                     onChange={atualizarEstado}
                     className={inputClass}
                     placeholder="Mínimo 8 caracteres"
                   />
                 </div>
               </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col md:flex-row gap-4 pt-8">
              <button
                type="button"
                onClick={() => navigate('/perfil')}
                className="flex items-center justify-center gap-2 flex-1 rounded-2xl border border-white/10 px-8 py-5 text-slate-500 font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 hover:text-white transition-all text-center"
              >
                <XCircleIcon size={18} />
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-2 group relative flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-fuchsia-600 to-violet-700 px-8 py-5 text-white font-black uppercase tracking-tighter transition-all hover:shadow-[0_0_40px_rgba(192,38,211,0.4)] hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                <FloppyDiskIcon size={20} weight="bold" />
                {isSubmitting ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default FormPerfil;
