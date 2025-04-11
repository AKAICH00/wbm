import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen relative">
      {/* Background with blue gradient and grid pattern */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        zIndex: -10
      }}>
        {/* Decorative Grid */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px',
        }} />
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-500 opacity-20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-indigo-600 opacity-20 blur-3xl" />
      </div>
      
      {/* Content */}
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-xl relative z-10">
        <div className="text-center">
          <Link href="/" className="inline-block mb-6">
            <div className="text-xl font-bold text-blue-900">
              <div className="flex flex-col items-center">
                <span>Wealth Builder</span>
                <span>Mortgage Educators</span>
              </div>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your account
          </p>
        </div>
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-sm normal-case"
            }
          }}
          redirectUrl="/dashboard" 
        />
      </div>
    </div>
  );
} 