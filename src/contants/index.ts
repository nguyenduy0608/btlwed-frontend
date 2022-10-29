import { PerformanceNodeTiming } from "perf_hooks";

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
export const ORDERSTATUS ={
    completed:'completed',
    inprogress:'inprogress',
    cancelled :'cancelled',
    wait: 'wait_confirmation',
}
export const PAYMENTSTATUS ={ 
    pending: 'pending',

}
