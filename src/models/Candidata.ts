import type { Oportunidade } from "./Oportunidade";

export interface Candidata {
id: number;
nome: string;
email: string;
senha:string;
telefone: string;
foto: string,
dataNascimento: string;
localizacao: string;
area_profissional: string;
linkedin: string;
portfolio: string;
nivel_experiencia: string;
pretensao_salarial: string;
disponibilidade: string;
data_cadastro: string;
oportunidade ?: Oportunidade[];
}