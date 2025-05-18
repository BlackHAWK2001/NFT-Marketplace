// import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
// import { IAddNft } from "../../types/NftType";

// export const backendURL = "https://nft-market-as0q.onrender.com";


// const baseQuery = fetchBaseQuery({
//     baseUrl: `${backendURL}/nfts`,
//     prepareHeaders: (headers) => {
//         const token = localStorage.getItem("token");

// console.log("authorization")
//         if (token) {
//             headers.set("authorization", `Bearer ${token}`);
//         }

//         return headers;
//     }
// });

// const fetchBaseWithRetry = retry(baseQuery, { maxRetries: 1 });

// export const apiNftSlice = createApi({
//     reducerPath: "addNftApi",
//     baseQuery: fetchBaseWithRetry, 
//     endpoints: (builder) => ({
//         postAddNft: builder.mutation<IAddNft, IAddNft >({
//             query: (formData) => ({
//                 url: "/",
//                 method: "POST",
//                 body: formData,
//             })
//         }),
//     })
// });

// export const {
// usePostAddNftMutation
// } = apiNftSlice;
