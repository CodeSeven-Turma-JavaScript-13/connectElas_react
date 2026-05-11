
import React from 'react';
import CardMembro from './CardMembro';

const Equipe: React.FC = () => {
  const membros = [
    {
      nome: "Julia Lima",
      funcao: "Scrum Master",
      foto: "https://ik.imagekit.io/xhkoeth0m/imagens%20integrantes/WhatsApp_Image_2026-03-06_at_13.24.23-removebg-preview-removebg-preview2.png?updatedAt=1778526915180",
      link: "https://www.linkedin.com/in/juliadlima/"
    },
    {
      nome: "Ana Beatriz",
      funcao: "Tester",
      foto: "https://ik.imagekit.io/xhkoeth0m/imagens%20integrantes/Ana_Beatriz-removebg-preview-removebg-preview1.png?updatedAt=1778526971157",
      link: "https://itsbya.github.io/portfolio_pessoal/"
    },
    {
      nome: "Larissa Mendonça",
      funcao: "Dev",
      foto: "https://ik.imagekit.io/xhkoeth0m/imagens%20integrantes/Larissa_Mendonca_2-removebg-preview-removebg-preview.jpg?updatedAt=1778526932955",
      link: "https://outwake.github.io/portfolio/"
    },
    {
      nome: "Daniella Camilo",
      funcao: "Dev",
      foto: "https://ik.imagekit.io/xhkoeth0m/imagens%20integrantes/Daniella_Camilo_6-removebg-preview-removebg-preview.jpg?updatedAt=1778526957584",
      link: "https://www.linkedin.com/in/daniella-camilo-3b64b0393/"
    },
    {
      nome: "Lucas Jesus",
      funcao: "Dev",
      foto: "https://ik.imagekit.io/xhkoeth0m/imagens%20integrantes/Lucas_Jesus_4-removebg-preview-removebg-preview.jpg?updatedAt=1778526915234",
      link: "https://www.linkedin.com/in/lucas-jesus-972a8128a/"
    },
    {
      nome: "Matheus Canellas",
      funcao: "Dev",
      foto: "https://ik.imagekit.io/xhkoeth0m/imagens%20integrantes/Matheus_Canellas_6-removebg-preview-removebg-preview.jpg?updatedAt=1778526915321",
      link: "https://www.linkedin.com/in/matheus-canellas/"
    },
    {
      nome: "João Pedro",
      funcao: "Dev",
      foto: "https://ik.imagekit.io/xhkoeth0m/imagens%20integrantes/Joao_Pedro_5-removebg-preview-removebg-preview.jpg?updatedAt=1778526932962",
      link: "https://www.linkedin.com/in/joão-pedro-oliveira-95b003255/"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Elementos Decorativos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-fuchsia-600/5 blur-[120px] -z-10 rounded-full"></div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block px-4 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-[10px] font-black uppercase tracking-widest mb-4">
             Nossa Equipe
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-white uppercase italic tracking-tighter mb-4 leading-tight">
            Conheça o Time <span className="text-fuchsia-500">Code7</span>
          </h2>
          <p className="text-slate-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em]">
            // grupo: 05 / integrantes_projeto
          </p>
        </div>

        {/* Grid de Membros - Centralizado */}
        <div className="flex flex-wrap justify-center gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16">
          {membros.map((membro, index) => (
            <div key={index} className="w-full max-w-[280px] sm:max-w-none sm:w-64 lg:w-60 flex justify-center">
              <CardMembro 
                nome={membro.nome}
                funcao={membro.funcao}
                foto={membro.foto}
                link={membro.link}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Equipe;
