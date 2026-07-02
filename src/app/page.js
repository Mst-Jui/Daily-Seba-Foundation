// import Banner from "@/components/home/Banner";
import CounterSection from "@/components/home/CounterSection";



import MembershipSection from "@/components/home/MembershipSection";
import ChairmanSection from "@/components/home/ChairmanSection";
import DealerFormSection from "@/components/home/DealerFormSection";
import FAQSection from "@/components/home/FAQSection";
import ImpactGallerySection from "@/components/home/ImpactGallerySection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import ProcessStepsSection from "@/components/home/ProcessStepsSection";
import PackageSection from "@/components/home/PackageSection";
import Banner from "@/components/home/Banner";



export default function Home() {
  return (
    <div>
      <Banner />
      <CounterSection />
      <PackageSection />
      <MembershipSection />
      <FAQSection />
      <ImpactGallerySection />
      <WhyChooseUsSection />
      <ProcessStepsSection />
      <ChairmanSection />
      <DealerFormSection />
    </div>
  );
}
