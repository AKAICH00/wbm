import React from 'react';
import Link from 'next/link';
import NavBar from '@/components/NavBar';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-blue-900">Privacy Policy</h1>
          <p className="text-gray-600 mt-2">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        <section className="mb-8 bg-white rounded-lg shadow-md border border-blue-100 p-6">
          <h2 className="text-2xl font-semibold mb-3 text-blue-800">1. Introduction</h2>
          <p className="text-gray-700 mb-3">
            Welcome to Wealth Builder Mortgage Educators ("we", "us", "our"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us.
          </p>
          <p className="text-gray-700">
            This privacy policy applies to all information collected through our website and/or any related services, sales, marketing or events (we refer to them collectively in this privacy policy as the "Services").
          </p>
        </section>

        <section className="mb-8 bg-white rounded-lg shadow-md border border-blue-100 p-6">
          <h2 className="text-2xl font-semibold mb-3 text-blue-800">2. What Information Do We Collect?</h2>
          <p className="text-gray-700 mb-3">
            We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services or otherwise when you contact us.
          </p>
          <p className="text-gray-700">
            The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make and the products and features you use. The personal information we collect may include the following: Name, Contact Information (Email, Phone Number), Payment Information (processed via Stripe), Usage Data, Device Information, etc.
          </p>
        </section>

        <section className="mb-8 bg-white rounded-lg shadow-md border border-blue-100 p-6">
          <h2 className="text-2xl font-semibold mb-3 text-blue-800">3. How Do We Use Your Information?</h2>
          <p className="text-gray-700 mb-3">
            We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. These purposes include:
          </p>
          <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
            <li>To facilitate account creation and logon process.</li>
            <li>To manage user accounts.</li>
            <li>To send administrative information to you.</li>
            <li>To fulfill and manage your orders (including payment processing via Stripe).</li>
            <li>To respond to user inquiries/offer support to users.</li>
            <li>For fraud prevention and security.</li>
            <li>To comply with legal requirements (e.g., GDPR, CCPA).</li>
          </ul>
        </section>

        <section className="mb-8 bg-white rounded-lg shadow-md border border-blue-100 p-6">
          <h2 className="text-2xl font-semibold mb-3 text-blue-800">4. Will Your Information Be Shared With Anyone?</h2>
          <p className="text-gray-700 mb-3">
            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may share your data with third-party vendors, service providers, contractors or agents who perform services for us or on our behalf and require access to such information to do that work. Examples include:
          </p>
          <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
            <li>Payment Processing: We share payment data with Stripe, our payment processor.</li>
            <li>Authentication: We use Clerk for user authentication.</li>
          </ul>
          <p className="text-gray-700 mt-3">
            We require all third parties to respect the security of your personal data and to treat it in accordance with the law. We do not allow our third-party service providers to use your personal data for their own purposes and only permit them to process your personal data for specified purposes and in accordance with our instructions.
          </p>
        </section>
        
        <section className="mb-8 bg-white rounded-lg shadow-md border border-blue-100 p-6">
          <h2 className="text-2xl font-semibold mb-3 text-blue-800">5. Stripe's Role</h2>
          <p className="text-gray-700">
             As our payment processor, Stripe collects and processes certain payment and personal information directly from you. Stripe acts as a data processor for these transactions. We encourage you to review Stripe's Privacy Policy to understand their data handling practices.
          </p>
        </section>

        <section className="mb-8 bg-white rounded-lg shadow-md border border-blue-100 p-6">
          <h2 className="text-2xl font-semibold mb-3 text-blue-800">6. How Do We Keep Your Information Safe?</h2>
          <p className="text-gray-700">
            We aim to protect your personal information through a system of organizational and technical security measures. We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
          </p>
        </section>
        
        <section className="mb-8 bg-white rounded-lg shadow-md border border-blue-100 p-6">
          <h2 className="text-2xl font-semibold mb-3 text-blue-800">7. How Long Do We Keep Your Information?</h2>
          <p className="text-gray-700">
             We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).
          </p>
        </section>

        <section className="mb-8 bg-white rounded-lg shadow-md border border-blue-100 p-6">
          <h2 className="text-2xl font-semibold mb-3 text-blue-800">8. Your Privacy Rights</h2>
          <p className="text-gray-700 mb-3">
            Depending on your location (e.g., EEA, UK, California), you may have certain rights regarding your personal information under applicable data protection laws like GDPR or CCPA. These may include the right to access, correct, update, or request deletion of your personal information.
          </p>
          <p className="text-gray-700">To exercise these rights, please contact us using the contact details provided below.</p>
        </section>
        
        <section className="mb-8 bg-white rounded-lg shadow-md border border-blue-100 p-6">
          <h2 className="text-2xl font-semibold mb-3 text-blue-800">9. Use of Cookies</h2>
          <p className="text-gray-700">
             We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Our payment processor, Stripe, may also use cookies necessary for processing payments and fraud prevention. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policy [NOTE: You will need a separate Cookie Policy and link it here, or expand this section]. You will typically be informed via a cookie banner upon visiting our site.
          </p>
        </section>

        <section className="mb-8 bg-white rounded-lg shadow-md border border-blue-100 p-6">
          <h2 className="text-2xl font-semibold mb-3 text-blue-800">10. Updates To This Notice</h2>
          <p className="text-gray-700">
            We may update this privacy notice from time to time. The updated version will be indicated by an updated "Last Updated" date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.
          </p>
        </section>

        <section className="mb-8 bg-white rounded-lg shadow-md border border-blue-100 p-6">
          <h2 className="text-2xl font-semibold mb-3 text-blue-800">11. How Can You Contact Us About This Notice?</h2>
          <p className="text-gray-700 mb-3">
            If you have questions or comments about this notice, you may email us at [Your Contact Email] or by post to:
          </p>
          <p className="text-gray-700">Wealth Builder Mortgage Educators</p>
          <p className="text-gray-700">[Your Company Address]</p>
        </section>
      </main>

      <footer className="w-full p-4 text-center text-xs text-gray-600 border-t border-gray-200">
        <Link href="/" className="text-blue-600 hover:text-blue-800 hover:underline">Home</Link>
        <span className="mx-2">|</span>
        <span>© {new Date().getFullYear()} Wealth Builder Mortgage Educators</span>
      </footer>
    </div>
  );
} 