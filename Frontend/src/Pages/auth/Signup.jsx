import React,{useState,useContext} from "react";
import {FaEye,FaEyeSlash} from "react-icons/fa";
import toast from "react-hot-toast";
import { registerUser } from "../../services/authServices";
import { AuthContext } from "../../context/AuthProvider";
 



const Signup = () => {
    const {logout}=useContext(AuthContext)

    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    console.log("showpassword",showPassword);
    const [formData,setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: ""
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    console.log("formData",formData);

    function resetForm() {
        setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: ""
        });
    }

    function validateForm() {

        const values = Object.values(formData);

        const isEmpty = values.some(
            (value) => value.trim() === ""
        );

        if (isEmpty) {
            toast.error("Please fill in all fields");
            return false;
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return false;
        }

        return true;
    }

    async function handleSubmit(e) {

        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const {confirmPassword,...payload} = formData;

        const result = await registerUser(payload);

        // SUCCESS
        if (result.success) {

            toast.success("User registered successfully");

            resetForm();

            return;
        }

        // NETWORK ERROR
        if (result.status === null) {

            toast.error(result.error);

            return;
        }

        // BACKEND VALIDATION ERROR
        if (result.status === 400) {

            const firstError =
                Object.values(result.data)[0][0];
                resetForm();

            toast.error(firstError);

            return;
        }

        // SERVER ERROR
        if (result.status >= 500) {

            toast.error(
                "Something went wrong on the server."
            );

            return;
        }

        // OTHER ERROR
        toast.error(
            "Something went wrong. Please try again."
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Signup Form
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-2"
                >

                    {/* Username */}

                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        />

                    </div>


                    {/* Email */}

                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        />

                    </div>


                    {/* Password */}

                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>

                        <div className="relative">

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>

                        </div>

                    </div>


                    {/* Confirm Password */}

                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>

                        <div className="relative">

                            <input
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showConfirmPassword
                                    ? <FaEyeSlash />
                                    : <FaEye />
                                }
                            </button>

                        </div>

                    </div>


                    {/* Role */}

                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Role
                        </label>

                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        >

                            <option value="">
                                Select Role
                            </option>

                            <option value="Donor">
                                Donor
                            </option>

                            <option value="Receiver">
                                Receiver
                            </option>

                            <option value="Rider">
                                Rider
                            </option>

                        </select>

                    </div>


                    {/* Submit */}

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                    >
                        Signup
                    </button>

                </form>

            </div>
            <button onClick={logout}>Logout</button>

        </div>
    );
};

export default Signup;