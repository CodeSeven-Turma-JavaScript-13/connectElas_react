import {
  ChatCircleTextIcon,
  EnvelopeSimpleIcon,
  PhoneIcon,
  MapPinIcon,
  PaperPlaneTiltIcon,
  TerminalIcon
} from '@phosphor-icons/react';

type ContatoProps = {
  isModal?: boolean;
  onClose?: () => void;
};

function Contato({ isModal = false, onClose }: ContatoProps) {
  return (
    <div
      className={`
        ${isModal
          ? "fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-xl px-4"
          : "min-h-screen bg-slate-950 flex items-center justify-center px-4"
        }
        text-slate-300
      `}
    >
      {/* 🔹 CARD */}
      <div className="
        w-full max-w-5xl
        bg-slate-900/60 backdrop-blur-xl
        border border-white/10
        rounded-3xl
        shadow-2xl
        p-6 md:p-10
        relative
      ">

        {/* ❌ FECHAR */}
        {isModal && (
          <button
            onClick={() => onClose?.()}
            className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl
            cursor-pointer"
          >
            ✕
          </button>
        )}

        {/* 🔹 HEADER */}
        <div className="text-center mb-8">
          <div className="h-14 w-14 bg-linear-to-br from-violet-600 to-fuchsia-700 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-xl">
            <ChatCircleTextIcon size={28} weight="bold" />
          </div>

          <h1 className="text-4xl font-black text-white italic mb-2">
            ABRA UM <span className="text-violet-500">CHAMADO</span>
          </h1>

          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-2">
            <TerminalIcon size={14} className="text-violet-400" />
            // connectelas.support
          </p>
        </div>

        {/*  GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* 🟣 INFO  */}
          <div className="space-y-6 text-sm">

            <div className="flex items-center gap-3">
              <EnvelopeSimpleIcon className="text-violet-400" size={20} />
              <span>codeseven777@hotmail.com</span>
            </div>

            <div className="flex items-center gap-3">
              <PhoneIcon className="text-violet-400" size={20} />
              <span>+55 (21) 99857-7111</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPinIcon className="text-violet-400" size={20} />
              <span>Rio de Janeiro, Brasil</span>
            </div>

          </div>

          {/*  FORM */}
          <form className="space-y-5">

            <input
              type="text"
              placeholder="Seu nome"
              className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-5 py-3 text-slate-200 focus:outline-none focus:border-violet-500/50 transition"
            />

            <input
              type="email"
              placeholder="Seu e-mail"
              className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-5 py-3 text-slate-200 focus:outline-none focus:border-violet-500/50 transition"
            />

            <input
              type="text"
              placeholder="Assunto"
              className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-5 py-3 text-slate-200 focus:outline-none focus:border-violet-500/50 transition"
            />

            <textarea
              rows={5}
              placeholder="Descreva sua solicitação..."
              className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-5 py-3 text-slate-200 focus:outline-none focus:border-violet-500/50 transition resize-none"
            />

            <div className="flex gap-3">

              <button
                type="submit"
                onClick={() => onClose?.()}
                className="
                  flex-1 flex items-center justify-center gap-2
                  bg-linear-to-r from-violet-600 to-fuchsia-700
                  py-4 rounded-xl text-white font-bold
                  hover:scale-[1.02]
                  hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]
                  transition
                  cursor-pointer
                "
              >
                Enviar
                <PaperPlaneTiltIcon size={20} weight="bold" />
              </button>

              {isModal && (
                <button
                  type="button"
                  onClick={() => onClose?.()}
                  className="flex-1 bg-slate-800 py-4 rounded-xl text-slate-300 hover:bg-slate-700 transition
                  cursor-pointer"
                >
                  Cancelar
                </button>
              )}

            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Contato;