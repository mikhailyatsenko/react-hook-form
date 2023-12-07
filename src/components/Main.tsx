import { useAppSelector } from '../store';

const Main = () => {
  const data = useAppSelector((state) => state.formDataReducer);
  console.log(data);
  return (
    <>
      {Object.keys(data).map((el, index) => (
        <p key={index}>
          {el} - {data && data[el]}
        </p>
      ))}
    </>
  );
};

export default Main;
