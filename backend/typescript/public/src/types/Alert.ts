export interface Alert {
    title: string,
    text: string,
    type: string[],
    show: boolean
};

export interface SetAlertAction {
    type: string,
    payload: SetAlertPayload
};

export interface SetAlertPayload {
    title: string,
    text: string,
    type: string[]
};

export interface RemoveAlertAction {
    type: string
}