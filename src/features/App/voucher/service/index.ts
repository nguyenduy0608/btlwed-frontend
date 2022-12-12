import AxiosClient from '@/apis/AxiosClient';
import { RECORD_SIZE } from '@/config/theme';
import { handleObjectEmpty } from '@/utils';

import { DataTypeVoucher } from '../components/Voucher.Config';

export interface IQuery {
    page: number;
}

const voucherService = {
    get: (params: IQuery) => {
        const url = `/admin/voucher`;
        const handleParams = handleObjectEmpty(params);
        return AxiosClient.get(url, { params: { ...handleParams, limit: RECORD_SIZE } });
    },
    detail: (id: number) => {
        const url = `/admin/voucher/${id}`;
        return AxiosClient.get(url);
    },
    create: (data: FormData) => {
        const url = `/admin/voucher`;
        return AxiosClient.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    update: (id: string, data: FormData) => {
        const url = `/admin/voucher/${id}`;
        return AxiosClient.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    delete: (id: number) => {
        const url = `/admin/voucher/${id}`;
        return AxiosClient.delete(url);
    },
    unlock: (id: number) => {
        const url = `/admin/voucher/${id}/active`;
        return AxiosClient.patch(url);
    },
    lock: (id: number) => {
        const url = `/admin/voucher/${id}/inactive`;
        return AxiosClient.patch(url);
    },
    resetPassword: (id: number) => {
        const url = `/admin/voucher/${id}/reset-password`;
        return AxiosClient.patch(url);
    },
    getProduct: (params: IQuery) => {
        const url = `/admin/product`;
        const handleParams = handleObjectEmpty(params);
        return AxiosClient.get(url, { params: { ...handleParams, limit: 8 } });
    },
    checkExitsVoucher: async (search: string) => {
        const url = `/admin/voucher`;
        const res = await AxiosClient.get(url, { params: { searchCode: search } });
        if (res.status && res.data?.length > 0) {
            return true;
        }

        return false;
    },
};

export default voucherService;
