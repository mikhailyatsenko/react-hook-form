import { useForm } from 'react-hook-form';

type Form = {
  name: string;
  age: string;
  email: string;
  password: string;
  passwordConfirm: string;
  country: string;
  gender: string;
  terms: string;
  //   img:
};

const Controlled = () => {
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm<Form>({ mode: 'onChange', resolver: undefined });

  //   const onSubmit: SubmitHandler<Form> = (data) => console.log(data);

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <label htmlFor="name">Name</label>
        <input {...register('name')} type="text" id="name" />
        <p>Error</p>
        <label htmlFor="age">Age</label>
        <input {...register('age')} type="text" id="age" />
        <p>Error</p>
        <label htmlFor="email">Email</label>
        <input {...register('email')} id="email" />
        <p>Error</p>
        <label htmlFor="pass1">Password</label>
        <input {...register('password')} type="password" id="pass1" />
        <p>Error</p>
        <label htmlFor="pass2">Repeat password</label>
        <input {...register('passwordConfirm')} type="password" id="pass2" />
        <p>Error</p>
        <label htmlFor="country">Country</label>
        <select {...register('country')} name="country" id="country">
          <option value="ua">Ukraine</option>
          <option value="de">Deutschland</option>
          <option value="ru">Russia</option>
          <option value="fr">France</option>
        </select>
        <p>Error</p>

        <p>Gender</p>
        <div>
          <div>
            <label htmlFor="male">Male</label>
            <input
              {...register('gender')}
              type="radio"
              id="male"
              name="gender"
              value="male"
            />
          </div>
          <div>
            <label htmlFor="female">Female</label>
            <input
              {...register('gender')}
              type="radio"
              id="female"
              name="gender"
              value="female"
            />
          </div>
        </div>

        <p>I accept the terms</p>
        <div>
          <div>
            <label htmlFor="terms_yes">Yes</label>

            <input
              {...register('terms')}
              type="checkbox"
              id="terms"
              name="terms"
            />
          </div>
        </div>

        <label htmlFor="image">Image</label>
        <input type="file" id="image" />

        <button>Submit</button>
      </form>
    </div>
  );
};

export default Controlled;
