import {

  EnvelopeSimpleIcon,
  PhoneIcon,
  MapPinIcon,
  PaperPlaneTiltIcon,
  TerminalIcon
} from '@phosphor-icons/react';
import { useState } from 'react';
import { toast } from 'react-toastify'


type ContatoProps = {
  isModal?: boolean;
  onClose?: () => void;
};

function Contato({ isModal = false, onClose }: ContatoProps) {

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

const [errors, setErrors] = useState({})
const [formData, setFormData] = useState({
  nome: "",
  email: "",
  assunto: "",
  mensagem: ""
})

const validate = () => {
  let newErrors = {}

  if (!formData.nome) {
    newErrors.nome = "Nome é obrigatório"
  }

  if (!formData.email) {
    newErrors.email = "Email é obrigatório"
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Email inválido"
  }

  if (!formData.assunto) {
    newErrors.assunto = "Informe o assunto"
  }

  if (!formData.mensagem) {
    newErrors.mensagem = "Digite sua mensagem"
  }

  setErrors(newErrors)

  return Object.keys(newErrors).length === 0
}

  const handleSubmit = (e) => {
  e.preventDefault() // evita reload da página

    if (!validate()) return

  setLoading(true)

  // simulação de envio de email
  setTimeout(() => {
    setLoading(false)
    setSuccess(true)
    toast.success("Mensagem enviada!", {
  style: {
    background: "#020617",
    border: "1px solid rgba(139,92,246,0.3)",
    color: "#c4b5fd"
  }
})

    // fecha depois de 1.5s
    setTimeout(() => {
      onClose?.()
      setSuccess(false)
    }, 1500)
  }, 1500)
}

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
      
    
      {/* CARD */}
      <div className="
      w-full max-w-3xl
        bg-slate-900/60 backdrop-blur-xl
        border border-white/10
        rounded-3xl
        shadow-2xl
        p-6 md:p-10
        relative
        shadow-[0_0_80px_rgba(139,92,246,0.15)]
      ">
        

        {/*  FECHAR */}
        {isModal && (
          <button
            onClick={() => onClose?.()}
            className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl
            cursor-pointer"
          >
            ✕
          </button>
        )}

        {/* HEADER */}
        <div className="flex flex-col items-center mb-12">
          <img src="https://ik.imagekit.io/majulial/connect/favIconConnectElas.png.png" alt=""
          width={75}
        
           />

          <h1 className="text-4xl font-black text-white italic mb-2">
            ABRA UM <span className="bg-linear-to-r from-fuchsia-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">CHAMADO</span>
          </h1>

          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-2">
            <TerminalIcon size={14} className="text-violet-400" />
            // connectelas.support
          </p>
          <div className="w-full h-0.5 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 animate-pulse"></div>
        </div>
        

        {/*  GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* 🟣 INFO  */}
          <div className="space-y-6 text-sm">

            <div className="flex items-center gap-3">
              <EnvelopeSimpleIcon className="text-violet-400" size={20} />
              <span>contato@connectelas.dev</span>
            </div>

            <div className="flex items-center gap-3">
              <PhoneIcon className="text-violet-400" size={20} />
              <span>+55 (11) 98765-4321</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPinIcon className="text-violet-400" size={20} />
              <span>São Paulo, Brasil</span>
            </div>

          </div>

          {/*  FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-1">

            <input
              type="text"
              placeholder="Ex: Seu nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-5 py-3 text-slate-200 focus:outline-none focus:border-violet-500/50 transition"
              
            />
             {errors.nome && (
            <span className="text-red-400 text-[11px] ml-2">
             {errors.nome}
              </span>
           )}

            <input
              type="email"
              placeholder="Seu e-mail"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-5 py-3 text-slate-200 focus:outline-none focus:border-violet-500/50 transition"
            />
            {errors.email && (
              <span className="text-red-400 text-[11px] ml-2">
                       {errors.email}
                      </span>
                      )}

            <input
              type="text"
              placeholder="Assunto"
              value={formData.assunto}
              onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
              className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-5 py-3 text-slate-200 focus:outline-none focus:border-violet-500/50 transition"
            />
              {errors.assunto && (
               <span className="text-red-400 text-[11px] ml-2">
                 {errors.assunto}
              </span>
            )}

            <textarea
             value={formData.mensagem}
              onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
              rows={5}
              placeholder="Descreva sua solicitação..."
              className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-5 py-3 text-slate-200 focus:outline-none focus:border-violet-500/50 transition resize-none"
            />
                      {errors.mensagem && (
              <span className="text-red-400 text-[11px] ml-2">
                {errors.mensagem}
              </span>
            )}

            <div className="flex gap-3">

              <button
                type="submit"
                disabled={loading}
               
                className="
                  flex-1 flex items-center justify-center gap-2
                  bg-gradient-to-r from-violet-600 to-fuchsia-700
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