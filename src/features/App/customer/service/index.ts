import AxiosClient from '@/apis/AxiosClient';
import { RECORD_SIZE } from '@/config/theme';
import { handleObjectEmpty } from '@/utils';

import { DataTypeCustomer } from '../components/Customer.Config';
export interface IQuery {
    page: number;
}

export const CustomerService = {
    get: (params: IQuery) => {
        const url = `/admin/user`;
        const handleParams = handleObjectEmpty(params);
        return AxiosClient.get(url, { params: { ...handleParams, limit: RECORD_SIZE } });
    },

    update: (id: number, data: DataTypeCustomer) => {
        const url = `/admin/user/${id}`;
        return AxiosClient.patch(url, { ...data });
    },
};
export const PurchaseService = {
    get: (params: IQuery) => {
        const url = `/admin/oder`;
        const handleParams = handleObjectEmpty(params);
        return AxiosClient.get(url, { params: { ...handleParams, limit: RECORD_SIZE } });
    },
   
};
export const DebitService = {
    get: (params: IQuery) => {
        const url = `/admin/debit`;
        const handleParams = handleObjectEmpty(params);
        return AxiosClient.get(url, { params: { ...handleParams, limit: RECORD_SIZE } });
    },



};
export const WalletChangeService = {
    get: (params: IQuery) => {
        const url = `/admin/wallet_change`;
        const handleParams = handleObjectEmpty(params);
        return AxiosClient.get(url, { params: { ...handleParams, limit: RECORD_SIZE } });
    },
};