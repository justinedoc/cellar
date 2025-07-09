import Image from "next/image";
import Banner from "../globals/banner";
import { Button } from "../ui/button";
import GridPattern from "../ui/grid-pattern";
import { Spotlight } from "../ui/spotlight";

function Hero() {
  return (
    <div>
      <Banner>
        <GridPattern />

        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="white"
        />

        <Banner.Header className="mt-20">
          <Banner.Title>
            Get Access to Powerful Books and Real-Time Memos
          </Banner.Title>
          <Banner.Description>
            A complete library of professional training books and daily memos
            designed to keep you informed, skilled, and ahead in your field.
          </Banner.Description>
          <Banner.CTA>
            <Button variant="outline" size="lg">
              Create A Bay
            </Button>
            <Button size="lg">Get Started</Button>
          </Banner.CTA>
        </Banner.Header>

        <Banner.OverlayImg
          src={"/images/hero-overlay.png"}
          alt="hero"
          loading="eager"
          className="top-0 mt-16 hidden w-[85%] md:block"
        />
      </Banner>

      <div className="relative mx-auto mt-4 max-w-[60rem] md:mt-8">
        <Image
          src={"/images/dashboard-img.png"}
          alt="Dashboard Image of cellar"
          width={1000}
          height={1000}
          priority
        />
      </div>
    </div>
  );
}

export default Hero;
