// src/utils/statusVaga.ts

type StatusVaga = 'disponivel' | 'em_andamento' | 'indisponivel';

export function resolverStatusVaga(disponivel: boolean, dataEncerramento?: string): StatusVaga {
  if (!disponivel) return 'indisponivel';
  if (dataEncerramento && new Date(dataEncerramento) < new Date()) return 'indisponivel';
  // Aqui você pode adicionar outra lógica para "em andamento"
  // Ex: se tiver candidaturas, se estiver em processo seletivo, etc.
  return 'disponivel';
}

export const statusConfig: Record<StatusVaga, { label: string; className: string }> = {
  disponivel:    { label: 'Disponível',    className: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10' },
  em_andamento:  { label: 'Em Andamento',  className: 'text-sky-400    border-sky-400/30    bg-sky-400/10'    },
  indisponivel:  { label: 'Indisponível',  className: 'text-slate-400  border-slate-400/30  bg-slate-400/10'  },
};