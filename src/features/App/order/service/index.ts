import AxiosClient from '@/apis/AxiosClient';
import { RECORD_SIZE } from '@/config/theme';
import { handleObjectEmpty } from '@/utils';

import { DataTypeOrder } from '../components/Order.Config';

export interface IQuery {
    page: number;
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
};

