"use client";

import React, { useState } from "react";
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
const passwordRecoverySchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type PasswordRecoveryFormData = z.infer<typeof passwordRecoverySchema>;

const PasswordRecovery: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordRecoveryFormData>({
    resolver: zodResolver(passwordRecoverySchema),
  });

  const onSubmit: SubmitHandler<PasswordRecoveryFormData> = async (data) => {
    try {
      // Replace this with your actual API endpoint for password recovery
      const response = await axios.post("/api/auth/recover-password", data);
      if (response.status === 200) {
        toast({
          title: "Recovery Email Sent",
          description: "Please check your email for further instructions.",
        });
        // Optionally, redirect to a confirmation page
        router.push("/Pages/Client/userAuth//PasswordConfirmation");
      } else {
        throw new Error("Password recovery request failed");
      }
    } catch (error) {
      toast({
        title: "Recovery Request Failed",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const features = [
    {
      icon: Lock,
      title: "Secure Process",
      description: "Your data is protected throughout the recovery process",
    },
    {
      icon: Mail,
      title: "Email Verification",
      description: "We'll send instructions to your registered email",
    },
    {
      icon: RefreshCw,
      title: "Quick Reset",
      description: "Reset your password and regain access in minutes",
    },
    {
      icon: Shield,
      title: "Account Protection",
      description: "Additional security measures to keep your account safe",
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
          <h1 className="text-2xl font-bold mb-4">Password Recovery</h1>
          <p className="text-lg mb-2">
            {` We're here to help you regain access to your account.`}
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
            Recover Your Password
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField label="Email" error={errors.email}>
              <Input
                {...register("email")}
                type="email"
                placeholder="john@example.com"
                icon={Mail}
                className="my-3"
              />
            </FormField>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="animate-spin mr-2" size={16} />
              ) : null}
              Send Recovery Email
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-blue-600">
              Remembered your password ?
              <Link
                href="/Pages/Client/userAuth//Login"
                className="font-semibold text-blue-700 hover:underline ml-2">
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

export default PasswordRecovery;
