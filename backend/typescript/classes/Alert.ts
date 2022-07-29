export default class Alert {
    title: string;
    text: string;
    options: {
        variant: 'error' | 'success' | 'warning',
        type: 'modal' | 'alert'
    };
    constructor({title, text, options, validator}: AlertPayload) {
        if (validator?.bool) {
            this.title = 'Invalid Input';
            let msg = ``;
            validator.payload.forEach(_msg => msg += `${_msg.msg}\n`);
            this.text = msg;
            this.options = options;
            return;
        }
        this.title = title;
        this.text = text;
        this.options = options
    }
}

type AlertOmit = Omit<Alert, 'text' | 'title'>;

interface AlertPayload extends AlertOmit {
    text?: string,
    title?: string,
    validator?: {
        bool: boolean,
        payload: {
            location?: string,
            msg?: string,
            param?: string,
            value?: string
        }[]
    }
}