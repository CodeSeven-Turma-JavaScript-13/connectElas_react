import axios from 'axios';


// Configuração da instância principal do Axios
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: adiciona o token em TODA requisição automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const cadastrarUsuario = async (url: string, dados: object, setDados: Function) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};


export const login = async (url: string, dados: object, setDados: Function) => {
  try {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
    
     if (resposta.data.token) {
      localStorage.setItem('token', resposta.data.token);
    }
    
    return true;
  } catch (error) {
    console.error("// erro_autenticacao: falha ao conectar com o servidor");
    throw error;
  }
};


export const buscar = async (url: string, setDados: Function, header: object) => {
  const resposta = await api.get(url, header);
  setDados(resposta.data);
};


export const cadastrar = async (url: string, dados: object, setDados: Function, header: object) => {
  const resposta = await api.post(url, dados, header);
  setDados(resposta.data);
};


export const atualizar = async (url: string, dados: object, setDados: Function, header: object) => {
  const resposta = await api.put(url, dados, header);
  setDados(resposta.data);
};


export const deletar = async (url: string, header: object) => {
  await api.delete(url, header);
};


