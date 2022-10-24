import AxiosClient from '@/apis/AxiosClient';

export const appService = {
    getKiotviet: async () => {
        return AxiosClient.get('/admin/kiotviet');
    },
};

export const selectAll = {
    label: 'Tất cả',
    value: '',
};
