"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  Loader2,
  Rocket,
  Shield,
  Star,
  Calendar,
  EyeOff,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import DatePicker from "react-datepicker";

// Schema definition
const schema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    dateOfBirth: z.date().refine(
      (date) => {
        const today = new Date();
        const age = today.getFullYear() - date.getFullYear();
        return age >= 0;
      },
      { message: "You must be at least 13 years old to register" }
    ),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

const Register: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSignUp: SubmitHandler<FormData> = async (data) => {
    try {
      await axios.post("/Pages/Api/auth/register", data);
      toast({ title: "Success", description: "Registration successful!" });
      router.push("/Pages/Client/userAuth/Login");
      console.log(data);
    } catch (error) {
      console.error("Registration failed:", error);
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    const password = Array(12)
      .fill(0)
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join("");
    setValue("password", password);
    setValue("confirmPassword", password);
  };

  return (
    <main className="flex h-[80dvh] bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <motion.aside
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex flex-col items-center justify-between w-1/3 h-full bg-blue-600 text-white p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Planzen</h1>
          <p className="text-xl mb-8">
            Your journey to better planning and productivity starts here.
          </p>
        </div>

        <div className="space-y-8">
          <FeatureItem
            icon={Rocket}
            title="Boost Productivity"
            description="Unlock your full potential with our advanced tools."
          />
          <FeatureItem
            icon={Shield}
            title="Secure Planning"
            description="Your data is safe and encrypted with state-of-the-art security."
          />
          <FeatureItem
            icon={Star}
            title="Premium Features"
            description="Access exclusive tools to supercharge your planning experience."
          />
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
            Create Your Account
          </p>

          <form onSubmit={handleSubmit(onSignUp)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="First Name" error={errors.firstName}>
                <Input {...register("firstName")} placeholder="John" />
              </FormField>
              <FormField label="Last Name" error={errors.lastName}>
                <Input {...register("lastName")} placeholder="Doe" />
              </FormField>
            </div>

            <FormField label="Email" error={errors.email}>
              <Input
                {...register("email")}
                type="email"
                placeholder="john@example.com"
              />
            </FormField>

            <FormField label="Date of Birth" error={errors.dateOfBirth}>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal">
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <Calendar className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </FormField>

            <FormField label="Password" error={errors.password}>
              <div className="relative">
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
            </FormField>

            <FormField label="Confirm Password" error={errors.confirmPassword}>
              <div className="relative">
                <Input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </Button>
              </div>
            </FormField>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={generatePassword}>
              Generate Strong Password
            </Button>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="animate-spin mr-2" size={16} />
              ) : null}
              Sign Up
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-blue-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-blue-700 hover:underline">
                Login
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

export default Register;
