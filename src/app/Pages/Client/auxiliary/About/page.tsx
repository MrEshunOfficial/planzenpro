"use client";

import { ChartLine, Lightbulb, Users, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

type ValueCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const ValueCard: React.FC<ValueCardProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="p-6 rounded-lg border transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out">
      <div className="text-4xl text-blue-500 mb-4">
        <Icon />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

type TeamMemberProps = {
  name: string;
  role: string;
  image: string;
};

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-lg text-center border transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out">
      <Avatar className="w-20 h-20 mb-4 relative group">
        <AvatarImage src={image} alt={name} />
      </Avatar>
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </div>
  );
};

const AboutPage: React.FC = () => {
  return (
    <div className="h-full overflow-auto p-2">
      <motion.header
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 20 },
        }}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 mb-3">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">About PlanZen</h1>
          <p className="mt-2">Empowering productivity and organization</p>
        </div>
      </motion.header>

      <main className="container  mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Our Story</h2>
          <p className="mb-4">
            PlanZen was founded in 2024 with a simple mission: to help
            individuals and teams maximize their productivity and achieve their
            goals. We believe that with the right tools and mindset, everyone
            can unlock their full potential.
          </p>
          <p>
            Our team of productivity experts and software engineers have worked
            tirelessly to create a comprehensive platform that addresses the
            most common challenges in personal and professional organization.
            From scheduling and budget management to habit tracking and team
            collaboration, PlanZen is designed to be your all-in-one
            productivity solution.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ValueCard
              icon={Lightbulb}
              title="Innovation"
              description="We constantly strive to improve and innovate, bringing you the latest in productivity technology."
            />
            <ValueCard
              icon={Users}
              title="User-Centric"
              description="Our users are at the heart of everything we do. We listen, learn, and adapt to meet your needs."
            />
            <ValueCard
              icon={ChartLine}
              title="Efficiency"
              description="We believe in maximizing efficiency, both in our product and in how we operate as a company."
            />
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-6">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TeamMember
              name="Christopher Eshun"
              role="Founder & CEO"
              image="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <TeamMember
              name="John Smith"
              role="CTO"
              image="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <TeamMember
              name="Alice Johnson"
              role="Head of Product"
              image="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
