export interface AuthResponse {
}
export interface LoginResponse {
    success: boolean;
    message: string;
    token: string;
    user: {
      userName: string;
      email: string;
     
    };
}
export interface signupResponse {
    success: boolean;
    message: string;

}
export interface userData{

    userName: string;
    email: string;
   

}