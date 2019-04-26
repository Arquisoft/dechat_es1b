import { Message } from "./message";

export class ImageMessage extends Message{

    content: File;

    constructor(makerWebId: string, message: string, content: File, sendTime: Date = new Date()) {
        super(makerWebId, message, sendTime);
        this.content = content;
    }

    public toString(): String {
        return this.message;
     }
}