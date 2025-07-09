import { TextShimmer } from "@/components/ui/text-shimmer";
import Image from "next/image";
import Link from "next/link";
import Banner from "../globals/banner";
import { Button } from "../ui/button";
import GridPattern from "../ui/grid-pattern";
import { Spotlight } from "../ui/spotlight";
import Tag from "../ui/tag";
import StatsBanner from "./stats-banner";

function Hero() {
  return (
    <div>
      <Banner>
        <GridPattern />

        <Spotlight
          className="-top-40 left-0 md:-top-10 md:left-20"
          fill="#1919f6"
        />

        <Banner.Header className="mt-20">
          <Link href={"#"}>
            <Tag>
              <TextShimmer className="font-mono text-sm" duration={2}>
                Filling your bookshelf...
              </TextShimmer>
            </Tag>
          </Link>

          <Banner.Title>
            Get Access to Powerful Books and Real-Time Memos
          </Banner.Title>
          <Banner.Description>
            A complete library of professional training books and daily memos
            designed to keep you informed, skilled, and ahead in your field.
          </Banner.Description>
          <Banner.CTA>
            <Link href="#">
              <Button size="lg">Get Started</Button>
            </Link>

            <Link href="#">
              <Button variant="outline" size="lg">
                Create A Bay
              </Button>
            </Link>
          </Banner.CTA>
        </Banner.Header>

        <Banner.OverlayImg
          src={"/images/hero-overlay.png"}
          alt="hero"
          loading="eager"
          className="top-40 hidden w-[70%] md:block"
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

        <StatsBanner />
      </div>
    </div>
  );
}

export default Hero;
