import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";

function LandingPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid overflow-x-hidden">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default LandingPageLayout;
