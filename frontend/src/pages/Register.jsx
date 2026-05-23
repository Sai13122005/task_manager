import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";    

import API from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
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
                "/auth/register",
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

            alert("Registration successful");

            navigate("/");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

   return (

    <div className="auth-container">

        <div className="card-dark auth-card">

            <h1 className="text-center mb-4">
                Create Account
            </h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

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
                    className="btn btn-success btn-modern w-100"
                >
                    Register
                </button>

                <p className="text-center mt-4">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="link-light"
                    >
                        Login
                    </Link>

                </p>

            </form>

        </div>

    </div>
);
}

export default Register;