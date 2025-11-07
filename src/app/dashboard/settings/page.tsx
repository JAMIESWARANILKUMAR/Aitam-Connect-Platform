
"use client";

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUser, useDoc, useFirebase } from "@/firebase";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import type { UserProfile } from '@/lib/database/users';
import { Loader2, User, KeyRound, ShieldCheck } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useEffect } from 'react';

const profileFormSchema = z.object({
  name: z.string().min(1, "Name is required."),
  workingStatus: z.string().optional(),
});

export default function SettingsPage() {
  const { user, loading: userLoading } = useUser();
  const { toast } = useToast();
  const { firestore, auth } = useFirebase();

  const { data: userProfile, loading: profileLoading, error: profileError } = useDoc<UserProfile>(
    (db) => (user ? doc(db, "users", user.uid) : null)
  );

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
        name: '',
        workingStatus: '',
    },
  });
  
  useEffect(() => {
    if (userProfile) {
      form.reset({
        name: userProfile.name || '',
        workingStatus: userProfile.workingStatus || '',
      });
    }
  }, [userProfile, form]);

  const { formState: { isSubmitting } } = form;

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2);
  };
  
  const onSubmit = async (values: z.infer<typeof profileFormSchema>) => {
    if (!user || !firestore || !auth?.currentUser) {
        toast({ title: "Error", description: "You must be logged in to update your profile.", variant: "destructive" });
        return;
    }

    try {
        const userRef = doc(firestore, "users", user.uid);
        const updateData: Partial<UserProfile> = { name: values.name };

        if (userProfile?.designation === 'Alumni') {
            updateData.workingStatus = values.workingStatus;
        }

        // Update Firestore
        await updateDoc(userRef, updateData);

        // Update Firebase Auth profile
        if (auth.currentUser.displayName !== values.name) {
            await updateProfile(auth.currentUser, { displayName: values.name });
        }

        toast({ title: "Profile Updated", description: "Your information has been saved successfully." });
        
    } catch(e) {
        console.error(e);
        toast({ title: "Error", description: "Failed to update profile. Please try again.", variant: "destructive" });
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email || !auth) {
        toast({ title: "Error", description: "Could not find your email address.", variant: "destructive" });
        return;
    }
    try {
        await sendPasswordResetEmail(auth, user.email);
        toast({
            title: "Password Reset Email Sent",
            description: `An email has been sent to ${user.email} with instructions to reset your password.`,
        });
    } catch (e) {
        console.error(e);
        toast({ title: "Error", description: "Failed to send password reset email. Please try again.", variant: "destructive" });
    }
  };

  const isLoading = userLoading || profileLoading;

  if (isLoading) {
    return (
        <div className="flex flex-col gap-8">
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-72" />
                </CardHeader>
                <CardContent className="space-y-6">
                     <Skeleton className="h-24 w-full" />
                     <Skeleton className="h-10 w-full" />
                     <Skeleton className="h-10 w-full" />
                </CardContent>
                 <CardFooter>
                    <Skeleton className="h-10 w-24" />
                </CardFooter>
            </Card>
        </div>
    )
  }

  if (profileError) {
      return (
          <Alert variant="destructive">
              <AlertTitle>Error Loading Profile</AlertTitle>
              <AlertDescription>There was a problem fetching your profile data. Please try again later.</AlertDescription>
          </Alert>
      )
  }

  return (
    <div className="flex flex-col gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your account settings and preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2"><User className="w-5 h-5 text-primary" /> Profile Details</h3>
                    <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={user?.photoURL || undefined} data-ai-hint="profile picture" />
                        <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="picture">Update your profile picture</Label>
                        <div className="flex gap-2">
                            <Input id="picture" type="file" className="max-w-xs" />
                        </div>
                    </div>
                    </div>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    {userProfile?.designation === 'Alumni' && (
                         <FormField
                            control={form.control}
                            name="workingStatus"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Working Status</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Software Engineer at Google" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                     <div className="space-y-2">
                        <Label>Email Address</Label>
                        <Input value={user?.email || ''} readOnly disabled />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2"><KeyRound className="w-5 h-5 text-primary" /> Unique Identifier</h3>
                     <div className="space-y-2">
                        <Label>{userProfile?.designation === 'Student' ? 'Student Roll Number' : 'Unique User ID'}</Label>
                        <Input value={userProfile?.rollNumber || user?.uid || ''} readOnly disabled />
                         <p className="text-xs text-muted-foreground">This is your unique identifier in the system and cannot be changed.</p>
                    </div>
                </div>

                <Separator />

                <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-primary" /> Password & Security</h3>
                     <div className="space-y-2">
                        <Label>Change Password</Label>
                        <p className="text-sm text-muted-foreground">Click the button below to send a password reset link to your email address.</p>
                        <Button type="button" variant="outline" onClick={handlePasswordReset}>
                           Send Password Reset Email
                        </Button>
                    </div>
                </div>


                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </CardFooter>
            </Card>
        </form>
      </Form>
    </div>
  );
}
