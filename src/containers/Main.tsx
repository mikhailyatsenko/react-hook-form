import { useAppSelector } from '../store';
import { Link } from 'react-router-dom';

const Main = () => {
  const { data } = useAppSelector((state) => state.formDataReducer);
  const lastFormData = data.length - 1;
  return (
    <>
      {!data.length ? (
        <div className="no-data">
          <p>Here is place to show data list from submitted Forms.</p>
          <p>To view data please fill at least one Form.</p>
          <p>
            You can use{' '}
            <Link to="/controlled">
              <b>Controlled</b>
            </Link>{' '}
            or{' '}
            <Link to="/uncontrolled">
              <b>Unontrolled</b>
            </Link>{' '}
            Form.
          </p>
        </div>
      ) : (
        <div className="cards-list">
          {data.map((el, key) => (
            <div
              key={key}
              className={`card-info${lastFormData === key ? ' anim-card' : ''}`}
            >
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
      )}
    </>
  );
};

export default Main;
