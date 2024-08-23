"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Calendar,
  DollarSign,
  ShoppingCart,
  MessageCircle,
  TrendingUp,
  CheckCircle,
  Star,
  LucideIcon,
  Twitter,
  Facebook,
  LinkedinIcon,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { ReduxProvider } from "@/components/ReduxProvider";

// Define types for the props
type FeatureCardProps = {
  Icon: LucideIcon;
  title: string;
  description: string;
  AnimatedIcon?: React.FC;
};

type Plan = {
  name: string;
  basePrice: number;
  pricePerUser: number;
};

type Feature = {
  name: string;
  free: boolean;
  pro: boolean;
  business: boolean;
};

type TestimonialProps = {
  name: string;
  role: string;
  content: string;
};

// FeatureCard Component
const FeatureCard: React.FC<FeatureCardProps> = ({
  Icon,
  title,
  description,
  AnimatedIcon,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-indigo-100 dark:border-indigo-800">
      <div className="mb-6">
        {AnimatedIcon ? (
          <AnimatedIcon />
        ) : (
          <Icon className="w-16 h-16 text-indigo-600 dark:text-indigo-400" />
        )}
      </div>
      <h3 className="text-2xl font-bold mb-4 text-indigo-800 dark:text-indigo-300">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

// PricingCalculator Component
const PricingCalculator: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<keyof typeof plans>("free");
  const [users, setUsers] = useState<number>(1);

  const plans: Record<string, Plan> = {
    free: { name: "Free", basePrice: 0, pricePerUser: 0 },
    pro: { name: "Pro", basePrice: 9.99, pricePerUser: 4.99 },
    business: { name: "Business", basePrice: 24.99, pricePerUser: 9.99 },
  };

  const features: Feature[] = [
    { name: "Smart Scheduling", free: true, pro: true, business: true },
    { name: "Habit Tracking", free: true, pro: true, business: true },
    { name: "Financial Management", free: false, pro: true, business: true },
    { name: "Shopping Assistant", free: false, pro: true, business: true },
    { name: "Chat & Sharing", free: false, pro: false, business: true },
    { name: "Priority Support", free: false, pro: false, business: true },
  ];

  const calculatePrice = () => {
    const plan = plans[selectedPlan];
    return (plan.basePrice + plan.pricePerUser * (users - 1)).toFixed(2);
  };

  return (
    <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-xl">
      <h3 className="text-2xl font-bold text-indigo-800 mb-4">
        Pricing Calculator
      </h3>
      <div className="flex justify-center space-x-4 mb-8">
        {Object.entries(plans).map(([key, plan]) => (
          <Button
            key={key}
            onClick={() => setSelectedPlan(key as keyof typeof plans)}
            className={`px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300 ${
              selectedPlan === key
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}>
            {plan.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {features.map((feature) => (
          <div key={feature.name} className="flex items-center">
            <CheckCircle
              className={`w-5 h-5 mr-2 ${
                feature[selectedPlan] ? "text-green-500" : "text-gray-300"
              }`}
            />
            <span
              className={
                feature[selectedPlan]
                  ? "text-gray-800  dark:text-gray-200"
                  : "text-gray-400"
              }>
              {feature.name}
            </span>
          </div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold text-indigo-600 mb-2">
          ${calculatePrice()}
        </p>
        <p className="text-gray-600">per month</p>
      </div>
    </div>
  );
};

// Animated SVG Component
const AnimatedCalendar: React.FC = () => (
  <motion.svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    initial="hidden"
    animate="visible">
    <motion.rect
      x="10"
      y="10"
      width="80"
      height="80"
      rx="4"
      fill="none"
      stroke="#4F46E5"
      strokeWidth="4"
      variants={{
        hidden: { pathLength: 0 },
        visible: {
          pathLength: 1,
          transition: { duration: 2, ease: "easeInOut" },
        },
      }}
    />
    <motion.line
      x1="10"
      y1="30"
      x2="90"
      y2="30"
      stroke="#4F46E5"
      strokeWidth="4"
      variants={{
        hidden: { pathLength: 0 },
        visible: {
          pathLength: 1,
          transition: { duration: 1, ease: "easeInOut", delay: 1 },
        },
      }}
    />
    <motion.circle
      cx="50"
      cy="60"
      r="15"
      fill="#4F46E5"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 2 }}
    />
  </motion.svg>
);

// Scroll animation hook
const useScrollAnimation = (threshold = 0.1) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return [ref, controls];
};

// AnimatedSection component
const AnimatedSection: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ref, controls] = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }}>
      {children}
    </motion.div>
  );
};

// Update Testimonial component
const Testimonial: React.FC<TestimonialProps> = ({ name, role, content }) => {
  const [ref, controls] = useScrollAnimation(0.2);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5, ease: "easeOut" },
        },
      }}
      className="bg-white dark:bg-gray-800 p-4 rounded-xl ">
      <p className="text-gray-600 dark:text-gray-300 italic mb-4">{content}</p>
      <div className="flex items-center">
        <div className="w-12 h-12 bg-indigo-200 dark:bg-indigo-700 rounded-full flex items-center justify-center mr-4">
          <span className="text-xl font-bold text-indigo-600 dark:text-indigo-300">
            {name[0]}
          </span>
        </div>
        <div>
          <p className="font-semibold text-indigo-800 dark:text-indigo-300">
            {name}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

const LandingPage: React.FC = () => {
  return (
    <ReduxProvider>
      <main className="h-[88dvh] overflow-auto bg-gradient-to-b from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-indigo-900 relative mb-4">
        <header className="container mx-auto py-6 px-4 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50">
          <nav className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-indigo-800 dark:text-indigo-300">
              PlanZen
            </h1>
            <div className="space-x-6">
              <Link
                href="#features"
                className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Pricing
              </Link>
              <Link
                href="#testimonials"
                className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Testimonials
              </Link>
              <Link href={"Pages/Client/userAuth/Login"}>
                <Button variant={"destructive"}>Sign Up</Button>
              </Link>
            </div>
          </nav>
        </header>

        <section className="container mx-auto px-4">
          <AnimatedSection>
            <section className="flex flex-col md:flex-row items-center justify-around text-center md:text-left py-20 mb-12">
              <div className="md:w-1/2 mb-2 md:mb-0">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-5xl font-extrabold text-indigo-800 dark:text-indigo-300 mb-6 leading-tight">
                  Transform Your Life with PlanZen
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                  Your all-in-one solution for planning, budgeting, habit
                  tracking, and more.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex justify-center md:justify-start space-x-4">
                  <Link href="/Frontend/Features">
                    <Button
                      size="lg"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white">
                      Get Started
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline">
                    Watch Demo
                  </Button>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="md:w-1/2 flex justify-center">
                <Avatar className="w-80 h-80 rounded-full shadow-2xl">
                  <AvatarImage src="https://images.pexels.com/photos/18069239/pexels-photo-18069239/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-represents-how-ai-powered-tools-can-support-us-and-save-time-it-was-created-by-martina-stiftinger-as-part-of-the-visua.png?auto=compress&cs=tinysrgb&w=600" />
                </Avatar>
              </motion.div>
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section id="features" className="pt-2 pb-6 mb-10">
              <h3 className="text-3xl font-bold text-center text-indigo-800 dark:text-indigo-300 mb-12">
                Powerful Features to Simplify Your Life
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard
                  Icon={Calendar}
                  title="Smart Scheduling"
                  description="Effortlessly organize your tasks and events with our intuitive scheduling features."
                  AnimatedIcon={AnimatedCalendar}
                />
                <FeatureCard
                  Icon={DollarSign}
                  title="Budget Management"
                  description="Track your expenses, manage your finances, and stay on top of your budget."
                />
                <FeatureCard
                  Icon={ShoppingCart}
                  title="Shopping Assistant"
                  description="Create shopping lists, manage your grocery items, and save money with smart recommendations."
                />
                <FeatureCard
                  Icon={MessageCircle}
                  title="Chat & Sharing"
                  description="Communicate with your team, share plans, and stay connected seamlessly."
                />
                <FeatureCard
                  Icon={TrendingUp}
                  title="Habit Tracking"
                  description="Build and track habits to achieve your personal and professional goals."
                />
                <FeatureCard
                  Icon={Star}
                  title="Rewards & Achievements"
                  description="Earn rewards and track your progress as you complete your goals."
                />
              </div>
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section id="pricing" className="p-4 bg-white dark:bg-gray-800">
              <h3 className="text-3xl font-bold text-center text-indigo-800 dark:text-indigo-300 mb-12">
                Choose the Perfect Plan for You
              </h3>
              <PricingCalculator />
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section id="testimonials" className="py-6">
              <h3 className="text-3xl font-bold text-center text-indigo-800 dark:text-indigo-300 mb-12">
                What Our Users Say
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Testimonial
                  name="John Doe"
                  role="Product Manager"
                  content="PlanZen has completely transformed the way I manage my tasks and habits. I can't imagine life without it."
                />
                <Testimonial
                  name="Jane Smith"
                  role="Freelancer"
                  content="The budget management tools in PlanZen have helped me save money and stay on top of my finances."
                />
                <Testimonial
                  name="Sam Wilson"
                  role="Team Lead"
                  content="The collaboration features are a game-changer for our team. We stay connected and organized, no matter where we are."
                />
              </div>
            </section>
          </AnimatedSection>
        </section>

        <footer className="bg-indigo-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-xl font-bold mb-4">PlanZen</h4>
                <p>Your all-in-one life management solution.</p>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#features">Features</a>
                  </li>
                  <li>
                    <a href="#pricing">Pricing</a>
                  </li>
                  <li>
                    <a href="#testimonials">Testimonials</a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-4">Contact</h4>
                <p>Email: support@planzen.com</p>
                <p>Phone: (123) 456-7890</p>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <Twitter className="w-6 h-6" />
                  <Facebook className="w-6 h-6" />
                  <LinkedinIcon className="w-6 h-6" />
                  <Github className="w-6 h-6" />
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p>&copy; 2024 PlanZen. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </ReduxProvider>
  );
};

export default LandingPage;
