export interface Alert {
    title: string,
    text: string,
    type: string,
    show: boolean
};

export interface SetAlertAction {
    type: string,
    payload: {
        title: string,
        text: string
        type: string
    }
};

export interface SetAlertPayload {
    title: string,
    text: string,
    type: string
};

export interface RemoveAlertAction {
    type: string
}