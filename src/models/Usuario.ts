export interface Usuario {
  id?: number;
  nome: string;
  usuario: string;
  senha: string;
  foto?: string;
  dataNascimento: string;
  dataCriacao?: string;
  oportunidade?: any;
}