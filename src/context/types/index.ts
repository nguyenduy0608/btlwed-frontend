import { Socket } from 'socket.io-client';

export const APP_LOADING = 'APP_LOADING';
export const SET_INFO = 'SET_INFO';
export const SET_KIOTVIETS = 'SET_KIOTVIETS';
export const SET_SYNC_LOADING = 'SET_SYNC_LOADING';
export const SET_SOCKET = 'SET_SOCKET';

type ActionType =
    | typeof APP_LOADING
    | typeof SET_INFO
    | typeof SET_KIOTVIETS
    | typeof SET_SYNC_LOADING
    | typeof SET_SOCKET;

export type InitialStateType = {
    appLoading: boolean;
    info: any;
    kiotviets: IKiotviet[] | null;
    syncLoading: boolean;
    socket: Socket | null;
};

export interface IAction {
    type: ActionType;
    payload?: any;
}

export interface IKiotviet {
    id: number;
    retailer_id: number;
    name: string;
    client_id: string;
    client_secret: string;
    retailer: string;
    default_branch_id: number;
    default_branch_name: string;
    status: number;
    access_token: string;
    token_expires_at: string;
    deleted_at: null;
    created_at: string;
    updated_at: string;
    google_tokens: null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    kiotviet_id: number;
}
