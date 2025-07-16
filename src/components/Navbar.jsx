import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { UserRound } from "@/components/animate-ui/icons/user-round";
("use client");

import {
  CreditCard,
  Home,
  Keyboard,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { motion } from "framer-motion"; // NOTE: your original was wrong
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/animate-ui/radix/dropdown-menu";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [onProfile, setonProfile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    if (userString) {
      setUser(JSON.parse(userString));
    }

    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    setonProfile(location.pathname === "/userprofile");
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <nav className="p-4 flex items-center justify-between border-b border-white/20 shadow-md fixed w-full z-20 bg-white/10 backdrop-blur-md">
        <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-1 text-white">
          Giglyy<span className="text-green-500">.</span>
        </h1>
        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-medium items-center">
          <li>
            <a
              href="#home"
              className="hover:text-green-500 transition-colors cursor-pointer text-white"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="hover:text-green-500 transition-colors cursor-pointer text-white"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#contactus"
              className="hover:text-green-500 transition-colors cursor-pointer text-white"
            >
              Contact
            </a>
          </li>
          {isLoggedIn && user?.role === "freelancer" ? (
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" asChild>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <AnimateIcon animateOnHover>
                        <UserRound />
                      </AnimateIcon>
                    </motion.button>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    {onProfile ? (
                      <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                        <Home className="mr-2 h-4 w-4" />
                        <span>Home</span>
                        <DropdownMenuShortcut>⇧⌘H</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        onClick={() => navigate("/userprofile")}
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => navigate("/freelancerorders")}>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Your Orders</span>
                      <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/creategigs")}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      <span>My Gigs</span>
                      <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          ) : isLoggedIn && user?.role === "client" ? (
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" asChild>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <AnimateIcon animateOnHover>
                        <UserRound />
                      </AnimateIcon>
                    </motion.button>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    {onProfile ? (
                      <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                        <Home className="mr-2 h-4 w-4" />
                        <span>Home</span>
                        <DropdownMenuShortcut>⇧⌘H</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        onClick={() => navigate("/userprofile")}
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => navigate("/clientorders")}>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Your Orders</span>
                      <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          ) : (
            <li>
              <button
                className="bg-green-500 hover:bg-green-600 transition-colors text-white px-4 py-2 rounded-md shadow"
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              >
                Get Started
              </button>
            </li>
          )}
        </ul>
        {/* Hamburger Icon */}
        <button
          className="md:hidden flex flex-col gap-1 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-1 w-6 bg-green-500 rounded transition-all ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block h-1 w-6 bg-green-500 rounded transition-all ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block h-1 w-6 bg-green-500 rounded transition-all ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="absolute top-16 right-4 border rounded-lg shadow-lg flex flex-col gap-4 p-6 font-medium items-start md:hidden animate-fade-in">
            <li>
              <a
                href="#home"
                className="hover:text-green-500 transition-colors cursor-pointer"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="hover:text-green-500 transition-colors cursor-pointer"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#contactus"
                className="hover:text-green-500 transition-colors cursor-pointer"
              >
                Contact
              </a>
            </li>
            <li>
              <button
                className="bg-green-500 hover:bg-green-600 transition-colors text-white px-4 py-2 rounded-md shadow"
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              >
                Get Started
              </button>
            </li>
          </ul>
        )}
      </nav>
      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-20"></div>
    </>
  );
};

export default Navbar;
