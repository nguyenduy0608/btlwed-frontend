import { APP_LOADING, IAction, InitialStateType, SET_INFO, SET_KIOTVIETS } from '../types';

export const appReducer = (state: InitialStateType, action: IAction) => {
    switch (action.type) {
        case APP_LOADING: {
            return { ...state, appLoading: action.payload };
        }

        case SET_INFO: {
            return { ...state, info: action.payload };
        }

        case SET_KIOTVIETS: {
            return { ...state, kiotviets: action.payload };
        }

        default: {
            throw new Error(`[appReducer] Unhandled action type: ${action.type}`);
        }
    }
};
