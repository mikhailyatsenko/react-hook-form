import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler } from 'react-hook-form';
import { fileConverter } from '../helpers/fileConverter';
import { validationShema } from '../validation/validationSchema';
import { useAppDispatch } from '../store';
import { useAppSelector } from '../store';
import { setData } from '../store/reducers/formDataSlice';

interface Form {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordConfirm: string;
  country: string;
  gender: string;
  terms: boolean;
  img?: unknown | File;
}

// interface FormWithBase64Img extends Form {
//   img: string;
// }

const Controlled = () => {
  const { countries } = useAppSelector((store) => store.CountriesListSlice);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationShema),
  });

  const onSubmit: SubmitHandler<Form> = async (data) => {
    if (data.img instanceof File) {
      const base64Image = await fileConverter(data.img);

      const dataWithBase64Img = { ...data, img: base64Image };
      dispatch(setData(dataWithBase64Img));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] instanceof File) {
      const file = event.target.files[0];
      setValue('img', file);
      trigger('img');
    }
  };

  return (
    <div>
      <p>controlled</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input {...register('name')} type="text" id="name" />
        <p>{errors.name?.message}</p>
        <label htmlFor="age">Age</label>
        <input {...register('age')} type="number" id="age" />
        <p>{errors.age?.message}</p>
        <label htmlFor="email">Email</label>
        <input {...register('email')} id="email" />
        <p>{errors.email?.message}</p>
        <label htmlFor="password">Password</label>
        <input {...register('password')} type="password" id="password" />
        <p>
          {errors.password?.message
            ? 'Password should contain at least one digit, one lowercase letter, one uppercase letter and special character'
            : ''}
        </p>
        <label htmlFor="password2">Repeat password</label>

        <input
          {...register('passwordConfirm')}
          type="password"
          id="password-comfirm"
        />
        <p>{errors.passwordConfirm?.message}</p>

        <p>Gender</p>
        <div>
          <label htmlFor="male">Male</label>
          <input
            {...register('gender')}
            type="radio"
            id="male"
            name="gender"
            value="male"
          />
          <label htmlFor="female">Female</label>
          <input
            {...register('gender')}
            type="radio"
            id="female"
            name="gender"
            value="female"
          />
        </div>
        <p>{errors.gender?.message}</p>

        <div>
          <label htmlFor="terms">I accept the terms</label>
          <input
            {...register('terms')}
            type="checkbox"
            id="terms"
            name="terms"
          />
        </div>
        <p>{errors.terms?.message}</p>

        <label htmlFor="image">Image</label>
        <input type="file" id="image" onChange={(e) => handleFileChange(e)} />
        <p>{errors.img?.message}</p>

        <label htmlFor="country">Country</label>
        <select {...register('country')} name="country" id="country">
          {countries.map((country, index) => {
            return (
              <option key={index} value={country}>
                {country}
              </option>
            );
          })}
        </select>
        {/* <p>Error</p> */}

        <button>Submit</button>
      </form>
    </div>
  );
};

export default Controlled;
