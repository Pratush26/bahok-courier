import "@/app/styles/style.css";

export default function PrivacyPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
        <h1 className="text-4xl font-bold fontgenos">Privacy Policy</h1>
        <section className="px-10 md:px-16 my-4">
        <section className="my-4">
        <p>
          Bahok Courier Service is committed to
          protecting your privacy. This Privacy Policy outlines how we collect,
          use, and protect your data when you use our website or services.
        </p>
      </section>

      <section className="my-4">
        <h2 className="text-xl font-semibold m-1">1. Information We Collect</h2>
        <ul className="list-disc list-inside ml-2 space-y-2">
          <li>Personal Info: name, phone, address, and email.</li>
          <li>Delivery Info: recipient details and delivery instructions.</li>
          <li>Payment Info: payment method (we do not store card details).</li>
          <li>Usage Data: IP address, browser info, and interaction data.</li>
        </ul>
      </section>

      <section className="my-4">
        <h2 className="text-xl font-semibold m-1">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside ml-2 space-y-2">
          <li>To process courier deliveries and bookings.</li>
          <li>To provide customer service and notifications.</li>
          <li>To improve user experience and website functionality.</li>
          <li>To comply with legal or regulatory requirements.</li>
        </ul>
      </section>

      <section className="my-4">
        <h2 className="text-xl font-semibold m-1">3. Sharing of Data</h2>
        <p>
          We do not sell or rent your data. We may share your data with:
        </p>
        <ul className="list-disc list-inside ml-2 space-y-2">
          <li>Our delivery partners and agents.</li>
          <li>Legal authorities when required by law.</li>
          <li>Third-party service providers (under strict privacy terms).</li>
        </ul>
      </section>

      <section className="my-4">
        <h2 className="text-xl font-semibold m-1">4. Data Security</h2>
        <p>
          We use industry-standard security measures to protect your personal
          data from unauthorized access, alteration, or disclosure.
        </p>
      </section>

      <section className="my-4">
        <h2 className="text-xl font-semibold m-1">5. Cookies</h2>
        <p>
          Our website may use cookies to enhance your browsing experience. You
          can manage cookie preferences through your browser settings.
        </p>
      </section>

      <section className="my-4">
        <h2 className="text-xl font-semibold m-1">6. Your Rights</h2>
        <ul className="list-disc list-inside ml-2 space-y-2">
          <li>Access or update your data anytime.</li>
          <li>Request deletion of your data.</li>
          <li>Withdraw your consent to data usage.</li>
        </ul>
      </section>

      <section className="my-4 flex flex-col items-start">
        <h2 className="text-xl font-semibold m-1">7. Contact Us</h2>
        <p>
          If you have any questions or concerns, feel free to contact us:
        </p>
        <span>Email: <a href="mailto:support@bahokcourier.com" className="text-blue-500 underline">support@bahokcourier.com</a></span>
        <span>Phone: <a href="tel:+8801XXXXXXXXX" className="text-blue-500 underline">+8801XXXXXXXXX</a></span>
      </section>
      </section>
        </main>
    );
}