import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import SignInForm from "./_components/create-bay-form";

export const metadata = {
  title: "Cellar - Signin To Your Account",
};

function CreateBay() {
  return (
    <Card
      className={cn(
        "w-full bg-transparent backdrop-blur-2xl sm:w-auto sm:min-w-[25rem]",
      )}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-bold md:text-3xl">
          Create a Bay
        </CardTitle>
        <CardDescription className="font-base">
          Create a Bay and keep your team together
        </CardDescription>
      </CardHeader>
      <SignInForm />
    </Card>
  );
}

export default CreateBay;
