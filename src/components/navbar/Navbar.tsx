
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BriefcaseIcon, GraduationCapIcon, SignOutIcon, UsersIcon } from '@phosphor-icons/react';

function Navbar() {
  const navigate = useNavigate();
  const { estaLogado, handleLogout } = useAuth();

  function logout() {
    handleLogout();
    alert('Usuária deslogada com sucesso!');
    navigate('/login');
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-fuchsia-500/20 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2 group cursor-pointer">
          <div className="h-9 w-9 rounded-lg bg-linear-to-tr from-fuchsia-600 to-violet-600 flex items-center justify-center text-white font-mono font-bold shadow-[0_0_20px_rgba(192,38,211,0.4)] group-hover:scale-110 transition-transform">
            &lt;E&gt;
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase">
            Connect<span className="text-fuchsia-500">Elas</span>
          </span>
        </Link>
        
        {/* Links de Navegação */}
        <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <Link to="/oportunidades" className="hover:text-fuchsia-400 transition-colors flex items-center gap-2">
            <BriefcaseIcon size={16} /> Vagas Tech
          </Link>
          <Link to="/comunidade" className="hover:text-fuchsia-400 transition-colors flex items-center gap-2">
            <UsersIcon size={18} /> Comunidade
          </Link>
          <Link to="/mentorias" className="hover:text-fuchsia-400 transition-colors flex items-center gap-2">
            <GraduationCapIcon size={18} /> Mentoria
          </Link>
          <Link to="/sobre" className="hover:text-fuchsia-400 transition-colors">
            Sobre Nós
          </Link>
     
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center gap-4">
          {!estaLogado ? (
            <Link 
              to="/login"
              className="rounded-full bg-linear-to-r from-fuchsia-600 to-violet-600 px-6 py-2 text-xs font-bold text-white shadow-lg hover:shadow-fuchsia-500/40 transition-all active:scale-95"
            >
              ÁREA DA DEV
            </Link>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/perfil" className="text-[10px] font-black text-fuchsia-400 uppercase tracking-widest hover:text-white transition-colors">
                Meu Perfil
              </Link>
              <button 
                onClick={logout}
                className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors text-[10px] font-black uppercase"
              >
                <SignOutIcon size={18} weight="bold" />
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;