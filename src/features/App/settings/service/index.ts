import AxiosClient from '@/apis/AxiosClient';

export const settingService = {
    getProductByKiotViet: (kiotvietId: number, params: any) => {
        return AxiosClient.get(`/admin/product`, { params: { kiotvietId, ...params } });
    },
    getOrderByKiotViet: (kiotvietId: number, params: any) => {
        return AxiosClient.get(`/admin/order`, { params: { kiotvietId, ...params } });
    },
};
