import * as yup from 'yup';

const MAX_FILE_SIZE = 102400; //100KB

export const validationShema = yup.object({
  name: yup
    .string()
    .required('It is required field')
    .matches(/^[A-Z]/, 'Name should start with Uppercase'),
  age: yup
    .number()
    .required('Age is a required field')
    .typeError('Amount must be a number')
    .positive('Age must be a positive number')
    .integer('Age must be an integer'),
  email: yup.string().required('It is required field').email(),
  password: yup
    .string()
    .required('It is required field')
    .matches(
      /[0-9]/,
      'Password should contain at least one digit, one lowercase letter, one uppercase letter and special character'
    )
    .matches(
      /[a-z]/,
      'Password should contain at least one digit, one lowercase letter, one uppercase letter and special character'
    )
    .matches(
      /[A-Z]/,
      'Password should contain at least one digit, one lowercase letter, one uppercase letter and special character'
    )
    .matches(
      /[!@#$%^&*]/,
      'Password should contain at least one digit, one lowercase letter, one uppercase letter and special character'
    ),
  passwordConfirm: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords must match'),
  country: yup.string().required('It is required field'),
  gender: yup.string().required('It is required field'),
  terms: yup
    .boolean()
    .required('The terms and conditions must be accepted.')
    .oneOf([true], 'The terms and conditions must be accepted.'),
  img: yup
    .mixed()
    .required('It is a required field')
    .test('fileType', 'Please upload onli jpeg and png files', (value) => {
      return (
        !value || ['image/jpeg', 'image/png'].includes((value as File).type)
      );
    })
    .test('fileSize', 'File size is too large', (value) => {
      return !value || (value as File).size <= MAX_FILE_SIZE;
    }),
});
