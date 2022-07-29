export default class Alert {
    title: string;
    text: string;
    type: string[];
    constructor({title, text, type}: Alert) {
        this.title = title;
        this.text = text;
        this.type = type
    }
}