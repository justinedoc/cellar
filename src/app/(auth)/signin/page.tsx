import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import SignInForm from "./_components/signin-form";

function Signin() {
  return (
    <Card
      className={cn(
        "w-full bg-transparent backdrop-blur-2xl sm:w-auto sm:min-w-[25rem]",
      )}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-bold md:text-3xl">
          Sign In
        </CardTitle>
        <CardDescription className="font-base">
          Welcome back! Let's finish where we left off
        </CardDescription>
      </CardHeader>
      <SignInForm />
    </Card>
  );
}

export default Signin;
