
import { ChatCircleTextIcon, EnvelopeSimpleIcon, GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon, MapPinIcon, PaperPlaneTiltIcon, PhoneIcon, TerminalIcon } from '@phosphor-icons/react';

function Contato() {
  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-12 px-4 relative overflow-hidden text-slate-300">
      
      {/* Background Decorativo */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-fuchsia-600/5 rounded-full blur-[100px] -z-10"></div>

      <div className="mx-auto max-w-6xl">
        
        {/* Header Seção
        <div className="text-center mb-20">
          <div className="h-14 w-14 bg-linear-to-br from-violet-600 to-fuchsia-700 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl">
             <ChatCircleTextIcon size={32} weight="bold" />
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter uppercase mb-4">
            Abra um <span className="text-violet-500">Chamado</span>
          </h1>
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-2">
            <TerminalIcon size={14} className="text-violet-400" />
            // establish_secure_connection.v2
          </p>
        </div> */}

        {/* HEADER */}
        <div className="flex flex-col items-center mb-12">
          {/* <img
            src="https://ik.imagekit.io/majulial/connect/favIconConnectElas.png.png"
            width={75}
          /> */}

          <div className="h-14 w-14 bg-linear-to-br from-violet-600 to-fuchsia-700 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl">
             <ChatCircleTextIcon size={32} weight="bold" />
          </div>

          <h1 className="text-4xl font-black md:text-7xl text-white italic mb-2">
            ABRA UM <span className="bg-linear-to-r from-fuchsia-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">CHAMADO</span>
          </h1>

          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] flex items-center gap-2">
            <TerminalIcon size={14} className="text-violet-400" />
            // connectelas.support
          </p>

          <div className="w-full h-0.5 mt-2 bg-linear-to-r from-violet-600 via-fuchsia-500 to-cyan-400 animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Info Side */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 p-10 rounded-[40px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl -z-10"></div>
              <h3 className="text-white font-black uppercase tracking-widest text-xs mb-10 border-b border-white/5 pb-6 text-center">
                         Canais_Físicos
              </h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-violet-500/10 rounded-xl text-violet-400">
                    <EnvelopeSimpleIcon size={24} weight="bold" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-1">E-mail</span>
                    <p className="text-slate-200 font-mono text-sm group cursor-pointer hover:text-violet-400 transition-colors">codeseven777@hotmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-violet-500/10 rounded-xl text-violet-400">
                    <PhoneIcon size={24} weight="bold" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-1">Terminal</span>
                    <p className="text-slate-200 font-mono text-sm">+55 (21) 99857-7111</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-violet-500/10 rounded-xl text-violet-400">
                    <MapPinIcon size={24} weight="bold" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-1">Localização</span>
                    <p className="text-slate-200 font-mono text-sm leading-relaxed">Rio de Janeiro, Brasil</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 flex gap-4">
                <a href="#" className="p-3 rounded-xl bg-slate-950 border border-white/5 text-slate-500 hover:text-violet-400 hover:border-violet-500/30 transition-all"><LinkedinLogoIcon size={20} /></a>
                <a href="https://github.com/CodeSeven-Turma-JavaScript-13" target='_blank' className="p-3 rounded-xl bg-slate-950 border border-white/5 text-slate-500 hover:text-white hover:border-white/20 transition-all"><GithubLogoIcon size={20} /></a>
                <a href="#" className="p-3 rounded-xl bg-slate-950 border border-white/5 text-slate-500 hover:text-fuchsia-400 hover:border-fuchsia-500/30 transition-all"><InstagramLogoIcon size={20} /></a>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-3">
             <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 p-10 md:p-14 rounded-[40px] shadow-2xl">
                <form className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Assinatura</label>
                        <input 
                          type="text" 
                          placeholder="Ex: Seu Nome"
                          className="w-full bg-slate-950/60 border border-white/5 rounded-2xl px-6 py-4 text-slate-200 focus:outline-none focus:border-violet-500/50 transition-all font-mono text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">E-mail de Retorno</label>
                        <input 
                          type="email" 
                          placeholder="dev@mail.com"
                          className="w-full bg-slate-950/60 border border-white/5 rounded-2xl px-6 py-4 text-slate-200 focus:outline-none focus:border-violet-500/50 transition-all font-mono text-sm"
                        />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Protocolo de Assunto</label>
                      <input 
                        type="text" 
                        placeholder="Ex: Suporte Técnico, Parcerias..."
                        className="w-full bg-slate-950/60 border border-white/5 rounded-2xl px-6 py-4 text-slate-200 focus:outline-none focus:border-violet-500/50 transition-all font-mono text-sm"
                      />
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Corpo do Chamado</label>
                      <textarea 
                        rows={6}
                        placeholder="Descreva sua solicitação com detalhes técnicos..."
                        className="w-full bg-slate-950/60 border border-white/5 rounded-4xl px-8 py-6 text-slate-200 focus:outline-none focus:border-violet-500/50 transition-all font-mono text-sm resize-none"
                      />
                   </div>

                   <button 
                    type="submit"
                    className="w-full group relative flex items-center justify-center rounded-2xl bg-linear-to-r from-violet-600 to-fuchsia-700 px-8 py-5 text-white font-black uppercase tracking-tighter transition-all hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:scale-[1.01] active:scale-95 cursor-pointer"
                   >
                     Enviar Mensagem
                     <PaperPlaneTiltIcon size={24} weight="bold" className="ml-3 transition-transform group-hover:translate-x-1" />
                   </button>
                </form>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Contato;
