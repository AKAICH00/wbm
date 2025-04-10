import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Create Your Account</h1>
          <p className="mt-2 text-sm text-gray-600">
            Join WealthBuilder Mortgage to access premium investment resources
          </p>
        </div>
        <SignUp
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