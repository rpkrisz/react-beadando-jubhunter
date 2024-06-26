import { createSlice } from "@reduxjs/toolkit";
import { jobApiSlice } from "./jobApiSlice";

export const jobSlice = createSlice({
    name: "job",
    initialState: {
        jobs: [],
        total: 0,
        pageCount: 1,
        filter:
        {
            limit: 10,
            skip: 0,
        }
    },
    reducers: {
        changePageTo: (state, { payload }) => {
            const skip = (payload - 1) * Number(state.filter.limit);
            state.filter = { ...state.filter, skip: skip };
        },
        setFilter: (state, { payload }) => {
            state.filter = { ...payload };
        },

    },
    extraReducers: (builder) => {
        builder
            .addMatcher(jobApiSlice.endpoints.getJobs.matchFulfilled, (state, { payload }) => {
                state.jobs = payload.data;
                state.total = payload.total
                state.filter.limit = payload.limit
                state.filter.skip = payload.skip
                state.pageCount = Math.ceil(Number(payload.total) / Number(payload.limit))
            })
    },
    selectors: {
        selectJobs: (state) => state.jobs,
        selectTotal: (state) => state.total,
        selectFilter: (state) => state.filter,
        selectPageCount: (state) => state.pageCount,
    },
})

export const { changePageTo, setFilter } = jobSlice.actions;

export const { selectJobs, selectTotal, selectFilter, selectPageCount } = jobSlice.selectors;
