export const pageSizes = ['10', '25', '50', '100'] as const;
export type PageSize = (typeof pageSizes)[number];
