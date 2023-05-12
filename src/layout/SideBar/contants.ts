import { ADMIN } from '@/contants';
import { itemAccountants, itemsAdmin, itemsNews } from './Sidebar.Menu';

export const switchSidebar = (group: string) => {
    switch (group) {
        case ADMIN.main:
            return itemsAdmin;
        case ADMIN.employee:
            return itemAccountants;

        default:
            return [];
    }
};
