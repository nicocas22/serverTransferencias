

export interface IUser {
   readonly name: string;
   readonly lastName: string;
   readonly email: string;
   readonly account: number;
   readonly bank: number;
   readonly password?: string ;
   readonly rut: number; 
}