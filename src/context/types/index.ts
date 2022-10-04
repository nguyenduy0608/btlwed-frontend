export const APP_LOADING = 'APP_LOADING';

type ActionType = typeof APP_LOADING;

export type InitialStateType = { appLoading: boolean };

export interface IAction {
    type: ActionType;
    payload?: any;
}
