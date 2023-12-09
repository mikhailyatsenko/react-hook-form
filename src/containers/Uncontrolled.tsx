import { useRef, useState } from 'react';
import { useAppDispatch } from '../store';
import { useAppSelector } from '../store';
import { validationShema } from '../validation/validationSchema';
import { ValidationError } from 'yup';
import { fileConverter } from '../helpers/fileConverter';
import { useNavigate } from 'react-router';
import { setData } from '../store/reducers/formDataSlice';

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

  const dispatch = useAppDispatch();

  interface Form {
    name: string | undefined;
    age: number | undefined;
    email: string | undefined;
    password: string | undefined;
    passwordConfirm: string | undefined;
    country: string | undefined;
    gender: string | undefined;
    terms: boolean | undefined;
    img: File | undefined;
  }

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
    console.log(data, isValidate);
    if (isValidate && data.img) {
      const base64Image = await fileConverter(data.img);
      const newData = { ...data, img: base64Image };

      dispatch(setData(newData));
      navigate('/');
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && imgRef.current) {
      imgRef.current.files = event.target.files;
      console.log(imgRef.current.files);
    }
  };

  return (
    <div>
      <p>uncontrolled</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input ref={nameRef} type="text" id="name" />
        {errors.name && <p>{errors.name}</p>}
        <label htmlFor="age">Age</label>
        <input ref={ageRef} type="number" id="age" />
        {errors.age && <p>{errors.age}</p>}
        <label htmlFor="email">Email</label>
        <input ref={emailRef} id="email" />
        {errors.email && <p>{errors.email}</p>}
        <label htmlFor="password">Password</label>
        <input ref={passwordRef} type="password" id="password" />
        {errors.password && <p>{errors.password}</p>}
        <label htmlFor="password2">Repeat password</label>

        <input ref={passwordConfirmRef} type="password" id="password-confirm" />
        {errors.passwordConfirm && <p>{errors.passwordConfirm}</p>}

        <p>Gender</p>
        <div>
          <label htmlFor="male">Male</label>
          <input
            ref={genderMaleRef}
            type="radio"
            id="male"
            name="gender"
            value="male"
          />
          <label htmlFor="female">Female</label>
          <input
            ref={genderFemaleRef}
            type="radio"
            id="female"
            name="gender"
            value="female"
          />
        </div>
        {errors.gender && <p>{errors.gender}</p>}

        <div>
          <label htmlFor="terms">I accept the terms</label>
          <input ref={termsRef} type="checkbox" id="terms" name="terms" />
        </div>
        {errors.terms && <p>{errors.terms}</p>}

        <label htmlFor="image">Image</label>
        <input
          ref={imgRef}
          type="file"
          id="image"
          onChange={(e) => handleFileChange(e)}
        />
        {errors.img && <p>{errors.img}</p>}

        <label htmlFor="country">Country</label>
        <input ref={countryRef} list="countries" name="country" id="country" />
        <datalist id="countries">
          {countries.map((country, index) => {
            return (
              <option key={index} value={country}>
                {country}
              </option>
            );
          })}
        </datalist>

        {errors.country && <p>{errors.country}</p>}

        <button>Submit</button>
      </form>
    </div>
  );
};

export default Uncontrolled;
