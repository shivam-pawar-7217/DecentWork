"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { SubtleBackground } from "@/components/ui/subtle-background";
import { PremiumCard } from "@/components/ui/premium-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/"); // Redirect to homepage after login
    }
  }, [session, router]);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background elements */}
      <SubtleBackground type="nodes" intensity="low" className="z-0" />

      {/* Navigation */}
      <Navbar />

      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-md mx-auto">
          <PremiumCard className="p-8" glowIntensity="medium">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">Welcome Back</h1>
              <p className="text-muted-foreground mt-2">Log in to your DecentWork account</p>
            </div>

            {session ? (
              <p className="text-center text-sm text-muted-foreground">Redirecting...</p>
            ) : (
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="name@example.com" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>

                <PremiumButton className="w-full" glowIntensity="medium">
                  Log In
                </PremiumButton>
              </form>
            )}

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full" onClick={() => signIn("google")}>
                Google
              </Button>
              <Button variant="outline" className="w-full">
                Wallet Connect
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </PremiumCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}
