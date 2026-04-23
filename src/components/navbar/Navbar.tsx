
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { AddressBookTabsIcon, BookIcon, BriefcaseIcon, GraduationCapIcon, SignOutIcon, UserIcon, UsersIcon } from '@phosphor-icons/react';
import { ToastAlerta } from '../../util/ToastAlerta';

function Navbar() {
  const navigate = useNavigate();
  const { estaLogado, handleLogout } = useAuth();

  function logout() {
    handleLogout();
    ToastAlerta('Usuária deslogada com sucesso!', 'sucesso');
    navigate('/login');
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-fuchsia-500/20 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2 group cursor-pointer">
          <img src='https://ik.imagekit.io/o02kjfcyy/Integrantes%20Code7/logoconnectElas.png.png' alt='Logo connectElas' className='w-50 h-15'/>
        </Link>
        
        {/* Links de Navegação */}
        <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
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

        {/* Botões de Ação */}
        <div className="flex items-center gap-4">
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
      </div>
    </nav>
  );
}

export default Navbar;