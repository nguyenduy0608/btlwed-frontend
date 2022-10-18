import AxiosClient from '@/apis/AxiosClient';

interface IDataLogin {
    phoneNumber: string;
    password: string;
}

export const authService = {
    login: (data: IDataLogin) => {
        return AxiosClient.post('/admin/session', data);
    },
    info: () => {
        return AxiosClient.get('/admin/session/me');
    },
};
