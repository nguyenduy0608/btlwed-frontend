import { IRole, IStatus } from '@/types';

export interface IFilter {
    search?: string;
    status?: IStatus | null;
    createFrom?: string | null;
    createTo?: string | null;
    accountId?: IRole | null;
}
