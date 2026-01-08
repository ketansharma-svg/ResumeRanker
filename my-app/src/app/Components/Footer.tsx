import Link from 'next/link';
import { FileTextIcon } from 'lucide-react';

export default function Footer() {
  return (
    <>

      <footer className="bg-gray-900 text-white py-12 px-4 md:px-8 ">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-12 mb-10">
            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0e8ca2]">
                  <FileTextIcon className="text-white" size={20} />
                </div>
                <div className="text-2xl md:text-3xl font-black">ResumeRanker</div>
              </div>
              <p className="text-sm opacity-80 text-center md:text-left max-w-md">
                Empowering job seekers AI powered from the ground up
              </p>
            </div>

            <nav className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8 lg:gap-12">
              <Link href="/" className="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200">Home</Link>
              <Link href="/MainFolder/uploadResume" className="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200">Upload Resume</Link>
              <Link href="/MainFolder/loginPage" className="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200">Login</Link>
              
              {/* <Link href="/contact" className="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200">Contact Us</Link> */}
            </nav>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            &copy; 2025 ResumeRanker. All rights reserved By Ketan Sharma (MERN STACK DEVELOPER).
          </div>
        </div>
      </footer>
    </>
  );
}
