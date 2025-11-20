import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Smartphone, Lock, Building2 } from "lucide-react";
import AuthService from "../../api/AuthService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// ⚡ Zod Schema for validation - accepts email or mobile
const loginSchema = z.object({
  emailOrMobile: z.string().min(1, "Email or mobile number is required")
    .refine((value) => {
      // Check if it's a valid email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Check if it's a valid 10-digit mobile number
      const mobileRegex = /^[0-9]{10}$/;

      return emailRegex.test(value) || mobileRegex.test(value);
    }, "Please enter a valid email or 10-digit mobile number"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [inputType, setInputType] = useState<"email" | "tel">("email");
  const navigate = useNavigate();
  const { refetchUser } = useAuth();

  // ⚡ React Hook Form config
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Watch the emailOrMobile field to determine input type
  const emailOrMobileValue = watch("emailOrMobile");

  // Determine input type based on content
  useEffect(() => {
    if (emailOrMobileValue) {
      const isNumeric = /^\d+$/.test(emailOrMobileValue);
      setInputType(isNumeric ? "tel" : "email");
    }
  }, [emailOrMobileValue]);
  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError('');

    try {
      const loginData = {
        identifier: data.emailOrMobile,
        password: data.password
      };


      // Call AuthService directly and log the response
      const result = await AuthService.login(loginData);
      // Try different success conditions
      if (result?.success === true) {
          await refetchUser();
        navigate('/');
      } else {
        setError("Login failed: Invalid response from server");
      }

    } catch (error: any) {
      console.error("❌ Login error:", error);
      const errorMessage = error.response?.data?.message || error.message || "Login failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 
  const getInputIcon = () => {
    return inputType === "tel" ?
      <Smartphone className="h-5 w-5 text-gray-400" /> :
      <Mail className="h-5 w-5 text-gray-400" />;
  };

  // Get the appropriate placeholder based on input type
  const getPlaceholder = () => {
    return inputType === "tel" ?
      "1234567890" :
      "admin@example.com";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">

        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-indigo-600 p-3 rounded-2xl">
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Admin Login</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in with email or mobile number
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

            {/* FORM */}
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

              {/* Email or Mobile */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email or Mobile Number
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {getInputIcon()}
                  </div>
                  <input
                    {...register("emailOrMobile")}
                    type={inputType}
                    inputMode={inputType === "tel" ? "numeric" : "email"}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                      ${errors.emailOrMobile ? "border-red-300" : "border-gray-300"}`}
                    placeholder={getPlaceholder()}
                  />
                </div>
                {errors.emailOrMobile && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.emailOrMobile.message}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Enter your email address or 10-digit mobile number
                </p>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    className={`block w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                      ${errors.password ? "border-red-300" : "border-gray-300"}`}
                    placeholder="Enter your password"
                  />

                  {/* Toggle Password */}
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Demo Credentials</span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-600">
                  <strong>Email:</strong> admin@example.com<br />
                  <strong>Mobile:</strong> 1234567890<br />
                  <strong>Password:</strong> admin123
                </p>
              </div>
            </div>

            {/* Register Link */}
            {/* <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Create admin account
                </a>
              </p>
            </div> */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;