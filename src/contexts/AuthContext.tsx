import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { UsuarioLogin } from '../models/UsuarioLogin';

// Interface que define tudo que o Contexto vai expor para a aplicação
interface AuthContextData {
  usuario: UsuarioLogin;
  estaLogado: boolean;
  handleLogin(usuario: UsuarioLogin): void;
  handleLogout(): void;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Criação do Contexto com valor padrão vazio
const AuthContext = createContext<AuthContextData>({} as AuthContextData);



export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    usuario: '',
    senha: '',
    token: ''

  });

  const [isLoading, setIsLoading] = useState(true);

  // Verifica se existe um usuário salvo no localStorage ao carregar a aplicação
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuarioConnectElas');
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
    setIsLoading(false);
  }, []);

  // Função para realizar o login
  function handleLogin(usuarioLogin: UsuarioLogin) {
    setUsuario(usuarioLogin);
    localStorage.setItem('usuarioConnectElas', JSON.stringify(usuarioLogin));
  }

  // Função para deslogar
  function handleLogout() {
    localStorage.removeItem('usuarioConnectElas');
    setUsuario({
      id: 0,
      usuario: '',
      senha: '',
      token: ''
    });
  }

  // Define se está logado baseado na existência de um ID ou Token
  const estaLogado = usuario.id !== 0;

  return (
    <AuthContext.Provider value={{ usuario, estaLogado, handleLogin, handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para facilitar o uso do contexto nos componentes
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}