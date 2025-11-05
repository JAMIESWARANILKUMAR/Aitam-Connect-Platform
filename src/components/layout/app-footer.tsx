
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Book, Building2, Facebook, Instagram, Linkedin, Mail, MapPin, Newspaper, Phone, Trophy, Twitter, User, Users, Users2, Youtube, ImageIcon, ShieldCheck, FileText, Gavel, Cookie, Globe, MessageSquareQuote, LayoutTemplate } from "lucide-react";
import placeholderImages from "@/lib/placeholder-images.json";


export function AppFooter() {
  return (
    <footer className="bg-slate-900 text-slate-200 py-12">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo and Socials */}
          <div className="flex flex-col gap-4">
             <Image
              src="https://cdn.jumpshare.com/images/AtpYWE8GBPEVfWnMRei1.png"
              alt="AITAM Connect Logo"
              width={180}
              height={180}
              className="bg-white p-2 rounded-md"
            />
            <p className="text-sm text-slate-400">
              The ultimate platform for students, alumni, and faculty to connect, share knowledge, and grow together.
            </p>
            <div className="flex gap-4 mt-2">
              <Link href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook className="w-6 h-6" /></Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter className="w-6 h-6" /></Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin className="w-6 h-6" /></Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram className="w-6 h-6" /></Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors"><Youtube className="w-6 h-6" /></Link>
            </div>
            <Link href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="mt-4">
              <Image 
                src="https://tse3.mm.bing.net/th/id/OIP.m71HBwO3IL7eu3taHUEW0wHaCj?pid=Api&P=0&h=180" 
                alt="Get it on Google Play"
                width={150}
                height={50}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="link" className="text-slate-400 justify-start p-0 h-auto hover:text-white transition-colors">
                    <Link href="https://adityatekkali.edu.in/" target="_blank" rel="noopener noreferrer"><Globe className="mr-2 h-4 w-4" />Official Website</Link>
                </Button>
                <Button asChild variant="link" className="text-slate-400 justify-start p-0 h-auto hover:text-white transition-colors">
                    <Link href="/dashboard/qna"><MessageSquareQuote className="mr-2 h-4 w-4" />Q&A Forum</Link>
                </Button>
                 <Button asChild variant="link" className="text-slate-400 justify-start p-0 h-auto hover:text-white transition-colors">
                    <Link href="/dashboard/ppt-maker"><LayoutTemplate className="mr-2 h-4 w-4" />PPT Maker</Link>
                </Button>
                 <Button asChild variant="link" className="text-slate-400 justify-start p-0 h-auto hover:text-white transition-colors">
                    <Link href="/dashboard/resume-builder"><FileText className="mr-2 h-4 w-4" />Resume Builder</Link>
                </Button>
                <Button asChild variant="link" className="text-slate-400 justify-start p-0 h-auto hover:text-white transition-colors">
                    <Link href="#gallery"><ImageIcon className="mr-2 h-4 w-4" />Gallery</Link>
                </Button>
                <Button asChild variant="link" className="text-slate-400 justify-start p-0 h-auto hover:text-white transition-colors">
                    <Link href="#news"><Newspaper className="mr-2 h-4 w-4" />News</Link>
                </Button>
                <Button asChild variant="link" className="text-slate-400 justify-start p-0 h-auto hover:text-white transition-colors">
                    <Link href="#alumni"><Users className="mr-2 h-4 w-4" />Alumni</Link>
                </Button>
                <Button asChild variant="link" className="text-slate-400 justify-start p-0 h-auto hover:text-white transition-colors">
                    <Link href="#leadership"><User className="mr-2 h-4 w-4" />Leadership</Link>
                </Button>
                <Button asChild variant="link" className="text-slate-400 justify-start p-0 h-auto hover:text-white transition-colors">
                    <Link href="#deans"><Users2 className="mr-2 h-4 w-4" />Deans</Link>
                </Button>
                <Button asChild variant="link" className="text-slate-400 justify-start p-0 h-auto hover:text-white transition-colors">
                    <Link href="#achievements"><Trophy className="mr-2 h-4 w-4" />Achievements</Link>
                </Button>
                <Button asChild variant="link" className="text-slate-400 justify-start p-0 h-auto hover:text-white transition-colors">
                    <Link href="#placements"><Building2 className="mr-2 h-4 w-4" />Placements</Link>
                </Button>
                 <Button asChild variant="link" className="text-slate-400 justify-start p-0 h-auto hover:text-white transition-colors">
                    <Link href="#"><Book className="mr-2 h-4 w-4" />Blogs</Link>
                </Button>
            </div>
          </div>

          {/* Column 3: Contact Info & Address */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-white">Contact & Address</h3>
             <div>
              <p className="font-semibold">For General Inquiry:</p>
              <a href="mailto:info@aitamconnect.adityatekkali.in" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                info@aitamconnect.adityatekkali.in
              </a>
            </div>
            <div>
              <p className="font-semibold">For Support &amp; Queries:</p>
              <a href="mailto:support@aitamconnectadityatekkali.in" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                support@aitamconnectadityatekkali.in
              </a>
            </div>
            <div>
              <p className="font-semibold">Call:</p>
              <p className="flex items-center gap-2 text-slate-400">
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </p>
            </div>
            <div className="flex items-start gap-2 mt-2">
              <MapPin className="w-5 h-5 mt-1 text-slate-400 flex-shrink-0" />
              <p className="text-slate-400">
                Aditya Institute of Technology and Management, K. Kotturu, Tekkali, Srikakulam Dist., A.P. - 532201
              </p>
            </div>
             <div className="mt-2">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.360143894254!2d84.2415172148946!3d18.647794987335683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3d5bbf3a000001%3A0x4c204961d5535355!2sAditya%20Institute%20of%20Technology%20and%20Management%20(AITAM)!5e0!3m2!1sen!2sin!4v1628249856501!5m2!1sen!2sin"
                    width="100%"
                    height="150"
                    style={{ border:0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-md"
                ></iframe>
            </div>
          </div>

          {/* Column 4: Legal */}
          <div className="flex flex-col gap-4 rounded-lg bg-slate-800/50 p-4 transform transition-all duration-300 hover:scale-105 hover:bg-slate-800">
            <h3 className="text-lg font-bold text-white flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-cyan-400"/>Legal</h3>
             <ul className="flex flex-col gap-2">
                <li>
                    <Link href="/privacy-policy" className="flex items-center text-slate-400 hover:text-white hover:translate-x-1 transition-all">
                        <FileText className="mr-3 h-5 w-5 text-cyan-400/70"/> Privacy Policy
                    </Link>
                </li>
                <li>
                    <Link href="/terms-of-service" className="flex items-center text-slate-400 hover:text-white hover:translate-x-1 transition-all">
                        <Gavel className="mr-3 h-5 w-5 text-cyan-400/70"/> Terms of Service
                    </Link>
                </li>
                <li>
                    <Link href="/cookie-policy" className="flex items-center text-slate-400 hover:text-white hover:translate-x-1 transition-all">
                        <Cookie className="mr-3 h-5 w-5 text-cyan-400/70"/> Cookie Policy
                    </Link>
                </li>
                <li>
                    <Link href="/aup" className="flex items-center text-slate-400 hover:text-white hover:translate-x-1 transition-all">
                        <Book className="mr-3 h-5 w-5 text-cyan-400/70"/> Acceptable Use Policy
                    </Link>
                </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="container mx-auto px-4 md:px-6 mt-8 pt-6 border-t border-slate-700">
            <div className="flex flex-col sm:flex-row justify-between items-center text-center text-sm text-slate-400">
                <p>© 2025 AITAM Connect. All Rights Reserved.</p>
                 <div className="flex items-center gap-2 mt-4 sm:mt-0">
                    <Image
                      src={placeholderImages.jamiProfile.url}
                      alt="Developer Avatar"
                      width={32}
                      height={32}
                      className="rounded-full"
                      data-ai-hint="profile picture"
                    />
                    <p className="text-sm text-slate-400 mt-1">
                      Developed & Designed by Vyntyra Consultancy Services Pvt. Ltd
                    </p>
                </div>
            </div>
        </div>
      </footer>
  );
}
