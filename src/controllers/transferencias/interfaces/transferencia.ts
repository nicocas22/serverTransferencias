export interface ITransfer {
    readonly rutAddressee: string;
    readonly amount: number;
    readonly idSender: string;
    readonly date: Date;
}