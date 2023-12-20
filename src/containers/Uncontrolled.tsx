import { useRef, useState } from 'react';
import { useAppDispatch } from '../store';
import { useAppSelector } from '../store';
import { validationShema } from '../validation/validationSchema';
import { ValidationError } from 'yup';
import { fileConverter } from '../helpers/fileConverter';
import { useNavigate } from 'react-router';
import { setData } from '../store/reducers/formDataSlice';
import { Form } from '../types/types';

const Uncontrolled = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const genderMaleRef = useRef<HTMLInputElement>(null);
  const genderFemaleRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { countries } = useAppSelector((store) => store.CountriesListSlice);

  const [errors, setErrors] = useState<Errors>({});
  const [isDisable, setIsDisable] = useState(true);

  const dispatch = useAppDispatch();

  interface Errors {
    name?: string;
    age?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
    country?: string;
    gender?: string;
    terms?: string;
    img?: string;
  }

  async function validateData(data: Form) {
    try {
      validationShema.validateSync(data, { abortEarly: false });
      return true;
    } catch (error) {
      if (error instanceof ValidationError) {
        const validationErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (typeof err.path === 'string' && !validationErrors[err.path]) {
            validationErrors[err.path] = err.message;
          }
        });
        setErrors(validationErrors);
        return false;
      }
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data: Form = {
      terms: termsRef.current?.checked,
      age: Number(ageRef.current?.value),
      passwordConfirm: passwordConfirmRef.current?.value,
      country: countryRef.current?.value,
      email: emailRef.current?.value,
      gender: genderMaleRef.current?.checked
        ? 'male'
        : genderFemaleRef.current?.checked
          ? 'female'
          : undefined,
      name: nameRef.current?.value,
      password: passwordRef.current?.value,
      img: imgRef.current?.files ? imgRef.current?.files[0] : undefined,
    };

    const isValidate = await validateData(data);

    if (isValidate && data.img) {
      const base64Image = await fileConverter(data.img as File);
      const newData = { ...data, img: base64Image };

      dispatch(setData(newData));
      navigate('/');
    } else setIsDisable(true);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && imgRef.current) {
      imgRef.current.files = event.target.files;
      console.log(imgRef.current.files);
    }
  };

  const isButtonActive = async (inputName: string) => {
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[inputName as keyof Errors];
      return updatedErrors;
    });
    if (
      nameRef.current?.value &&
      ageRef.current?.value &&
      (genderMaleRef.current?.checked || genderFemaleRef.current?.checked) &&
      countryRef.current?.value &&
      imgRef.current?.value &&
      emailRef.current?.value &&
      passwordRef.current?.value &&
      passwordConfirmRef.current?.value &&
      termsRef.current?.checked
    ) {
      setIsDisable(false);
    } else setIsDisable(true);
  };

  return (
    <div className="form-container">
      <p>Uncontrolled form without &quot;React Hook Form&quot;</p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            onChange={() => isButtonActive('name')}
            ref={nameRef}
            type="text"
            id="name"
          />
          <div className="error-container">
            <p className={`error-message ${errors.name && 'show-error'}`}>
              {errors.name && errors.name}
            </p>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="age">Age</label>
          <input
            onChange={() => isButtonActive('age')}
            ref={ageRef}
            type="number"
            id="age"
          />
          <div className="error-container">
            <p className={`error-message ${errors.age && 'show-error'}`}>
              {errors.age && errors.age}
            </p>
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={() => isButtonActive('email')}
            ref={emailRef}
            id="email"
          />
          <div className="error-container">
            <p className={`error-message ${errors.email && 'show-error'}`}>
              {errors.email && errors.email}
            </p>
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={() => isButtonActive('password')}
            ref={passwordRef}
            type="password"
            id="password"
          />
          <div className="error-container">
            <p className={`error-message ${errors.password && 'show-error'}`}>
              {errors.password && errors.password}
            </p>
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="password2">Repeat password</label>
          <input
            onChange={() => isButtonActive('passwordConfirm')}
            ref={passwordConfirmRef}
            type="password"
            id="password-confirm"
          />
          <div className="error-container">
            <p
              className={`error-message ${
                errors.passwordConfirm && 'show-error'
              }`}
            >
              {errors.passwordConfirm && errors.passwordConfirm}
            </p>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="country">Country</label>
          <input
            onChange={() => isButtonActive('country')}
            ref={countryRef}
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
              {errors.country && errors.country}
            </p>
          </div>
        </div>

        <div className="flex-new-line"></div>

        <div className="input-group">
          <p>Gender</p>
          <div className="radio-gender">
            <label htmlFor="male">Male</label>
            <input
              onChange={() => isButtonActive('gender')}
              ref={genderMaleRef}
              type="radio"
              id="male"
              name="gender"
              value="male"
            />
            <label htmlFor="female">Female</label>
            <input
              onChange={() => isButtonActive('')}
              ref={genderFemaleRef}
              type="radio"
              id="female"
              name="gender"
              value="female"
            />
          </div>
          <div className="error-container">
            <p className={`error-message ${errors.gender && 'show-error'}`}>
              {errors.gender && errors.gender}
            </p>
          </div>
        </div>

        <div className="flex-new-line"></div>

        <div className="input-group">
          <label htmlFor="img">Image</label>
          <input
            className="image-input"
            ref={imgRef}
            type="file"
            id="img"
            onChange={(e) => {
              handleFileChange(e);
              isButtonActive('img');
            }}
          />
          <div className="error-container">
            <p className={`error-message ${errors.img && 'show-error'}`}>
              {errors.img && errors.img}
            </p>
          </div>
        </div>

        <div className="input-group w100">
          <div className="check-terms">
            <label htmlFor="terms">I accept the terms</label>
            <input
              onChange={() => isButtonActive('terms')}
              ref={termsRef}
              type="checkbox"
              id="terms"
              name="terms"
            />
            <div className="error-container">
              <p className={`error-message ${errors.terms && 'show-error'}`}>
                {errors.terms && errors.terms}
              </p>
            </div>
          </div>
        </div>

        <button disabled={isDisable} className="submit-button">
          Submit
        </button>
        <p className="disable-button-text">
          {isDisable ? 'fill all fields, please' : ''}
        </p>
      </form>
    </div>
  );
};

export default Uncontrolled;
