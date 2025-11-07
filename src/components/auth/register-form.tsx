
"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useFirebase } from "@/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const registerSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["student", "alumni"], { required_error: "You need to select a role." }),
  profilePicture: z.any().optional(),
  branch: z.string().optional(),
  yearOfStudy: z.string().optional(),
  rollNumber: z.string().optional(),
  passOutYear: z.string().optional(),
  workingStatus: z.string().optional(),
}).refine(data => {
    if (data.role === 'student') {
      return !!data.branch && !!data.yearOfStudy && !!data.rollNumber;
    }
    return true;
  }, {
    message: "Branch, Year of Study, and Roll Number are required for students.",
    path: ['branch'] // You can set the path to any of the student fields
  }).refine(data => {
    if (data.role === 'alumni') {
        return !!data.passOutYear && !!data.workingStatus;
    }
    return true;
  }, {
    message: "Pass Out Year and Working Status are required for alumni.",
    path: ['passOutYear'] // You can set the path to any of the alumni fields
  });


type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { auth, firestore } = useFirebase();
  const { register, handleSubmit, control, watch, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });
  
  const role = watch("role");

  const handleRegister = async (data: RegisterFormValues) => {
     if (!auth || !firestore) {
      toast({
        title: "Error",
        description: "Firebase is not configured correctly. Please try again later.",
        variant: "destructive"
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      const fullName = `${data.firstName} ${data.lastName}`;
      
      await updateProfile(user, {
          displayName: fullName,
          // photoURL logic would go here if we were handling file uploads
      });

      // Save user profile to Firestore
      const userProfile = {
        name: fullName,
        email: data.email,
        designation: data.role.charAt(0).toUpperCase() + data.role.slice(1),
        totalRespondedQuestions: 0,
        ...(data.role === 'student' && {
          branch: data.branch,
          yearOfStudy: data.yearOfStudy,
          rollNumber: data.rollNumber,
        }),
        ...(data.role === 'alumni' && {
          branch: data.branch, // Alumni can also have a branch
          passOutYear: data.passOutYear,
          workingStatus: data.workingStatus,
        }),
      };

      await setDoc(doc(firestore, "users", user.uid), userProfile);

      toast({
        title: "Success",
        description: "Your account has been created successfully.",
      });
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error creating account: ", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create an account. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const fixedCurrentYear = 2024;
  const years = Array.from({ length: fixedCurrentYear - 1999 }, (_, i) => (fixedCurrentYear - i).toString());


  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <div className="grid gap-4">
         <div className="grid gap-2">
            <Label htmlFor="profile-picture">Profile Picture</Label>
            <Input id="profile-picture" type="file" {...register("profilePicture")} />
            {errors.profilePicture && <p className="text-destructive text-xs">{errors.profilePicture.message?.toString()}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first-name">First name</Label>
            <Input id="first-name" placeholder="Max" {...register("firstName")} />
            {errors.firstName && <p className="text-destructive text-xs">{errors.firstName.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input id="last-name" placeholder="Robinson" {...register("lastName")} />
             {errors.lastName && <p className="text-destructive text-xs">{errors.lastName.message}</p>}
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
          />
           {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
           {errors.password && <p className="text-destructive text-xs">{errors.password.message}</p>}
        </div>
         <div className="grid gap-2">
            <Label htmlFor="role">I am a...</Label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="alumni">Alumni</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
             {errors.role && <p className="text-destructive text-xs">{errors.role.message}</p>}
        </div>
        
        <div className="grid gap-2">
            <Label htmlFor="branch">Branch</Label>
            <Controller
                name="branch"
                control={control}
                render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger><SelectValue placeholder="Select your branch" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cse">Computer Science & Engineering</SelectItem>
                            <SelectItem value="cse_ai_ml">CSE(Artificial Intelligence and Machine Learning)</SelectItem>
                            <SelectItem value="cse_ds">CSE(Data Science)</SelectItem>
                            <SelectItem value="cse_cs">CSE(Cyber Security)</SelectItem>
                            <SelectItem value="it">Information Technology</SelectItem>
                            <SelectItem value="ece">Electronics & Communication Engineering</SelectItem>
                            <SelectItem value="eee">Electrical & Electronics Engineering</SelectItem>
                            <SelectItem value="mech">Mechanical Engineering</SelectItem>
                            <SelectItem value="civil">Civil Engineering</SelectItem>
                        </SelectContent>
                    </Select>
                )}
            />
            {errors.branch && <p className="text-destructive text-xs">{errors.branch.message}</p>}
        </div>

        {role === 'student' && (
            <>
                 <div className="grid gap-2">
                    <Label htmlFor="year-of-study">Year of Study</Label>
                    <Controller
                        name="yearOfStudy"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger><SelectValue placeholder="Select your year" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1st Year</SelectItem>
                                    <SelectItem value="2">2nd Year</SelectItem>
                                    <SelectItem value="3">3rd Year</SelectItem>
                                    <SelectItem value="4">4th Year</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.yearOfStudy && <p className="text-destructive text-xs">{errors.yearOfStudy.message}</p>}
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="roll-number">Roll Number</Label>
                    <Input id="roll-number" placeholder="e.g., 21A91A0501" {...register("rollNumber")} />
                    {errors.rollNumber && <p className="text-destructive text-xs">{errors.rollNumber.message}</p>}
                </div>
            </>
        )}

        {role === 'alumni' && (
            <>
                 <div className="grid gap-2">
                    <Label htmlFor="pass-out-year">Year of Passed Out</Label>
                     <Controller
                        name="passOutYear"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger><SelectValue placeholder="Select your passing year" /></SelectTrigger>
                                <SelectContent>
                                    {years.map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.passOutYear && <p className="text-destructive text-xs">{errors.passOutYear.message}</p>}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="working-status">Working Status</Label>
                    <Input id="working-status" placeholder="e.g., Software Engineer at Google" {...register("workingStatus")} />
                    {errors.workingStatus && <p className="text-destructive text-xs">{errors.workingStatus.message}</p>}
                </div>
            </>
        )}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Creating Account...' : 'Create an account'}
        </Button>
      </div>
    </form>
  );
}

    