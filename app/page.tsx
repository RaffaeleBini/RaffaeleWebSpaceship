import Hud from "@/components/Hud/Hud";
import { getPortfolioContent } from "@/lib/content";

export default function Page() {
  const content = getPortfolioContent();
  return <Hud content={content} />;
}
