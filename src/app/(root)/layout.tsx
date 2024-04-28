import Footer from "@/components/shared/Navigation/Footer";
import Header from "@/components/shared/Navigation/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex h-screen flex-col bg-custom-950">
      <Header />
      <main>{children}</main>
      <Footer />
    </section>
  );
}
