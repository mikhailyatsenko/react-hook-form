import { configureStore } from '@reduxjs/toolkit';
import formDataReducer from './reducers/formDataSlice';
import CountriesListSlice from './reducers/countriesSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: { formDataReducer, CountriesListSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
