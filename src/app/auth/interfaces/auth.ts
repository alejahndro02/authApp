export interface AuthResponse{
    ok       : boolean;
    uid?     : string;
    nameUser?: string;
    token?   : string;
    msg?     : string;
}