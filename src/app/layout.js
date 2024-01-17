import { Work_Sans } from "next/font/google";
import "./globals.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

const worksans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Page Turner",
  description: "Manage your library from anywhere",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={worksans.className}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
