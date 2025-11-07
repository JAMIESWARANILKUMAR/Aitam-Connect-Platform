
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "@/firebase";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();

  const handleGoogleSignIn = async () => {
    if (!auth) {
        toast({
            title: "Error",
            description: "Authentication service is not available. Please try again later.",
            variant: "destructive",
        });
        return;
    }
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error: any) {
      // Gracefully handle the case where the user closes the popup.
      if (error.code === 'auth/popup-closed-by-user') {
        console.log("Sign-in popup closed by user.");
        return;
      }
      console.error("Error signing in with Google: ", error);
      toast({
        title: "Error",
        description: "Failed to sign in with Google. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just navigate to dashboard. Implement actual email/password login later.
    router.push("/dashboard");
  }

  return (
    <>
      <Tabs defaultValue="student" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="alumni">Alumni</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>
        <TabsContent value="student">
          <form className="pt-4" onSubmit={handleFormSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email-student">Student ID / Email</Label>
                <Input id="email-student" type="email" placeholder="m.arasu@adityatekkali.edu.in" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password-student">Password</Label>
                  <Link href="#" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password-student" type="password" required />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms-student" />
                <label
                  htmlFor="terms-student"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <Button type="submit" className="w-full">Login</Button>
              <Button variant="outline" className="w-full" type="button" onClick={handleGoogleSignIn} disabled={!auth}>
                 <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.2 64.5C308.6 102.3 282.7 92 248 92c-88.8 0-160.1 71.1-160.1 164s71.3 164 160.1 164c94.4 0 140.3-61.5 143.8-92.6H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                Login with Google
              </Button>
            </div>
          </form>
        </TabsContent>
        <TabsContent value="alumni">
          <form className="pt-4" onSubmit={handleFormSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email-alumni">Alumni ID / Email</Label>
                  <Input id="email-alumni" type="email" placeholder="alumni@example.com" required />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password-alumni">Password</Label>
                    <Link href="#" className="ml-auto inline-block text-sm underline">
                      Forgot your password?
                    </Link>
                  </div>
                  <Input id="password-alumni" type="password" required />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms-alumni" />
                  <label
                    htmlFor="terms-alumni"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
                <Button type="submit" className="w-full">Login</Button>
                 <Button variant="outline" className="w-full" type="button" onClick={handleGoogleSignIn} disabled={!auth}>
                   <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.2 64.5C308.6 102.3 282.7 92 248 92c-88.8 0-160.1 71.1-160.1 164s71.3 164 160.1 164c94.4 0 140.3-61.5 143.8-92.6H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                  Login with Google
                </Button>
              </div>
            </form>
        </TabsContent>
        <TabsContent value="admin">
           <form className="pt-4" onSubmit={handleFormSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email-admin">Admin ID / Email</Label>
                  <Input id="email-admin" type="email" placeholder="admin@adityatekkali.edu.in" required />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password-admin">Password</Label>
                    <Link href="#" className="ml-auto inline-block text-sm underline">
                      Forgot your password?
                    </Link>
                  </div>
                  <Input id="password-admin" type="password" required />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms-admin" />
                  <label
                    htmlFor="terms-admin"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
                <Button type="submit" className="w-full">Login</Button>
              </div>
            </form>
        </TabsContent>
      </Tabs>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline text-primary">
          Sign up
        </Link>
      </div>
    </>
  );
}
