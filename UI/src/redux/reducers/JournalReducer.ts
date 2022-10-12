import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAccounts, AccountResult } from './JournalApi';

// Requesting all employees, with loading state, and only one request at a time

interface AccountsState {
    accounts: AccountResult;
    loading: 'idle' | 'pending';
    error: string | null;
}

const initialState: AccountsState = {
    accounts: {} as AccountResult,
    loading: 'idle',
    error: null,
};

export const fetchEmployees = createAsyncThunk(
    'accounts/fetch',
    async (_, thunkAPI) => {
        const response = await getAccounts();
        return response;
    }
)

export const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending';
                }
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                if (state.loading === 'pending') {
                    state.loading = 'idle';
                }
                state.accounts = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                if (state.loading === 'pending') {
                    state.loading = 'idle';
                    state.error = action.error.message || null;
                }
            });
    },
});