export const APP_LOADING = 'APP_LOADING';
export const SET_INFO = 'SET_INFO';

type ActionType = typeof APP_LOADING | typeof SET_INFO;

export type InitialStateType = { appLoading: boolean; info: any };

export interface IAction {
    type: ActionType;
    payload?: any;
}
