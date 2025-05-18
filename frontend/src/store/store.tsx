import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice/authSlice';
import profileReducer from './authSlice/profileSlice'
import { apiAuthSlice } from './api/authApi';
import peopleReducer from './peopleCategorySlice/peopleCategorySlice';
import { apiProfileSlice } from './api/profileApi';
// import { apiNftSlice } from './api/AddNfts';


const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiProfileSlice.reducerPath]: apiProfileSlice.reducer,
        profile: profileReducer,
        [apiAuthSlice.reducerPath]: apiAuthSlice.reducer,
        // [apiNftSlice.reducerPath]: apiNftSlice.reducer,
        people: peopleReducer, // peopleReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiAuthSlice.middleware, apiProfileSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
