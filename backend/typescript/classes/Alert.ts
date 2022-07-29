export default class Alert {
    title: string;
    text: string;
    options: {
        variant: 'error' | 'success' | 'warning',
        type: 'modal' | 'alert'
    };
    constructor({title, text, options}: Alert) {
        this.title = title;
        this.text = text;
        this.options = options
    }
}