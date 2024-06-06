import { configureStore } from "@reduxjs/toolkit"
import { jobApiSlice } from "./jobApiSlice.js";
import { applicantApiSlice } from "./applicantApiSlice.js";
import { experienceApiSlice } from "./experienceApiSlice.js";
import { authApiSlice } from "./authApiSlice.js";
import { authSlice } from "./authSlice.js";


export const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [authApiSlice.reducerPath]: authApiSlice.reducer,
        [applicantApiSlice.reducerPath]: applicantApiSlice.reducer,
        [jobApiSlice.reducerPath]: jobApiSlice.reducer,
        [experienceApiSlice.reducerPath]: experienceApiSlice.reducer,

    },
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware()
            .concat(applicantApiSlice.middleware)
            .concat(authApiSlice.middleware)
            .concat(jobApiSlice.middleware)
            .concat(experienceApiSlice.middleware)
    )
})
