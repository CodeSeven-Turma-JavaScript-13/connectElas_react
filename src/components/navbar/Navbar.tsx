import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { AddressBookTabsIcon, BookIcon, BriefcaseIcon, GraduationCapIcon, List, SignOutIcon, UserIcon, UsersIcon, X } from '@phosphor-icons/react';
import { ToastAlerta } from '../../util/ToastAlerta';

function Navbar() {
  const navigate = useNavigate();
  const { estaLogado, handleLogout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function logout() {
    handleLogout();
    ToastAlerta('Usuária deslogada com sucesso!', 'sucesso');
    navigate('/login');
    setIsMenuOpen(false);
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-fuchsia-500/20 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2 group cursor-pointer">
          <img src='https://ik.imagekit.io/xhkoeth0m/connectElas/logoconnectElas.png.png?updatedAt=1778527036189' alt='Logo connectElas' className='w-50 h-15'/>
        </Link>
        
        {/* Links de Navegação - Desktop */}
        <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <Link to="/oportunidades" className="hover:text-fuchsia-400 transition-colors flex items-center gap-2 text-sm">
            <BriefcaseIcon size={16} /> Vagas Tech
          </Link>
          <Link to="/comunidade" className="hover:text-fuchsia-400 transition-colors flex items-center gap-2 text-sm">
            <UsersIcon size={18} /> Comunidade
          </Link>
          <Link to="/mentorias" className="hover:text-fuchsia-400 transition-colors flex items-center gap-2 text-sm">
            <GraduationCapIcon size={18} /> Mentoria
          </Link>
          <Link to="/sobre" className="hover:text-fuchsia-400 transition-colors text-sm flex items-center gap-1">
           <BookIcon size={18} />
            Sobre
          </Link>
          <Link to="/contato" className="hover:text-fuchsia-400 transition-colors text-sm flex items-center gap-2">
            <AddressBookTabsIcon size={18} />
            Contato
          </Link>
        </div>

        {/* Botões de Ação - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {!estaLogado ? (
            <Link 
              to="/login"
              className="rounded-full bg-linear-to-r from-fuchsia-600 to-violet-600 px-6 py-2 text-sm font-bold text-white shadow-lg hover:shadow-fuchsia-500/40 transition-all active:scale-95"
            >
              ÁREA DA DEV
            </Link>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/perfil" className="flex items-center text-sm font-black text-fuchsia-400 uppercase tracking-widest hover:text-white transition-colors gap-2">
               <UserIcon size={18} />
                Meu Perfil
              </Link>
              <button 
                onClick={logout}
                className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors text-sm font-black uppercase "
              >
                <SignOutIcon size={18} weight="bold" />
                Sair
              </button>
            </div>
          )}
        </div>

        {/* Botão Menu Mobile */}
        <div className="lg:hidden flex items-center">
          <button 
            onClick={toggleMenu}
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            {isMenuOpen ? <X size={28} weight="bold" /> : <List size={28} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-slate-950 border-b border-fuchsia-500/20 py-6 px-4 space-y-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-4 text-slate-400 font-black uppercase tracking-widest text-xs">
            <Link to="/oportunidades" onClick={() => setIsMenuOpen(false)} className="hover:text-fuchsia-400 transition-colors flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <BriefcaseIcon size={20} /> Vagas Tech
            </Link>
            <Link to="/comunidade" onClick={() => setIsMenuOpen(false)} className="hover:text-fuchsia-400 transition-colors flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <UsersIcon size={22} /> Comunidade
            </Link>
            <Link to="/mentorias" onClick={() => setIsMenuOpen(false)} className="hover:text-fuchsia-400 transition-colors flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <GraduationCapIcon size={22} /> Mentoria
            </Link>
            <Link to="/sobre" onClick={() => setIsMenuOpen(false)} className="hover:text-fuchsia-400 transition-colors flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <BookIcon size={22} /> Sobre
            </Link>
            <Link to="/contato" onClick={() => setIsMenuOpen(false)} className="hover:text-fuchsia-400 transition-colors flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <AddressBookTabsIcon size={22} /> Contato
            </Link>
          </div>

          <div className="pt-4 border-t border-white/10">
            {!estaLogado ? (
              <Link 
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block text-center rounded-xl bg-linear-to-r from-fuchsia-600 to-violet-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/20"
              >
                ÁREA DA DEV
              </Link>
            ) : (
              <div className="space-y-4">
                <Link 
                  to="/perfil" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center text-sm font-black text-fuchsia-400 uppercase tracking-widest gap-2 p-3 bg-fuchsia-500/5 rounded-xl border border-fuchsia-500/20"
                >
                  <UserIcon size={20} /> Meu Perfil
                </Link>
                <button 
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 text-red-400 p-3 hover:bg-red-400/10 transition-colors text-sm font-black uppercase rounded-xl border border-red-400/20"
                >
                  <SignOutIcon size={20} weight="bold" /> Sair
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;