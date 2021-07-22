export class Message {
    constructor(
        public id?: number,
        public text?: string,
        public userid?: number,
        public user?: object,
        public themeid?: number,
        public theme?: object
    ) { }
}