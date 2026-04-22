import axios from 'axios';


// Configuração da instância principal do Axios
export const api = axios.create({
  baseURL: '/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});


export const cadastrarUsuario = async (url: string, dados: object, setDados: Function) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};


export const login = async (url: string, dados: object, setDados: Function) => {
  try {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
    
    // Armazena o token se o backend retornar
    if (resposta.data.token) {
      api.defaults.headers.common['Authorization'] = resposta.data.token;
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


