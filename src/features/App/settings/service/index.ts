import AxiosClient from '@/apis/AxiosClient';

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
        return AxiosClient.post('/admin/config/bank', bank);
    },
};
