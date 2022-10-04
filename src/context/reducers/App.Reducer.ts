import { APP_LOADING, IAction, InitialStateType } from '../types';

export const appReducer = (state: InitialStateType, action: IAction) => {
    switch (action.type) {
        case APP_LOADING: {
            return { ...state, appLoading: action.payload };
        }

        default: {
            throw new Error(`[appReducer] Unhandled action type: ${action.type}`);
        }
    }
};
