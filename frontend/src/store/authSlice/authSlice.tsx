import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';


interface AuthState {
    auth: boolean;
    username: null | string;
    email: null | string;
    password: string;
    token: string  | null;
    avatar: string | null;
    auctionId: string | null;
    favorites:string | null;
    newBidPrice:string | null;
    walletId:string | null;
    // bidder: string | null
}

const initialState: AuthState = {
    auth: JSON.parse(localStorage.getItem("auth") || "false"),
    username: localStorage.getItem("username") || null,
    email: localStorage.getItem("email") || null,
    token: localStorage.getItem("token") || null, 
    password:"",
    avatar:localStorage.getItem("avatar" )|| null,
    auctionId: localStorage.getItem("auctionId" ) || null,
    favorites:localStorage.getItem("favorites") || null,
    newBidPrice: localStorage.getItem("newBidPrice") || null,
    walletId:localStorage.getItem("walletId" ) || null,
    // bidder: localStorage.getItem("bidder") || null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.auth = action.payload;
            // localStorage
            localStorage.setItem("auth", JSON.stringify(action.payload));
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem("token", JSON.stringify(action.payload));
        },
        setUser: (state, action: PayloadAction<{ username: string; email: string, password:string }>) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            localStorage.setItem("username", action.payload.username);
            localStorage.setItem("email", action.payload.email);
        },
        setLoginUser: (state, action: PayloadAction<{ password: string; email: string, username:string, avatar:string }>) => {
            state.password = action.payload.password;
            state.email = action.payload.email;
            localStorage.setItem("email", action.payload.email);
            localStorage.setItem("username", action.payload.username);
            localStorage.setItem("avatar", action.payload.avatar);
          
        },
        logout: (state) => {
            state.auth = false;
            state.username = null;
            state.email = null;
            localStorage.removeItem("auth");
            localStorage.removeItem("username");
            localStorage.removeItem("email");
            localStorage.removeItem("token");
            localStorage.removeItem("auctionId");
            localStorage.removeItem("favorites");
            localStorage.removeItem("newBidPrice");
            localStorage.removeItem("walletId");
            localStorage.removeItem("userId");
            localStorage.removeItem("bidder");
         
        }
    },
});

export const { setAuth, setToken, setUser, logout, setLoginUser } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth.auth;
export const selectUser = (state: RootState) => ({ username: state.auth.username, email: state.auth.email });
export default authSlice.reducer;
