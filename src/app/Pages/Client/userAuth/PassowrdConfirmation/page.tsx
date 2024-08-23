"use client";

import React, { useState, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  Mail,
  Loader2,
  ArrowLeft,
  Lock,
  Shield,
  EyeOff,
  Eye,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

// Schema definition
const passwordConfirmationSchema = z
  .object({
    password: z
      .string()
      .min(12, { message: "Password must be at least 12 characters long" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordConfirmationFormData = z.infer<typeof passwordConfirmationSchema>;

const PasswordConfirmation: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<PasswordConfirmationFormData>({
    resolver: zodResolver(passwordConfirmationSchema),
  });

  const password = watch("password");

  const onSubmit: SubmitHandler<PasswordConfirmationFormData> = async (
    data
  ) => {
    try {
      // Replace this with your actual API endpoint for password confirmation
      const response = await axios.post("/api/auth/confirm-password", data);
      if (response.status === 200) {
        toast({
          title: "Password Reset Successful",
          description: "Your password has been successfully reset.",
        });
        router.push("/Pages/Api/userAuth/Login");
      } else {
        throw new Error("Password confirmation failed");
      }
    } catch (error) {
      toast({
        title: "Password Reset Failed",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const generatePassword = useCallback(() => {
    const length = 16;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    setValue("password", password);
    setValue("confirmPassword", password);
    toast({
      title: "Password Generated",
      description: "A strong password has been generated for you.",
    });
  }, [setValue]);

  const features = [
    {
      icon: Lock,
      title: "Secure Reset",
      description: "Your new password is encrypted and securely stored",
    },
    {
      icon: Shield,
      title: "Account Protection",
      description: "Strong password requirements to enhance security",
    },
    {
      icon: RefreshCw,
      title: "Auto Generation",
      description: "Option to generate a strong, unique password",
    },
  ];

  return (
    <main className="flex h-[80dvh] bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <motion.aside
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex flex-col items-center justify-between w-1/3 h-full bg-blue-600 text-white p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Reset Your Password</h1>
          <p className="text-lg mb-4">
            Choose a strong, unique password to secure your account.
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

        <Link href="/Frontend/user/Login">
          <Button
            variant="outline"
            className="mt-6 text-black border-white hover:bg-blue-700 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
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
            Confirm Your New Password
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700">
                New Password
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={generatePassword}
                className="text-xs">
                <RefreshCw className="mr-2 h-3 w-3" />
                Generate Strong Password
              </Button>
            </div>
            <FormField error={errors.password}>
              <div className="relative">
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </FormField>
            <FormField
              label="Confirm New Password"
              error={errors.confirmPassword}>
              <div className="relative">
                <Input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </FormField>

            {password && (
              <div className="mt-2">
                <PasswordStrengthMeter password={password} />
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="animate-spin mr-2" size={16} />
              ) : null}
              Reset Password
            </Button>
          </form>
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
  label?: string;
  children: React.ReactNode;
  error?: { message?: string };
}

const FormField: React.FC<FormFieldProps> = ({ label, children, error }) => (
  <div>
    {label && (
      <Label htmlFor={label} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
    )}
    {children}
    {error && <p className="mt-1 text-xs text-red-600">{error.message}</p>}
  </div>
);

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
}) => {
  const getPasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 12) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;
    return strength;
  };

  const strength = getPasswordStrength(password);
  const getColor = () => {
    if (strength < 2) return "bg-red-500";
    if (strength < 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="w-full">
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className={`h-full rounded-full ${getColor()}`}
          style={{ width: `${(strength / 5) * 100}%` }}></div>
      </div>
      <p className="text-xs mt-1 text-gray-600">
        Password strength:
        {strength === 5
          ? "Very strong"
          : strength >= 4
          ? "Strong"
          : strength >= 2
          ? "Medium"
          : "Weak"}
      </p>
    </div>
  );
};

export default PasswordConfirmation;
