import AxiosClient from '@/apis/AxiosClient';
import { RECORD_SIZE } from '@/config/theme';
import { handleObjectEmpty } from '@/utils';

export interface IQuery {
    page: number;
    search: string;
    createFrom: string;
    createTo: string;
    kiotvietId: number;
}

export const sellService = {
    get: (params: any) => {
        const url = `/admin/sale_report`;
        const handleParams = handleObjectEmpty(params);
        return AxiosClient.get(url, { params: { ...handleParams, limit: RECORD_SIZE } });
    },
    getFileExcel: (url: string, params: any) => {
        const handleParams = handleObjectEmpty(params);
        console.log('🚀 ~ file: index.ts ~ line 21 ~ handleParams', handleParams);
        return AxiosClient.get(url, { params: { ...handleParams, limit: 999 } });
    },
};
