import { Rule } from 'antd/lib/form';

export const rules = {
    required: (message: string) => ({
        required: true,
        message: message,
    }),
    validateTitle: () => ({
        validator(_: Rule, value: string) {
            if (!value) return Promise.resolve();
            if (value.startsWith(' ') || value.endsWith(' ')) {
                return Promise.reject(new Error('Không được bắt đầu hoặc kết thúc bằng khoảng trắng!'));
            }

            return Promise.resolve();
        },
    }),
};
