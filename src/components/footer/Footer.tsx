import { GithubLogoIcon, LinkedinLogoIcon, BookOpenIcon, UsersIcon, GlobeIcon, EnvelopeIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] text-white border-t border-white/10 pt-12 pb-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Coluna Marca - ConnectElas */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold tracking-wider uppercase">
                ConnectElas <span className="text-fuchsia-500 text-sm block font-medium">System V2.0</span>
              </h3>
              <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">
                Desenvolvido pela 7Code
              </p>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Plataforma CRM dedicada ao fortalecimento e conexão de mulheres no ecossistema de tecnologia.
            </p>
          </div>

          {/* Coluna Navegação */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6 text-fuchsia-400">Navegação</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link to="/perfil" className="hover:text-white transition-colors flex items-center gap-2"><UsersIcon size={16} /> Meu Perfil</Link></li>
              <li><Link to="/oportunidades" className="hover:text-white transition-colors flex items-center gap-2"><GlobeIcon size={16} /> Oportunidades</Link></li>
              <li><Link to="/perfil/candidaturas" className="hover:text-white transition-colors flex items-center gap-2">📄 Minhas Candidaturas</Link></li>
            </ul>
          </div>

          {/* Coluna Institucional */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6 text-fuchsia-400">Recursos</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><BookOpenIcon size={16} /> Diretrizes</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><LinkedinLogoIcon size={16} /> LinkedIn</a></li>
              <li><a href="https://github.com/CodeSeven-Turma-JavaScript-13/connectElas_react.git" target="_blank" className="hover:text-white transition-colors flex items-center gap-2"><GithubLogoIcon size={16} /> Repositório GitHub</a></li>
            </ul>
          </div>

          {/* Coluna Status/Contato */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest mb-6 text-fuchsia-400">Contato</h4>
              <p className="text-sm text-white/60 flex items-center gap-2 hover:text-white cursor-pointer">
                <EnvelopeIcon size={18} /> suporte@connectelas.com.br
              </p>
            </div>
            
            {/* Indicador de Status   */}
            <div className="mt-8 flex items-center gap-2 text-[10px] font-mono text-fuchsia-500 uppercase tracking-tighter bg-fuchsia-500/10 w-fit px-3 py-1 rounded-full border border-fuchsia-500/30">
              <span>{`</>`}</span>
              <span>Status: Compilado com sucesso</span>
            </div>
          </div>
        </div>

        {/* Rodapé Inferior */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-white/30 uppercase tracking-widest">
          <p>© {currentYear} ConnectElas - Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
             <span>Generation Brasil</span>
             <span className="w-1 h-1 bg-white/20 rounded-full"></span>
             <span>Grupo 05</span>
             <span className="w-1 h-1 bg-white/20 rounded-full"></span>
             <span>Projeto Integrador</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;