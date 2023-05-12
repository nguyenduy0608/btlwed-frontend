import AxiosClient from '@/apis/AxiosClient';
import { RECORD_SIZE } from '@/config/theme';
import { handleObjectEmpty } from '@/utils';

import { DataTypeOrder } from '../components/Contract.Config';

export interface IQuery {
    page: number;
}
export interface Export {
    search?: string;
    productId?: string;
    userId?: string;
    kiotvietId?: string;
    createtableType?: string;
    createFrom?: string;
    createTo?: string;
    status?: number | string;
}
export const OrderService = {
    get: (params: IQuery) => {
        const url = `/admin/order`;
        const handleParams = handleObjectEmpty(params);
        return AxiosClient.get(url, { params: { ...handleParams, limit: RECORD_SIZE } });
    },
    detail: (id: string | undefined) => {
        const url = `/admin/order/${id}`;
        return AxiosClient.get(url);
    },
    exportExcel: (params: Export) => {
        const url =
            `/admin/order/export_to_excel?search=${params?.search || ''}&createtable_type=${
                params?.createtableType || ''
            }&kiotviet_id=${params?.kiotvietId || ''}&create_from=${params?.createFrom || ''}&create_to=${
                params?.createTo || ''
            }` + (params?.status ? `status=${params?.status}` : '');
        return AxiosClient.post(url);
    },
};
