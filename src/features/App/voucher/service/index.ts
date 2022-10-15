import AxiosClient from '@/apis/AxiosClient';
import { RECORD_SIZE } from '@/config/theme';
import { handleObjectEmpty } from '@/utils';


import { DataTypeVoucher } from '../components/Voucher.Config';

export interface IQuery {
    page: number;
    search: string;
}

const voucherService = {
    get: (params: IQuery) => {
        const url = `/admin/voucher`;
        const handleParams = handleObjectEmpty(params);
        return AxiosClient.get(url, { params: { ...handleParams, limit: RECORD_SIZE } });
    },
    create: (data: DataTypeVoucher) => {
        const url = `/admin/voucher`;
        return AxiosClient.post(url, data);
    },
    update: (id: number, data: DataTypeVoucher) => {
        const url = `/admin/voucher/${id}`;
        return AxiosClient.patch(url, data);
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
};

export default voucherService;
