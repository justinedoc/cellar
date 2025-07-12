import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import FormsWrapper from "./_components/forms-wrapper";

function Signup() {
  return (
    <Card
      className={cn("w-full bg-transparent backdrop-blur-2xl sm:w-[28rem]")}
    >
      <FormsWrapper />
    </Card>
  );
}

export default Signup;
