import { TextShimmer } from "@/components/ui/text-shimmer";
import Image from "next/image";
import Link from "next/link";
import Banner from "../globals/banner";
import { Button } from "../ui/button";
import GridPattern from "../ui/grid-pattern";
import { Spotlight } from "../ui/spotlight";
import Tag from "../ui/tag";

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
              <TextShimmer className="font-mono text-sm">
                Organizing the chaos...
              </TextShimmer>
            </Tag>
          </Link>

          <Banner.Title className="py-2">
            Stay Aligned <br />
            Stay Connected.
          </Banner.Title>
          <Banner.Description>
            Unify your organization's knowledge and execution in one
            intelligent, real-time workspace.
          </Banner.Description>
          <Banner.CTA>
            <Link href="/signup">
              <Button size="lg">Get Started</Button>
            </Link>

            <Link href="create-bay">
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

        {/* <StatsBanner /> */}
      </div>
    </div>
  );
}

export default Hero;
