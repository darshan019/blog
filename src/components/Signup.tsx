import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SignupData {
  username: string;
  password: string;
  confirm: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState<SignupData>({
    username: "",
    password: "",
    confirm: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch("https://blog-api-31o3.onrender.com/sign-up", {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify(signupData),
    }).then((resp) => {
      if (!resp.ok) {
        throw new Error("A network error occured");
      }
    });
    navigate("/login");
  }

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="container-xxl my-5 justify-content-center align-items-center"
    >
      <div className="mb-3 row align-items-center">
        <label htmlFor="username" className="fw-semibold fw-2 form-label">
          User Name
        </label>
        <input
          type="text"
          className="form-control"
          name="username"
          onChange={handleChange}
          value={signupData.username}
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
          value={signupData.password}
          id="password"
          onChange={handleChange}
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
          onChange={handleChange}
          value={signupData.confirm}
        />
        {signupData.password != signupData.confirm ? (
          <span className="text-bg-danger p-1 fs-6 fw-normal">
            Passwords doesn't match
          </span>
        ) : signupData.password !== "" && signupData.confirm !== "" ? (
          <span className="text-bg-success p-1 fs-6 fw-normal">
            Passwords match
          </span>
        ) : (
          <span className="text-bg-info p-1 fs-6 fw-normal">
            This is to check if password matches
          </span>
        )}
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
