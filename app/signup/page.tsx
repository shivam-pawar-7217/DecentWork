import Link from "next/link"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/navigation/footer"
import { SubtleBackground } from "@/components/ui/subtle-background"
import { PremiumCard } from "@/components/ui/premium-card"
import { PremiumButton } from "@/components/ui/premium-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignupPage() {
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
              <h1 className="text-2xl font-bold">Create an Account</h1>
              <p className="text-muted-foreground mt-2">Join the decentralized freelancing revolution</p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters with a number and a special character
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="account-type">I want to...</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    Find Work
                  </Button>
                  <Button variant="outline" className="justify-start">
                    Hire Talent
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <PremiumButton className="w-full" glowIntensity="medium">
                Create Account
              </PremiumButton>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                Google
              </Button>
              <Button variant="outline" className="w-full">
                Wallet Connect
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
          </PremiumCard>
        </div>
      </main>

      <Footer />
    </div>
  )
}

