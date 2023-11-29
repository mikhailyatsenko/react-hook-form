const Controlled = () => {
  return (
    <div>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
        <p>Error</p>
        <label htmlFor="age">Age</label>
        <input type="text" id="age" />
        <p>Error</p>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
        <p>Error</p>
        <label htmlFor="pass1">Password</label>
        <input type="password" id="pass1" />
        <p>Error</p>
        <label htmlFor="pass2">Repeat password</label>
        <input type="password" id="pass2" />
        <p>Error</p>

        <label htmlFor="country">Country</label>
        <input type="text" id="country" />
        <p>Error</p>

        <p>Gender</p>
        <div>
          <div>
            <label htmlFor="male">Male</label>
            <input type="radio" id="male" name="gender" value="male" />
          </div>
          <div>
            <label htmlFor="female">Female</label>
            <input type="radio" id="female" name="gender" value="female" />
          </div>
        </div>

        <p>I accept the terms</p>
        <div>
          <div>
            <label htmlFor="terms_yes">Yes</label>

            <input type="radio" id="terms_yes" name="terms" value="yes" />
          </div>
          <div>
            <label htmlFor="terms_no">No</label>
            <input type="radio" id="terms_no" name="terms" value="no" />
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
