import DotPattern from "@/components/ui/dot-pattern";
import ReturnButton from "@/components/ui/return-button";
import SignInForm from "./_components/signin-form";

function Signin() {
  return (
    <section className="relative flex h-screen items-center justify-center p-4">
      <ReturnButton />
      <DotPattern />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      <SignInForm />
    </section>
  );
}

export default Signin;
