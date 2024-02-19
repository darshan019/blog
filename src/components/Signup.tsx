const Signup: React.FC = () => {
  return (
    <form className="container-xxl my-5 justify-content-center align-items-center">
      <div className="mb-3 row align-items-center">
        <label htmlFor="username" className="fw-semibold fw-2 form-label">
          User Name
        </label>
        <input
          type="text"
          className="form-control"
          name="username"
          id="username"
        />
      </div>
      <div className="mb-3 row align-items-center">
        <label htmlFor="password" className="fw-semibold fw-2 form-label">
          Password
        </label>
        <input
          className="form-control"
          type="password"
          name="password"
          id="password"
        />
      </div>
      <div className="mb-3 row align-items-center">
        <label htmlFor="confirm" className="fw-semibold fw-2 form-label">
          Confirm Password
        </label>
        <input
          className="form-control"
          type="password"
          name="confirm"
          id="confirm"
        />
      </div>
      <button
        type="submit"
        className="btn row fw-semibold fw-2 align-items-center my-2 btn-primary"
      >
        Sign-Up
      </button>
    </form>
  );
};

export default Signup;
