import { ICreatetable, IOrderStatus } from '@/types';

export interface IFilter {
    search?: string;
    status?: IOrderStatus | null;
    createtableType?: ICreatetable | null;
    createFrom?: string | null;
    createTo?: string | null;
}
