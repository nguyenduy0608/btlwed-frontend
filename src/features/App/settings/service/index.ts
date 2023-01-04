import AxiosClient from '@/apis/AxiosClient';
import { RECORD_SIZE } from '@/config/theme';
import { handleObjectEmpty } from '@/utils';
export interface IQuery {
    page: number;
    kiotvietId?: string | number;
}
export const settingService = {
    getProductByKiotViet: (kiotvietId: number, params: any) => {
        return AxiosClient.get(`/admin/product`, { params: { kiotvietId, ...params } });
    },
    getOrderByKiotViet: (kiotvietId: number, params: any) => {
        return AxiosClient.get(`/admin/order`, { params: { kiotvietId, ...params } });
    },

    // tích điểm
    getPoint: () => {
        return AxiosClient.get('/admin/config/coin');
    },
    updatePoint: (coin: number) => {
        return AxiosClient.post('/admin/config/coin', { coin });
    },

    // tích điểm
    getContact: () => {
        return AxiosClient.get('/admin/config/contact');
    },
    updateContact: (contact: any) => {
        return AxiosClient.post('/admin/config/contact', contact);
    },

    // thông tin chuyển khoản
    getPayment: () => {
        return AxiosClient.get('/admin/config/bank');
    },
    updatePayment: (bank: any) => {
        return AxiosClient.post('/admin/config/bank', bank, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    // thêm gian hàng
    // todo: tạo liên kết kiotviet
    postKiotviet: (data: any) => {
        return AxiosClient.post('/admin/kiotviet', data);
    },
    toggleActive: (id: number) => {
        return AxiosClient.put('/admin/kiotviet/' + id);
    },
    deleteKiotviet: (id: number) => {
        return AxiosClient.post('/admin/kiotviet/' + id + '/delete');
    },

    // todo: cấu hình chi nhánh mặc định
    branchKiotviet: (id: any, data: any) => {
        return AxiosClient.patch('/admin/kiotviet/' + id + '/set_default_branch', data);
    },
};
export const WarehouseService = {
    get: (params: IQuery) => {
        const url = `/admin/branches`;
        const handleParams = handleObjectEmpty(params);
        return AxiosClient.get(url, { params: { ...handleParams, limit: RECORD_SIZE } });
    },
    create: (data: any) => {
        const url = `/admin/branches`;
        return AxiosClient.post(url, data);
    },
    update: (id: number, data: any) => {
        const url = `/admin/branches/${id}`;
        return AxiosClient.patch(url, data);
    },
    delete: (id: number) => {
        const url = `/admin/branches/${id}`;
        return AxiosClient.delete(url);
    },
};
