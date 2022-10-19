import { Rule } from 'antd/lib/form';

const REG_PHONE = /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/;

export const errorValidPhone = () => ({
    validator(_: Rule, value: number) {
        if (!value?.toString()?.trim()) return Promise.resolve();
        if (!value?.toString()?.match(REG_PHONE) || isNaN(Number(value))) {
            return Promise.reject(new Error('Vui lòng nhập đúng định dạng số điện thoại!'));
        }
        return Promise.resolve();
    },
});