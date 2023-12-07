import { createSlice } from '@reduxjs/toolkit';
import countriesList from '../../countriesList';

interface InitialState {
  countries: string[];
}

const initialState: InitialState = {
  countries: countriesList(),
};

export const CountriesListSlice = createSlice({
  name: 'CountriesListData',
  initialState,
  reducers: {},
});

export default CountriesListSlice.reducer;
// export const { setData } = dataSlice.actions;
