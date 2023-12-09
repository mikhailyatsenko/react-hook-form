import { useAppSelector } from '../store';

const Main = () => {
  const { data } = useAppSelector((state) => state.formDataReducer);
  return (
    <>
      {data.map((el, index) => (
        <p key={index}>Email - {el.email}</p>
      ))}
    </>
  );
};

export default Main;
