export interface AuthResponse{
    ok       : boolean;
    uid?     : string;
    nameUser?: string;
    token?   : string;
    msg?     : string;
    email?   : string;

}
export interface Usuario{
    uid     : string;
    nameUser: string;
    email   : string;
}