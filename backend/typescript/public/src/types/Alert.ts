import Alert from "../../../classes/Alert"

export interface AlertState {
    title: string,
    text: string,
    type: string[],
    show: boolean
};

export interface SetAlertAction {
    type: string,
    payload: Alert
};

export interface RemoveAlertAction {
    type: string
}