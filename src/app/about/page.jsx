
import AboutCTASection from "@/components/about/AboutCTASection";
import AboutHero from "@/components/about/AboutHero";
import ChairmanAboutSection from "@/components/about/ChairmanAboutSection";
import ChairmanStorySection from "@/components/about/ChairmanStorySection";
import JourneyTimelineSection from "@/components/about/JourneyTimelineSection";
import WhoWeAreSection from "@/components/about/WhoWeAreSection";
import ChairmanSection from "@/components/home/ChairmanSection";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhoWeAreSection />
      <JourneyTimelineSection />
      <ChairmanStorySection />
      {/* <ChairmanSection /> */}
      {/* <ChairmanAboutSection /> */}
      <AboutCTASection />
    </>
  );
}