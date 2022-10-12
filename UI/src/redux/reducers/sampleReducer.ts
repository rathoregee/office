import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getEmployees, Employee } from './sampleApi';

// Requesting all employees, with loading state, and only one request at a time

interface EmployeesState {
    employees: Employee[];
    loading: 'idle' | 'pending';
    error: string | null;
}

const initialState: EmployeesState = {
    employees: [] as Employee[],
    loading: 'idle',
    error: null,
};

export const fetchEmployees = createAsyncThunk(
    'employees/fetch',
    async (_, thunkAPI) => {
        const response = await getEmployees();
        return response.employees;
    }
)

export const employeesSlice = createSlice({
    name: 'employees',
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
                state.employees = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                if (state.loading === 'pending') {
                    state.loading = 'idle';
                    state.error = action.error.message || null;
                }
            });
    },
});