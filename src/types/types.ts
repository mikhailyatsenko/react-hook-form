export interface Form {
  name: string | undefined;
  age: number | undefined;
  email: string | undefined;
  password: string | undefined;
  passwordConfirm: string | undefined;
  country: string | undefined;
  gender: string | undefined;
  terms: boolean | undefined;
  img: File | unknown;
}

export interface SubmitForm extends Form {
  img: string;
}
