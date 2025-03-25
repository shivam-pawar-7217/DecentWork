"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Menu, X, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PremiumButton } from "@/components/ui/premium-button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  transparent?: boolean;
}

export function Navbar({ transparent = false }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(win+w.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Find Work", href: "/jobs" },
    { name: "Hire Talent", href: "/freelancers" },
    { name: "How It Works", href: "/how-it-works" },
  ];

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || !transparent
          ? "bg-background/80 backdrop-blur-md border-b border-white/5 shadow-sm"
          : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            DecentWork
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm transition-colors hover:text-primary",
                pathname === item.href ? "text-primary font-medium" : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Profile Section or Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {session ? (
            // Profile Dropdown when user is logged in
            <div className="relative group">
              <button className="flex items-center space-x-2">
                <UserCircle className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">{session.user?.name || "User"}</span>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-card shadow-md rounded-md hidden group-hover:block">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm hover:bg-primary/10 transition"
                >
                  View Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-primary/10 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            // Show Login/Sign Up when not logged in
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <PremiumButton variant="default" size="sm" glowIntensity="medium">
                  Sign Up
                </PremiumButton>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-card/95 backdrop-blur-md border-b border-white/5"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "py-2 text-sm transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary font-medium" : "text-muted-foreground"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="flex flex-col space-y-2 pt-2 border-t border-white/5">
              {session ? (
                // Profile Section for Mobile View
                <div className="flex flex-col space-y-2">
                  <Link href="/profile">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      View Profile
                    </Button>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left text-sm px-4 py-2 hover:bg-primary/10 transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                // Show Login/Sign Up in Mobile View
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <PremiumButton variant="default" size="sm" className="w-full justify-start" glowIntensity="medium">
                      Sign Up
                    </PremiumButton>
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
