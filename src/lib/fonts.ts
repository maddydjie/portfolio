import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

// Display / headings — editorial serif. opsz is applied automatically via
// font-optical-sizing; SOFT/WONK are the extra Fraunces axes we expose.
export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK"],
});

// Body — neutral sans.
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Code / technical labels.
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
