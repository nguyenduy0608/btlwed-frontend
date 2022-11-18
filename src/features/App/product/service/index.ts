import AxiosClient from '@/apis/AxiosClient';
import { RECORD_SIZE } from '@/config/theme';
import { handleObjectEmpty } from '@/utils';

import { DataTypeProduct } from '../components/Product.Config';

export interface IQuery {
    page: number;
    kiotvietId?: string | number;
}

export const CategoryService = {
    get: (params: IQuery) => {
        const url = `/admin/product_category`;
        const handleParams = handleObjectEmpty(params);
        return AxiosClient.get(url, { params: { ...handleParams, limit: RECORD_SIZE } });
    },
    update: (id: number, data: { order: number | string }) => {
        const url = `/admin/product_category/${id}/re_order`;
        return AxiosClient.patch(url, { ...data });
    },
    unlock: (id: number) => {
        const url = `/admin/product_category/${id}/active`;
        return AxiosClient.patch(url);
    },
    lock: (id: number) => {
        const url = `/admin/product_category/${id}/inactive`;
        return AxiosClient.patch(url);
    },
    changeStatus: (id: number, status: boolean) => {
        const url = status ? `/admin/product_category/${id}/active` : `/admin/product_category/${id}/inactive`;
        return AxiosClient.patch(url);
    },
};
export const ProductService = {
    get: (params: IQuery) => {
        const url = `/admin/product`;
        const handleParams = handleObjectEmpty(params);
        return AxiosClient.get(url, { params: { ...handleParams, limit: RECORD_SIZE } });
    },
    update: (id: number, data: any) => {
        const url = `/admin/product/${id}`;
        return AxiosClient.patch(url, { ...data });
    },
    detail: (id: string | undefined) => {
        const url = `/admin/product/${id}`;
        return AxiosClient.get(url);
    },
};
