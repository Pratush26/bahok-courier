import Link from "next/link";

export default function DutyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
        <Link href="/bahok" className="hover:underline flex items-center justify-center w-full my-2">
          Home
        </Link>
        {children}
    </div>
  );
}