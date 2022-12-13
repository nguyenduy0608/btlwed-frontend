import AxiosClient from '@/apis/AxiosClient';
import { RECORD_SIZE } from '@/config/theme';
import { handleObjectEmpty } from '@/utils';
import { DataTypeNotification } from '../components/Notification.Config';
export interface IQuery {
    page: number;
    kiotvietId?: string | number;
}

export const NotificationService = {
    get: (params: IQuery) => {
        const url = `/notification`;
        const handleParams = handleObjectEmpty(params);
        return AxiosClient.get(url, { params: { ...handleParams, limit: RECORD_SIZE } });
    },
    create: (data: DataTypeNotification) => {
        const url = `/admin/notification`;
        return AxiosClient.post(url, data);
    },
    update: (id: number, data: DataTypeNotification) => {
        const url = `/admin/notification/${id}`;
        return AxiosClient.patch(url, data);
    },
};
