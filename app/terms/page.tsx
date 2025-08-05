import Link from "next/link";

export default function TermsPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <h1 className="text-4xl font-bold fontgenos mt-6">Terms of Service</h1>
            <section className="px-10 md:px-16 my-4">
                <h2 className="text-xl font-semibold mt-6 mb-2">1. Service Overview</h2>
                <p className="m-4">
                    We offer parcel pickup, transportation, and delivery services not only across the country but also internationally. While we strive for timely and safe delivery, delays may occur due to traffic, weather, or logistical issues.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">2. User Responsibilities</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>You must provide accurate and complete shipment information.</li>
                    <li>Proper packaging is your responsibility to avoid damage during delivery.</li>
                    <li>Prohibited items (e.g., hazardous, illegal, perishable) must not be sent.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-2">3. Pricing and Payment</h2>
                <p className="m-4">
                    Prices are shown before order confirmation and may include service fees or taxes. Payments can be made via accepted methods (e.g., card, mobile payment, or COD). Prices are subject to change without notice.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">4. Pickup and Delivery</h2>
                <p className="m-4">
                    Ensure someone is available at the pickup and delivery locations at scheduled times. Missed deliveries may result in additional charges for re-delivery.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">5. Liability</h2>
                <p className="m-4">
                    We are not liable for loss or damage due to poor packaging, prohibited items, or events beyond our control. Compensation for lost or damaged items is based on declared value after investigation.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">6. Refund and Cancellation</h2>
                <p className="m-4">
                    Orders can be canceled before pickup. Eligible refunds are processed within 7 business days. No refunds are given for completed deliveries.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">7. Intellectual Property</h2>
                <p className="m-4">
                    All website content, including design, logos, and branding, is the property of [Your Courier Company Name] and may not be copied or reused without written permission.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">8. Privacy</h2>
                <p className="m-4">
                    We collect minimal personal data to operate our services. See our <Link href="/privacy" className="text-blue-500 underline">Privacy Policy</Link> for full details.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">9. Modifications</h2>
                <p className="m-4">
                    These Terms may be updated at any time. Continued use of our service implies your agreement to the updated Terms.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">10. Contact</h2>
                <p className="txt-gray-700">
                    For questions or support, contact us at: <br />
                    <span>
                        📧 Email : <Link href="mailto:support@bahok-courier34@gmail" className="text-blue-500 underline">support@bahok-courier34@gmail.com</Link> <br />
                    </span>
                    <span>
                        📞 Phone: <a href="tel:+8801XXXXXXXXX" className="text-blue-500 underline">+8801XXXXXXXXX</a>
                    </span>

                </p>
            </section>
        </main>
    );
}