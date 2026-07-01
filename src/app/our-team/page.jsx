// app/our-team/page.jsx
import TeamHero from "@/components/team/TeamHero";
import TeamGridSection from "@/components/team/TeamGridSection";
import ChairmanSection from "@/components/home/ChairmanSection";
import JoinTeamCTA from "@/components/team/JoinTeamCTA";


export default function TeamPage() {
  return (
    <>
      <TeamHero />
      <ChairmanSection />
      <TeamGridSection />
      <JoinTeamCTA />
    </>
  );
}