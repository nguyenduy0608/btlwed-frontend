import AxiosClient from '@/apis/AxiosClient';
import { RECORD_SIZE } from '@/config/theme';
import { handleObjectEmpty } from '@/utils';

import { DataTypeAccount } from '../component/Account.Config';
export interface IQuery {
    page: number;
}

const accountService = {
    get: (params: IQuery) => {
        const url = `/admin/admin`;
        const handleParams = handleObjectEmpty(params);
        return AxiosClient.get(url, { params: { ...handleParams, limit: RECORD_SIZE } });
    },
    create: (data: DataTypeAccount) => {
        const url = `/admin/admin`;
        return AxiosClient.post(url, data);
    },
    update: (id: number, data: DataTypeAccount) => {
        const url = `/admin/admin/${id}`;
        return AxiosClient.patch(url, data);
    },
    delete: (id: number) => {
        const url = `/admin/admin/${id}`;
        return AxiosClient.delete(url);
    },
    unlock: (id: number) => {
        const url = `/admin/admin/${id}/active`;
        return AxiosClient.patch(url);
    },
    lock: (id: number) => {
        const url = `/admin/admin/${id}/inactive`;
        return AxiosClient.patch(url);
    },
    resetPassword: (id: number) => {
        const url = `/admin/admin/${id}/reset-password`;
        return AxiosClient.patch(url);
    },
};

export default accountService;
