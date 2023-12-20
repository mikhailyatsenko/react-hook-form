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
import { Form } from '../types/types';

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
    formState: { errors, isValid },
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
    <div className="form-container">
      <p>Controlled form with &quot;React Hook Form&quot;</p>
      <FormProvider {...form}>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <FormField
            labelText={'Name'}
            name="name"
            type="text"
            error={errors.name?.message}
          />
          <FormField
            labelText={'Age'}
            name="age"
            type="number"
            error={errors.age?.message}
          />
          <FormField
            labelText={'Email'}
            name="email"
            type="email"
            error={errors.email?.message}
          />
          <FormField
            labelText={'Password'}
            name="password"
            type="password"
            error={errors.password?.message}
          />
          <FormField
            labelText={'Repeat password'}
            name="passwordConfirm"
            type="password"
            error={errors.passwordConfirm?.message}
          />

          <div className="input-group">
            <label htmlFor="country">Country</label>
            <input
              {...register('country')}
              list="countries"
              name="country"
              id="country"
            />
            <datalist id="countries">
              {countries.map((country, index) => {
                return (
                  <option key={index} value={country}>
                    {country}
                  </option>
                );
              })}
            </datalist>

            <div className="error-container">
              <p className={`error-message ${errors.country && 'show-error'}`}>
                {errors.country?.message && errors.country.message}
              </p>
            </div>
          </div>

          <div className="input-group w100">
            <p>Gender</p>
            <div className="radio-gender">
              <FormField
                labelText={'Male'}
                name="gender"
                type="radio"
                value="male"
              />
              <FormField
                labelText={'Female'}
                name="gender"
                type="radio"
                value="female"
              />
            </div>
            <div className="error-container">
              <p
                className={`error-message ${
                  errors.gender?.message && 'show-error'
                }`}
              >
                {errors.gender?.message && errors.gender?.message}
              </p>
            </div>
          </div>
          <div className="flex-new-line"></div>

          <div className="input-group">
            <label htmlFor="img">Image</label>
            <input
              className="flex-self-center"
              type="file"
              id="img"
              onChange={(e) => handleFileChange(e)}
            />

            <div className="error-container">
              <p className={`error-message ${errors.img && 'show-error'}`}>
                {errors.img?.message && errors.img.message}
              </p>
            </div>
          </div>

          {/* <label htmlFor="country">Country</label>
          <select {...register('country')} name="country" id="country">
            {countries.map((country, index) => {
              return (
                <option key={index} value={country}>
                  {country}
                </option>
              );
            })}
          </select>
          <p>{errors.country?.message}</p> */}
          {/* <div className="check-terms">
            <FormField labelText={}
              name="terms"
              type="checkbox"
              value="I accept the terms
              "
              error={errors.terms?.message}
            />
          </div> */}
          <div className="flex-new-line"></div>

          <div className="input-group">
            <div className="check-terms">
              <label htmlFor="terms">I accept the terms</label>
              <input
                {...register('terms')}
                type="checkbox"
                id="terms"
                name="terms"
              />
              <div className="error-container">
                <p className={`error-message ${errors.terms && 'show-error'}`}>
                  {errors.terms?.message && errors.terms?.message}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-new-line"></div>

          <button disabled={!isValid} className="submit-button">
            Submit
          </button>
          <p className="disable-button-text">
            {isValid ? '' : 'fill all fields, please'}
          </p>
        </form>
      </FormProvider>
    </div>
  );
};

export default Controlled;
