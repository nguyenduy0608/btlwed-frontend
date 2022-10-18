import { IStatus } from '@/types';

export interface IFilter {
    search?: string;
    status?: IStatus | null;
    createFrom?: string | null;
    createTo?: string | null;
}
