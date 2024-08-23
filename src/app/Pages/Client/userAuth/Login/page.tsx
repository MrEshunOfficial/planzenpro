"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  Loader2,
  DollarSign,
  ShoppingCart,
  MessageCircle,
  TrendingUp,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { FcGoogle } from "react-icons/fc";

// Schema definition
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await axios.post("/Pages/Api/auth/login", data);
      if (response.status === 200) {
        toast({
          title: "Login Successful",
          description: "Welcome back to PlanZen!",
        });
        router.push("/");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get("/api/auth/google");
      console.log(response.data);
    } catch (error) {
      console.error("Google login error:", error);
      toast({
        title: "Google Login Failed",
        description: "An error occurred during Google login. Please try again.",
        variant: "destructive",
      });
    }
  };

  const features = [
    {
      icon: DollarSign,
      title: "Finance Management",
      description: "Comprehensive budgeting and expense tracking",
    },
    {
      icon: TrendingUp,
      title: "Habit Tracking",
      description: "Build and maintain positive routines",
    },
    {
      icon: ShoppingCart,
      title: "Shopping List",
      description: "Intelligent list management and tracking",
    },
    {
      icon: MessageCircle,
      title: "Community Hub",
      description: "Connect and share with like-minded individuals",
    },
  ];

  return (
    <main className="flex bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <motion.aside
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex flex-col items-center justify-between w-1/3 h-full bg-blue-600 text-white p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome Back to Planzen</h1>
          <p className="text-lg mb-4">
            Your journey to better planning and productivity continues here.
          </p>
        </div>

        <div className="space-y-8">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        <Link href="/">
          <Button
            variant="outline"
            className="mt-6 text-black border-white hover:bg-blue-700 hover:text-white">
            Return to Home
          </Button>
        </Link>
      </motion.aside>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-blue-800 mb-2 text-center">
            Planzen
          </h2>
          <p className="text-xl text-blue-600 mb-8 text-center">
            Login to Your Account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField label="Email" error={errors.email}>
              <Input
                {...register("email")}
                type="email"
                placeholder="john@example.com"
              />
            </FormField>

            <FormField label="Password" error={errors.password}>
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </FormField>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                href="/Pages/Client/userAuth/PasswordRecovery"
                className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="animate-spin mr-2" size={16} />
              ) : null}
              Login
            </Button>
          </form>

          <div className="mt-6">
            <Button
              onClick={handleGoogleLogin}
              className="w-full bg-white text-gray-800 border border-gray-300 hover:bg-gray-100">
              <FcGoogle size={20} className="mr-2" />
              Sign in with Google
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-blue-600">
              {`Don't have an account?`}
              <Link
                href="/Pages/Client/userAuth/Register"
                className="font-semibold text-blue-700 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

interface FeatureItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon: Icon,
  title,
  description,
}) => (
  <div className="flex items-center space-x-4">
    <Icon size={32} className="text-blue-300" />
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-blue-200">{description}</p>
    </div>
  </div>
);

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  error?: { message?: string };
}

const FormField: React.FC<FormFieldProps> = ({ label, children, error }) => (
  <div>
    <Label htmlFor={label} className="text-sm font-medium text-gray-700">
      {label}
    </Label>
    {children}
    {error && <p className="mt-1 text-xs text-red-600">{error.message}</p>}
  </div>
);

export default Login;
