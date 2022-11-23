import AxiosClient from '@/apis/AxiosClient';
import { RECORD_SIZE } from '@/config/theme';
import { handleObjectEmpty } from '@/utils';

export interface IQuery {
    page: number;
    search: string;
    createFrom: string;
    createTo: string;
}

export const stallService = {
    get: (params: any) => {
        const url = `/admin/kiotviet_report`;
        const handleParams = handleObjectEmpty(params);
        return AxiosClient.get(url, { params: { ...handleParams, limit: RECORD_SIZE } });
    },
    getFileExcel: (url: string, params: any) => {
        const handleParams = handleObjectEmpty(params);
        return AxiosClient.get(url, { params: { ...handleParams, limit: 999 } });
    },
};
