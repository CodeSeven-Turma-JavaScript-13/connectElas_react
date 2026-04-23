
import React from 'react';
import CardMembro from './CardMembro';

const Equipe: React.FC = () => {
  const membros = [
    {
      nome: "Julia Lima",
      funcao: "Scrum Master",
      foto: "https://ik.imagekit.io/o02kjfcyy/Integrantes%20Code7/WhatsApp_Image_2026-03-06_at_13.24.23-removebg-preview-removebg-preview2.png?updatedAt=1776225975068"
    },
    {
      nome: "Ana Beatriz",
      funcao: "Tester",
      foto: "https://ik.imagekit.io/o02kjfcyy/Integrantes%20Code7/Ana_Beatriz-removebg-preview-removebg-preview1.png?updatedAt=1776225975057"
    },
    {
      nome: "Larissa Mendonça",
      funcao: "Dev",
      foto: "https://ik.imagekit.io/o02kjfcyy/Integrantes%20Code7/Larissa_Mendonca_2-removebg-preview-removebg-preview.jpg?updatedAt=1776225973793"
    },
    {
      nome: "Daniella Camilo",
      funcao: "Dev",
      foto: "https://ik.imagekit.io/o02kjfcyy/Integrantes%20Code7/Daniella_Camilo_6-removebg-preview-removebg-preview.jpg?updatedAt=1776225973607"
    },
    {
      nome: "Lucas Jesus",
      funcao: "Dev",
      foto: "https://ik.imagekit.io/o02kjfcyy/Integrantes%20Code7/Lucas_Jesus_4-removebg-preview-removebg-preview.jpg?updatedAt=1776225973902"
    },
    {
      nome: "Matheus Canellas",
      funcao: "Dev",
      foto: "https://ik.imagekit.io/o02kjfcyy/Integrantes%20Code7/Matheus_Canellas_6-removebg-preview-removebg-preview.jpg?updatedAt=1776225973922"
    },
    {
      nome: "João Pedro",
      funcao: "Dev",
      foto: "https://ik.imagekit.io/o02kjfcyy/Integrantes%20Code7/Joao_Pedro_5-removebg-preview-removebg-preview.jpg?updatedAt=1776225973784"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Elementos Decorativos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-fuchsia-600/5 blur-[120px] -z-10 rounded-full"></div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-[10px] font-black uppercase tracking-widest mb-4">
             Nossa Equipe
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
            Conheça o Time <span className="text-fuchsia-500">Code7</span>
          </h2>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.3em]">
            // grupo: 05 / integrantes_projeto
          </p>
        </div>

        {/* Grid de Membros - Centralizado */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-16">
          {membros.map((membro, index) => (
            <div key={index} className="w-72 sm:w-64 lg:w-60 flex justify-center">
              <CardMembro 
                nome={membro.nome}
                funcao={membro.funcao}
                foto={membro.foto}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Equipe;
