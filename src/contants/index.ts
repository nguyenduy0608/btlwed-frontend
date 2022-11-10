import { PerformanceNodeTiming } from 'perf_hooks';

export const STATUS = {
    active: 1,
    unActive: 0,
};

export const REWARD = {
    gift: 1,
    discount: 2,
};

export const APPLICABLE_TYPE = {
    order: 1,
    product: 2,
};

export const CUSTOMER_TYPE = {
    AGENT: 1,
    DISTRIBUTORS: 2,
};
export const ADMIN = {
    main: 1,
    stall: 2,
};
// export const ORDERSTATUS = {
//     completed: 'completed',
//     inprogress: 'inprogress',
//     cancelled: 'cancelled',
//     wait: 'wait_confirmation',
// };
export const PAYMENTSTATUS = {
    pending: 'pending',
};
export const ORDER_STATUS = {
    WAIT_CONFIRMATION: 'wait_confirmation',
    INPROGRESS: 'inprogress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
};

export enum WALLET_TYPE {
    PAYMENT_ORDER = 'payment_order',
    ORDER_COMPLETED = 'order_completed',
    DEPOSIT = 'deposit',
    MEMBER_UPGRADE = 'member_upgrade',
    JOIN_WITH_INVITE = 'join_with_invite',
    INVITE = 'invite',
    GIFT_EXCHANGE = 'gift_exchange',
}

export enum ORDER_STATE {
    ORDER_TIME = 'order_time',
    CONFIRM = 'confirm',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}
