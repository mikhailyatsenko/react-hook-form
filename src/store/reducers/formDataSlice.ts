import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  name: string | undefined;
  age: number | undefined;
  email: string | undefined;
  password: string | undefined;
  passwordConfirm: string | undefined;
  country: string | undefined;
  gender: string | undefined;
  terms: boolean | undefined;
  img: string;
}

type InitialState = { data: FormData[] };

const initialState: InitialState = { data: [] };

export const dataSlice = createSlice({
  name: 'FormData',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<FormData>) {
      state.data.push(action.payload);
    },
  },
});

export default dataSlice.reducer;
export const { setData } = dataSlice.actions;
