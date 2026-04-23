// src/components/StatusBadge.tsx

import { resolverStatusVaga, statusConfig } from "../../util/statusvaga";


interface Props {
  disponivel: boolean;
  dataEncerramento?: string; // campo opcional vindo do backend
}

export function StatusBadge({ disponivel, dataEncerramento }: Props) {
  const status = resolverStatusVaga(disponivel, dataEncerramento);
  const { label, className } = statusConfig[status];

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${className}`}>
      {label}
    </span>
  );
}