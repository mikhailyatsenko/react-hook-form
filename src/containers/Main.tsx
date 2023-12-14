import { useAppSelector } from '../store';

const Main = () => {
  const { data } = useAppSelector((state) => state.formDataReducer);
  return (
    <div className="cards-list">
      {data.map((el, key) => (
        <div key={key} className="card-info">
          <div className="image-div">
            <img className="image" src={el.img} />
          </div>

          <div className="text-info">
            <p>
              <span>Name:</span> {el.name}
            </p>
            <p>
              <span>Email:</span> {el.email}
            </p>
            <p>
              <span>Age:</span> {el.age}
            </p>
            <p>
              <span>Gender:</span> {el.gender}
            </p>
            <p>
              <span>Country:</span> {el.country}
            </p>
          </div>
        </div>
      ))}
      {data.map((el, key) => (
        <div key={key} className="card-info">
          <div className="image-div">
            <img className="image" src={el.img} />
          </div>

          <div className="text-info">
            <p>
              <span>Name:</span> {el.name}
            </p>
            <p>
              <span>Email:</span> {el.email}
            </p>
            <p>
              <span>Age:</span> {el.age}
            </p>
            <p>
              <span>Gender:</span> {el.gender}
            </p>
            <p>
              <span>Country:</span> {el.country}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Main;
