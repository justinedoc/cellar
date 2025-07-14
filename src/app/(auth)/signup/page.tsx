import { Card } from "@/components/ui/card";
import SignUpFormsWrapper from "./_components/signup-forms-wrapper";

export const metadata = {
  title: "Cellar - Create Your Account",
};

function Signup() {
  return (
    <Card className="w-full bg-transparent backdrop-blur-2xl sm:w-[28rem]">
      <SignUpFormsWrapper as="card" />
    </Card>
  );
}

export default Signup;
