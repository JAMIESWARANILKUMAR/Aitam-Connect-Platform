
import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import placeholderImages from "@/lib/placeholder-images.json";

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[380px] gap-6">
           <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p className="text-balance text-muted-foreground">
              Enter your credentials to access the community
            </p>
          </div>
          <LoginForm />
          <div className="mt-4 text-center text-sm text-muted-foreground">
             <Image 
                src="https://i.ibb.co/L0Y0bVn/google-cloud-firebase.png"
                alt="Google Cloud and Firebase"
                width={300}
                height={100}
                className="mx-auto mb-4 object-contain"
                />
            <div className="flex items-center justify-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 512 512" fill="currentColor"><path fill="#fbbc05" d="M123.6,391.5c-20.3-32.3-32.4-71-32.4-112.5c0-29.8,5.9-58.5,16.7-84.6L49.3,138.8C18.1,184.8,0,244.6,0,306.4C0,392.2,46.3,466.5,114.7,500.4z"/><path fill="#ea4335" d="M492.8,256c0-21.2-1.9-41.9-5.4-62H251.1v119.4h134.8c-5.8,38.8-23.4,72-49.3,92.5l85.4,66c49.3-45.3,77-111,77-185.3c0-10.9-1-21.6-1.9-32.3H251.1V132.8h238.5c11.3,31.4,17.4,65.4,17.4,101.6C507,243.8,500.8,250.3,492.8,256z"/><path fill="#34a853" d="M114.7,11.8c34-11.4,71.1-17.8,110.1-17.8c61.8,0,119.5,21.5,164.1,59.3l-85.4,66c-27.2-25.9-63.5-41.6-103.5-41.6c-41.5,0-80.2,12.1-112.5,32.4L49.3,73.5C76,33,125.8,0,183,0c22.5,0,44.4,3.2,65.8,9.2L114.7,11.8z"/><path fill="#4285f4" d="M500.4,123.6L427,183c-11-8.2-23.5-14.8-37-19.4L502,59.3C505,80,507,101.6,507,123.6C507,123.6,507,123.6,500.4,123.6z"/></svg>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 512 512" fill="currentColor"><path fill="#ffca28" d="M83.4,152.2l-48,47.9c-3.2,3.2-3.2,8.3,0,11.4L184,360.2l48.5-47.4L83.4,152.2z"/><path fill="#ffa000" d="M433,261.7l-48,47.9c-3.2,3.2-3.2,8.3,0,11.4l74.6,73.9c3.2,3.2,8.3,3.2,11.4,0l48-47.9c3.2-3.2,3.2-8.3,0-11.4L433,261.7z"/><path fill="#ffc107" d="M184,111.8l-98.5,97.3l48,47.9l99.1-97.8L184,111.8z"/><path fill="#ffb300" d="M232.5,159.2l99.1,97.8l48-47.9l-98.5-97.3L232.5,159.2z"/><path fill="#f57c00" d="M184,360.2L36.8,211.5L0,247.9l172.5,170.3c6.2,6.2,16.4,6.2,22.6,0l59.1-58.1L184,360.2z"/></svg>
                Secured by Google Firebase
            </div>
            <p className="mt-2">
                Identity Platform is Google Cloud's complete customer identity solution, built in partnership with Firebase.
            </p>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src={placeholderImages.loginPage.url}
          alt="AITAM College"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
          data-ai-hint={placeholderImages.loginPage.dataAiHint}
        />
      </div>
    </div>
  );
}
