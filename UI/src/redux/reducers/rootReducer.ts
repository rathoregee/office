
import { combineReducers } from '@reduxjs/toolkit';

import { employeesSlice } from './sampleReducer'

import { accountsSlice } from './JournalReducer'

const rootReducer = combineReducers({
  employees: employeesSlice.reducer,
  accounts : accountsSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;