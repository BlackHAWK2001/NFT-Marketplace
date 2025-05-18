import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store";
import { apiProfileSlice } from "../api/profileApi"; 
import { IProfile } from "../../types/profileType";
import { data } from "react-router";


export interface ProfileState {
    data: { 
      _id: string;
      username: string;
      email: string;
      password: string;
      profileImage: string;
      dateJoined: string;
      nftLikes: any[];
      walletTransfers: any[];
      auctionBids: any[];
      __v: number;
    } | null; 
    _id: string;
    username: string;
    email: string;
    password: string;
    profileImage: string;
    dateJoined: string;
    nftLikes: any[];
    walletTransfers: any[];
    auctionBids: any[];
    __v: number;
    pending:boolean;
    error: boolean
  }
  
  
  // Set the initial state
  const initialState: ProfileState = {
    data: null,
    _id: '',
    username: '',
    email: '',
    password: '',
    profileImage: '',
    dateJoined: '',
    nftLikes: [],
    walletTransfers: [],
    auctionBids: [],
    __v: 0,
    pending:true,
    error:false
  };
  
  
  const profileSlice = createSlice({
    name: 'profile', // This key will be used in the store (e.g., state.profile)
    initialState,
    reducers: {
      // Add any synchronous actions here if needed
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            apiProfileSlice.endpoints.getProfile.matchPending,
            (state, action) => {
              state.pending = true;
              state.error=false
              console.log("pending")
            }
          );
        builder.addMatcher(
          apiProfileSlice.endpoints.getProfile.matchFulfilled,
          (state, action) => {
            state.data = action.payload;
            state.pending =false;
            state.error =false;
            localStorage.setItem("avatar",  action.payload.profileImage )
            localStorage.setItem("username",  action.payload.username )
            localStorage.setItem("password",  action.payload.password )
            console.log("Data from API:", action.payload);
          }
        );
        builder.addMatcher(
            apiProfileSlice.endpoints.getProfile.matchRejected,
            (state, action) => {
              state.pending = false;
              state.error =true
            }
          );
      },
      
  });
  
  export const selectProfile = (state: RootState) => state.profile;

  // Export the reducer as the default export
  export default profileSlice.reducer;