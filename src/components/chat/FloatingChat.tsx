import { useState } from "react";
import { ChatCircleTextIcon } from "@phosphor-icons/react";
import Contato from "../../pages/contato/Contato";
 // ajuste o caminho se necessário

function FloatingChat() {

  // controla abrir/fechar o formulário
  const [open, setOpen] = useState(false);

  const [showHint, setShowHint] = useState(true);

  return (
    <>
      {/* Mensagem flutuante */}
{!open && (
  <div className="
    fixed bottom-21 right-6 z-40
    bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-800/80 border border-white/5 text-white text-sm
    px-4 py-1 rounded-md shadow-xl
    
    animate-floatPing
  ">
    Dúvidas? Fale conosco!
  </div>
)}

      {/* FORMULÁRIO COMO MODAL */}
      {open && (
        <Contato 
          isModal={true} 
          onClose={() => setOpen(false)} 
        />
      )}

      {/* 🔥 BOTÃO FLUTUANTE */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="
            fixed bottom-6 right-6 z-50
            p-4 rounded-full
            bg-gradient-to-r from-violet-600 to-fuchsia-700
            text-white shadow-lg
            transition-all duration-300
            hover:scale-110
            hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]
            active:scale-95
            cursor-pointer
          "
        >
          <ChatCircleTextIcon size={24} weight="bold" />
        </button>
      )}
    </>
  );
}

export default FloatingChat;