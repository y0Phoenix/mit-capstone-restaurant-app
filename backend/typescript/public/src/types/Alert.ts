import Alert from "../../../classes/Alert"

export interface AlertState extends Alert{
    show: boolean
};

export interface SetAlertAction {
    type: string,
    payload: Alert
};

export interface RemoveAlertAction {
    type: string
}