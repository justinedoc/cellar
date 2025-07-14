import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type FormHeaderProps = {
  mode: "card" | "dialog";
};

function FormHeader({ mode }: FormHeaderProps) {
  const Wrapper = mode === "card" ? CardHeader : DialogHeader;
  const Title = mode === "card" ? CardTitle : DialogTitle;
  const Description = mode === "card" ? CardDescription : DialogDescription;

  return (
    <Wrapper className={cn({ "px-6": mode === "dialog" })}>
      <Title className={"text-2xl font-bold md:text-3xl"}>Sign Up</Title>
      <Description className="font-base">
        Create an account and think as one
      </Description>
    </Wrapper>
  );
}

export default FormHeader;
