"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  ChartLine,
  ClipboardList,
  List,
  MessageSquare,
  ShoppingCart,
  SuperscriptIcon,
  LucideProps,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type SupportOptionProps = {
  icon: React.ComponentType<LucideProps>;
  title: string;
  description: string;
  color: string;
};

const SupportOption: React.FC<SupportOptionProps> = ({
  icon: Icon,
  title,
  description,
  color,
}) => (
  <motion.div
    className="w-full md:w-1/2 lg:w-1/3 p-4"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}>
    <div
      className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-l-4 ${color}`}>
      <div className="flex items-start">
        <Icon className={`text-3xl mr-4 ${color.replace("border", "text")}`} />
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const IllustrativeSVG: React.FC = () => (
  <svg
    className="w-full h-64 mb-6"
    viewBox="0 0 400 200"
    xmlns="http://www.w3.org/2000/svg">
    <rect
      x="0"
      y="0"
      width="400"
      height="200"
      fill="#f0f9ff"
      className="dark:fill-gray-800"
    />
    <circle
      cx="200"
      cy="100"
      r="80"
      fill="#60a5fa"
      className="dark:fill-blue-600"
    />
    <path
      d="M160 140 Q 200 180 240 140"
      stroke="#2563eb"
      strokeWidth="8"
      fill="none"
      className="dark:stroke-blue-400"
    />
    <circle
      cx="170"
      cy="80"
      r="15"
      fill="#1e40af"
      className="dark:fill-blue-300"
    />
    <circle
      cx="230"
      cy="80"
      r="15"
      fill="#1e40af"
      className="dark:fill-blue-300"
    />
  </svg>
);

const SupportUs: React.FC = () => {
  const supportOptions: SupportOptionProps[] = [
    {
      icon: List,
      title: "Features",
      description:
        "Help us add more features like habit tracking and budget management.",
      color: "border-blue-500",
    },
    {
      icon: ChartLine,
      title: "Performance",
      description:
        "Support our efforts to optimize performance and user experience.",
      color: "border-green-500",
    },
    {
      icon: ClipboardList,
      title: "Development",
      description: "Contribute to ongoing development and maintenance.",
      color: "border-red-500",
    },
    {
      icon: MessageSquare,
      title: "Community",
      description:
        "Join our community and provide feedback to shape the future of PlanZen.",
      color: "border-purple-500",
    },
    {
      icon: ShoppingCart,
      title: "Merchandise",
      description: "Buy our merchandise to show your support.",
      color: "border-yellow-500",
    },
    {
      icon: SuperscriptIcon,
      title: "Donate",
      description: "Make a donation to help us keep PlanZen running.",
      color: "border-pink-500",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-2">
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg p-2 w-full max-h-[85dvh] overflow-scroll  max-w-7xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}>
        <div className="flex flex-col md:flex-row items-center mb-8">
          <div className="md:w-1/2 pr-8">
            <motion.h1
              className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120 }}>
              Support PlanZen
            </motion.h1>
            <motion.p
              className="text-xl text-gray-700 dark:text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}>
              Your support helps us continue to build and improve PlanZen,
              making it the best planning tool for everyone. Choose a way to
              contribute below:
            </motion.p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full inline-flex items-center">
              <Heart className="mr-2" />
              Support Now
            </Button>
          </div>
          <div className="md:w-1/2 mt-3 md:mt-0">
            <IllustrativeSVG />
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          {supportOptions.map((option, index) => (
            <SupportOption
              key={index}
              icon={option.icon}
              title={option.title}
              description={option.description}
              color={option.color}
            />
          ))}
        </div>

        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Join Our Community
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Connect with other PlanZen enthusiasts, share your experiences, and
            get the latest updates.
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              className="dark:border-gray-600 dark:text-gray-300">
              Join Forum
            </Button>
            <Button
              variant="outline"
              className="dark:border-gray-600 dark:text-gray-300">
              Follow on Twitter
            </Button>
            <Button
              variant="outline"
              className="dark:border-gray-600 dark:text-gray-300">
              Subscribe to Newsletter
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SupportUs;
