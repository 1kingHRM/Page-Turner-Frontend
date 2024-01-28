import { Goudy_Bookletter_1911 } from "next/font/google";
import "./globals.css";

import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";

const goudy = Goudy_Bookletter_1911({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata = {
  title: {
    template: "%s - Page Turner",
    default: "Page Turner",
  },
  description: "Download any book, anywhere, anytime.",
};

const mantineColors = [
  "#fff2e5",
  "#fae5d4",
  "#eecbad",
  "#e2ae81",
  "#d8955c",
  "#d38544",
  "#d17e37",
  "#b86a29",
  "#a55e22",
  "#905016",
];

const theme = createTheme({
  colors: { brown: mantineColors },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body className={goudy.className}>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
