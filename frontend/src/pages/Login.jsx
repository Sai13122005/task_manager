import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import API from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post(
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                res.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            alert("Login successful");

            navigate("/");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

   return (

    <div className="container mt-5">

        <div className="row justify-content-center">

            <div className="col-md-5">

                <div className="card shadow p-4">

                    <h2 className="text-center mb-4">
                        Login
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="form-control mb-3"
                            onChange={handleChange}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="form-control mb-3"
                            onChange={handleChange}
                        />

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            Login
                        </button>

                        <p className="mt-3 text-center">
                            Don't have an account?{" "}
                            <Link to="/register">
                                Register
                            </Link>
                        </p>

                    </form>

                </div>

            </div>

        </div>

    </div>
);
}

export default Login;