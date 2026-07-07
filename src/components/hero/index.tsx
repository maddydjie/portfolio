import { HeroA } from "./hero-a";
import { HeroB } from "./hero-b";
import { HeroC } from "./hero-c";

export function Hero({ variant }: { variant: "a" | "b" | "c" }) {
  if (variant === "b") return <HeroB />;
  if (variant === "c") return <HeroC />;
  return <HeroA />;
}
