"use client";
import React, { useState } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  Search,
  User,
  MoonIcon,
  SunIcon,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import axios from "axios";
import { NextResponse } from "next/server";

interface HeaderProps {
  toggleTheme: () => void;
  theme: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  createdAt: Date;
}

const MainHeader: React.FC<HeaderProps> = () => {
  const { setTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New message",
      message: "You have a new message from Jane about the project proposal.",
      createdAt: new Date(2024, 7, 4, 10, 30),
    },
    {
      id: 2,
      title: "Meeting reminder",
      message:
        "Team meeting in 30 minutes. Don't forget to prepare your weekly update.",
      createdAt: new Date(2024, 7, 4, 11, 0),
    },
  ]);

  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.get("/Pages/Api/auth/logout");
      router.push("/Pages/Client/userAuth/Login");
    } catch (error) {
      console.error("Logout error:", error);
      return NextResponse.json(
        { message: "Internal server error", success: false },
        { status: 500 }
      );
    }
    setIsLoggedIn(false);
  };

  const headerLinks = [
    { title: "Home", href: "/" },
    { title: "About", href: "/Pages/Client/auxiliary/About" },
    { title: "Support Us", href: "/Pages/Client/auxiliary/Support" },
    { title: "Contact", href: "/Pages/Client/auxiliary/Contact" },
    { title: "Locate Us", href: "/Pages/Client/auxiliary/LocateUs" },
  ];

  const formatNotificationTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  const pathname = usePathname();

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-md z-20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <nav className="flex-grow">
            <ul className="flex justify-center space-x-1">
              {headerLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200
                      ${
                        pathname === link.href
                          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
                          : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-300 dark:hover:text-indigo-200 dark:hover:bg-indigo-900"
                      }`}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 rounded-full bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-gray-100 dark:bg-gray-800 rounded-full">
                  <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="mt-5">
                <DropdownMenuItem
                  onClick={() => setTheme("light")}
                  className="flex items-center justify-start gap-4 my-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg">
                  <SunIcon size="16" /> Light
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("dark")}
                  className="flex items-center justify-start gap-4 my-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg">
                  <MoonIcon size="16" /> Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("system")}
                  className="flex items-center justify-start gap-4 my-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg">
                  <Monitor size="16" /> System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {!isLoggedIn ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full">
                      <Bell className="h-5 w-5" />
                      {notifications.length > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                          {notifications.length}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="mt-5 w-80">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notifications.map((notif) => (
                      <DropdownMenuItem
                        key={notif.id}
                        className="flex flex-col items-start p-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <span className="font-medium">{notif.title}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {notif.message}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                          {formatNotificationTime(notif.createdAt)}
                        </span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full">
                      <User className="h-5 w-5" />
                      <span className="font-medium">Christopher</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="mt-5">
                    <DropdownMenuItem>
                      <Link
                        href="/Pages/Client/userAuth/userProfile"
                        className="flex items-center w-full">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href="/settings"
                        className="flex items-center w-full">
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link href="Pages/Client/userAuth/Login" passHref>
                  <Button
                    variant="outline"
                    className="border rounded-full border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Log In
                  </Button>
                </Link>
                <Link href="Pages/Client/userAuth/Register" passHref>
                  <Button className="rounded-full bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
