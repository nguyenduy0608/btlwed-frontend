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

        // for form data
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('type', data.type);
        formData.append('status', data.status);
        formData.append('file', data.file);
        formData.append('status_active', '1');
        formData.append('notification_customer', data.notificationCustomer ? '1' : '0');

        return AxiosClient.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    update: (id: number, data: any) => {
        const url = `/admin/news/${id}`;

        // for form data
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('type', data.type);
        formData.append('status', data.status);
        data.file && formData.append('file', data.file);
        formData.append('status_active', '1');
        formData.append('notification_customer', data.notificationCustomer ? '1' : '0');

        return AxiosClient.patch(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    updateStatus: (id: number, data: any) => {
        // for form data
        const formData = new FormData();
        formData.append('status_active', data.statusActive ? '1' : '0');
        formData.append('title', data.title);
        formData.append('status', data.status);
        formData.append('type', data.type);

        return AxiosClient.patch(`/admin/news/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    getDetail: (id: number) => {
        const url = `/admin/news/${id}`;
        return AxiosClient.get(url);
    },
};
