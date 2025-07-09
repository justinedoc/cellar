import { ArrowRight } from "lucide-react";
import Logo from "../globals/logo";
import Box from "../ui/box";
import { Button } from "../ui/button";
import NavMenu from "./nav-menu";

function Navbar() {
  return (
    <nav className="fixed left-1/2 z-[100] mt-2 flex w-full max-w-[85%] -translate-x-1/2 items-center justify-between rounded-full border px-4 py-1.5 backdrop-blur-2xl">
      <Logo />
      <NavMenu />

      <Box>
        <Button size="sm" variant={"secondary"}>
          Sign in
        </Button>
        <Button size="sm">
          Sign up <ArrowRight />
        </Button>
      </Box>
    </nav>
  );
}

export default Navbar;
