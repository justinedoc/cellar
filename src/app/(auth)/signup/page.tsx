import GridPattern from "@/components/ui/grid-pattern";
import ReturnButton from "@/components/ui/return-button";
import FormsWrapper from "./_components/forms-wrapper";

function Signup() {
  return (
    <section className="relative flex h-screen items-center justify-center p-4">
      <ReturnButton />
      <GridPattern />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      <FormsWrapper />
    </section>
  );
}

export default Signup;
