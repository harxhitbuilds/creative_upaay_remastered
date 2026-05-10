import NavFooter from "@/components/navigation/nav-footer";
import Navbar from "@/components/navigation/navbar";

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <NavFooter />
    </>
  );
}
