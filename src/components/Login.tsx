import { useState } from "react";
import { useTokenUpdate } from "./Token";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  interface Data {
    username: string;
    password: string;
  }

  //const token = useToken();
  const setToken = useTokenUpdate();

  const [formData, setFormData] = useState<Data>({
    username: "",
    password: "",
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await fetch("https://blog-api-31o3.onrender.com/log-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("A network error occured");
        }
        return resp.json();
      })
      .then((data) => {
        if (setToken != null) setToken(data.accessToken);
      });
    navigate("/blog/");
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
          id="username"
          onChange={handleInputChange}
          value={formData.username}
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
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <button
        type="submit"
        className="btn fw-semibold fw-2 row align-items-center my-2 btn-primary"
      >
        Submit
      </button>
    </form>
  );
};

export default Login;
