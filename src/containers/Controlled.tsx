import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler } from 'react-hook-form';
import { fileConverter } from '../helpers/fileConverter';
import { validationShema } from '../validation/validationSchema';
import { useAppDispatch } from '../store';
import { useAppSelector } from '../store';
import { setData } from '../store/reducers/formDataSlice';
import FormField from '../components/FormField';
import { useNavigate } from 'react-router';

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
  const navigate = useNavigate();

  const form = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationShema),
  });

  const {
    handleSubmit,
    register,
    trigger,
    setValue,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<Form> = async (data) => {
    if (data.img instanceof File) {
      const base64Image = await fileConverter(data.img);

      const dataWithBase64Img = { ...data, img: base64Image };
      dispatch(setData(dataWithBase64Img));
      navigate('/');
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
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField name="name" type="text" error={errors.name?.message} />
          <FormField name="age" type="number" error={errors.age?.message} />
          <FormField name="email" type="email" error={errors.email?.message} />
          <FormField
            name="password"
            type="password"
            error={errors.password?.message}
          />
          <FormField
            name="passwordConfirm"
            type="password"
            error={errors.passwordConfirm?.message}
          />

          <p>Gender</p>
          <div>
            <FormField name="gender" type="radio" value="male" />
            <FormField name="gender" type="radio" value="female" />
          </div>
          <p>{errors.gender?.message}</p>

          <FormField
            name="terms"
            type="checkbox"
            error={errors.terms?.message}
          />

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
          <p>{errors.country?.message}</p>

          <button>Submit</button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Controlled;
