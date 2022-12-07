import AxiosClient from '@/apis/AxiosClient';

export const pushNotiService = {
    get: () => {
        return AxiosClient.get('/notification');
    },
    read: (id: number) => {
        return AxiosClient.put('/notification/' + id);
    },
};
