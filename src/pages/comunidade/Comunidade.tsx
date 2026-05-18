import communityPreview from "../../assets/connectelas-community-preview.png";

function InterfacePreview() {
  return (
   
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[#521f68]/45 bg-[#0b0d1a] shadow-[0_30px_90px_-35px_rgba(82,31,104,0.78)]">
      <img
        src={communityPreview}
        alt="Preview da interface da comunidade ConnectElas"
        className="h-full w-full object-cover opacity-45 grayscale-[0.35] blur-[1.5px]"
      />

      <div className="absolute inset-x-0 h-28 animate-pulse bg-linear-to-b from-transparent via-[#521f68]/70 to-transparent" />
      <div className="absolute inset-0 bg-[#020617]/60 backdrop-blur-[2px]" />

      <div className="absolute inset-0 flex items-center justify-center p-5">
        <div className="rounded-2xl border border-[#521f68]/35 bg-[#0f1121]/90 p-7 text-center shadow-[0_30px_90px_-35px_rgba(82,31,104,0.78)] backdrop-blur-md">
          <h2 className="text-2xl font-black uppercase tracking-normal text-white">
            Coming soon
          </h2>

          <div className="mt-4 flex justify-center gap-2" aria-label="Carregando">
            <span className="h-2 w-2 animate-bounce rounded-full bg-[#521f68]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-[#521f68] [animation-delay:0.2s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-[#521f68] [animation-delay:0.4s]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Comunidade() {
  return (
    
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#020617] px-6 py-10 text-white">
      
     
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px),radial-gradient(circle_at_50%_0%,rgba(82,31,104,0.15),transparent_60%)] bg-size-[54px_54px,54px_54px,100%_100%] opacity-70" />

      <section className="relative z-10 flex w-full max-w-5xl flex-col items-center">
        <span className="mb-4 animate-pulse rounded-full border border-[#521f68] bg-[#521f68]/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-[#d8b4fe] shadow-[0_0_15px_rgba(82,31,104,0.2)]">
          Status: Em Desenvolvimento
        </span>

        <h1 className="max-w-4xl text-center font-['Arial_Black','Arial',sans-serif] text-5xl font-black uppercase italic tracking-normal text-white md:text-7xl">
          Nossa <span className="bg-linear-to-r from-[#521f68] to-[#a855f7] bg-clip-text text-transparent pr-6" >Comunidade</span>
        </h1>

        <p className="mb-12 mt-6 max-w-xl text-center text-sm font-medium leading-relaxed text-slate-400 md:text-lg">
          Em breve, um espaço exclusivo para networking, mentoria e troca de experiências entre
          mulheres da tech.
        </p>

        <InterfacePreview />
      </section>
    </main>
  );
}