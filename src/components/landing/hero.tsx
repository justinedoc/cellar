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
          className="-top-20 -left-35 md:-top-10 md:left-20"
          fill="#1919f6"
        />

        <Banner.Header>
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
            Build teams that think together, move faster, and stay in sync. Your
            organization deserves more than scattered docs and lost data
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
          className="top-50 left-1/2 w-[120%] -translate-x-1/2 md:top-40 md:w-[70%]"
        />
      </Banner>

      <div className="relative mx-auto mt-4 md:mt-8 md:max-w-[60rem]">
        <Image
          src={"/images/dashboard-img_2.png"}
          alt="Dashboard Image of cellar"
          width={1000}
          height={1000}
          priority
          className="rounded-lg border shadow-xl"
        />

        <StatsBanner />
      </div>
    </div>
  );
}

export default Hero;
