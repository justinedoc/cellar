import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInForm from "./_components/signin-form";

export const metadata = {
  title: "Cellar - Signin To Your Account",
};

function Signin() {
  return (
    <Card className="w-full bg-transparent backdrop-blur-2xl sm:w-auto sm:min-w-[25rem]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold md:text-3xl">
          Sign In
        </CardTitle>
        <CardDescription className="font-base">
          Welcome back! Let's finish where we left off
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  );
}

export default Signin;
