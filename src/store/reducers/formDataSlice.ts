import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  name: string;
  age: number | undefined;
  email: string;
  password: string;
  passwordConfirm: string;
  country: string;
  gender: string;
  terms: boolean;
  img: string;
}

const initialState: InitialState = {
  name: '',
  age: undefined,
  email: '',
  password: '',
  passwordConfirm: '',
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
      console.log('state', state);
    },
  },
});

export default dataSlice.reducer;
export const { setData } = dataSlice.actions;
