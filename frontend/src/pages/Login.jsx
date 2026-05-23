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

    <div className="auth-container">

        <div className="card-dark auth-card">

            <h1 className="text-center mb-4">
                Welcome Back
            </h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    className="form-control mb-4"
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-modern w-100"
                >
                    Login
                </button>

                <p className="text-center mt-4">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="link-light"
                    >
                        Register
                    </Link>

                </p>

            </form>

        </div>

    </div>
);
}

export default Login;