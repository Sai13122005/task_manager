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

    <div className="container mt-5">

        <div className="row justify-content-center">

            <div className="col-md-5">

                <div className="card shadow p-4">

                    <h2 className="text-center mb-4">
                        Register
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="form-control mb-3"
                            onChange={handleChange}
                        />

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
                            className="btn btn-success w-100"
                        >
                            Register
                        </button>

                        <p className="mt-3 text-center">
                            Already have an account?{" "}
                            <Link to="/login">
                                Login
                            </Link>
                        </p>

                    </form>

                </div>

            </div>

        </div>

    </div>
);
}

export default Register;