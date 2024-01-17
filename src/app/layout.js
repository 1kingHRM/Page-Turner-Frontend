import { Work_Sans } from "next/font/google";
import "./globals.css";

import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";

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

const theme = createTheme({
  colors: {
    brown: ["#D4894A", "#EED8BA", "#341008"],
    light: ["#FCF1D1"],

    deepBlue: ["#E9EDFC", "#C1CCF6", "#99ABF0" /* ... */],
    blue: ["#E9EDFC", "#C1CCF6", "#99ABF0" /* ... */],
  },

  // shadows: {
  //   md: "1px 1px 3px rgba(0, 0, 0, .25)",
  //   xl: "5px 5px 3px rgba(0, 0, 0, .25)",
  // },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body className={worksans.className}>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
