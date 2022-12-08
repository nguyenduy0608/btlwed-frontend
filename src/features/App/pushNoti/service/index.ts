import AxiosClient from '@/apis/AxiosClient';

export const pushNotiService = {
    get: (page = 1) => {
        return AxiosClient.get(`/notification`, {
            params: {
                page: page,
                limit: 20,
            },
        });
    },
    read: (id: number) => {
        return AxiosClient.put('/notification/' + id);
    },
};
