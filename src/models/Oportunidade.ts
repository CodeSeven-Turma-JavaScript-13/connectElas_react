import type { Candidata } from "./Candidata";
import type { Usuario } from "./Usuario";

export interface Oportunidade {


id: number;
titulo: string;
empresa: string;
area: string;
descricao: string;
tipoContrato: string;
modalidade: string;
salario: string;
localizacao: string;
nivelExperiencia: string;
beneficios: string;
ativa: boolean;
dataCriacao: string;
dataAtualizacao: string;
candidata: Candidata[];
usuario: Usuario;


}