export default class Alert {
    title: string;
    text: string;
    options: {
        variant: 'error' | 'success' | 'warning',
        type: 'modal' | 'alert'
    };
    validator?: {
        bool: boolean,
        payload: ValidatorPayload[]
    }
    constructor({title, text, options, validator}: AlertPayload) {
        if (validator?.bool) {
            this.title = 'Invalid Input';
            let msg = ``;
            validator.payload.forEach(_msg => msg += `<div>${_msg.msg}</div>`);
            this.text = msg;
            this.options = options;
            this.validator = validator;
            return;
        }
        this.title = title ? title : '';
        this.text = text ? text : '';
        this.options = options;
    }
}

type AlertOmit = Omit<Alert, 'text' | 'title'>;

interface ValidatorPayload {
    location?: string,
    msg?: string,
    param?: string,
    value?: string
}

interface AlertPayload extends AlertOmit {
    text?: string,
    title?: string,
}