import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { DialogFooter } from "@/components/ui/dialog";
import Link from "next/link";

type FormFooterProps = {
  mode: "card" | "dialog";
};

function FormFooter({ mode }: FormFooterProps) {
  const Wrapper = mode === "card" ? CardFooter : DialogFooter;

  return (
    <Wrapper className="mx-auto">
      <p className="text-muted-foreground text-center text-sm">
        Registered?
        <Link href="/signin" passHref>
          <Button variant="link" className="text-foreground px-1" asChild>
            <span>Sign In</span>
          </Button>
        </Link>
      </p>
    </Wrapper>
  );
}

export default FormFooter;
