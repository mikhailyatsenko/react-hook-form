import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  name: string;
  age: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  country: string;
  gender: string;
  terms: boolean;
  img: string;
}

const initialState: InitialState = {
  name: '',
  age: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  country: '',
  gender: '',
  terms: false,
  img: '',
};

export const dataSlice = createSlice({
  name: 'FormData',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<InitialState>) {
      state = action.payload;
    },
  },
});

export default dataSlice.reducer;
export const { setData } = dataSlice.actions;
