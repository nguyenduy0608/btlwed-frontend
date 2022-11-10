import AxiosClient from '@/apis/AxiosClient';
import { RECORD_SIZE } from '@/config/theme';
import { handleObjectEmpty } from '@/utils';

export enum IStatus {
    UNACTIVE = 0,
    ACTIVE = 1,
}

export enum NEWS_TYPE {
    BANNER = 1,
    POLICY = 2,
    TUTORIAL = 3,
}

export enum NEWS_STATUS {
    POST = 1,
    DRAFT = 2,
}

interface IQuery {
    page: number;
    search: string;
    statusActive: IStatus | undefined;
    typeNews: NEWS_TYPE | undefined;
    status: NEWS_STATUS | undefined;
    fromDate: string;
    toDate: string;
}
export const newService = {
    get: (params: IQuery) => {
        const url = `/admin/news`;
        const handleParams = handleObjectEmpty(params);
        return AxiosClient.get(url, { params: { ...handleParams, limit: RECORD_SIZE } });
    },
    create: (data: any) => {
        const url = `/admin/news`;
        return AxiosClient.post(url, data);
    },
};
