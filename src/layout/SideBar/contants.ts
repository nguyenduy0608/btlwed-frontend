import { ADMIN } from '@/contants';
import { itemAccountants, itemsAdmin, itemsNews } from './Sidebar.Menu';

export const switchSidebar = (group: string) => {
    switch (group) {
        case ADMIN.main:
            return itemsAdmin;
        case ADMIN.accountant:
            return itemAccountants;
        case ADMIN.news:
            return itemsNews;
        case ADMIN.stall:
            return itemsAdmin;
        default:
            return [];
    }
};
