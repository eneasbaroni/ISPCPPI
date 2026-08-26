import type { Metadata } from "next";
import { Titillium_Web, Anton, Inter } from "next/font/google";
import localfont from "next/font/local";
import "./globals.css";
import "./presupuesto/Presupuesto.css";
import "./_components/Loader/Loader.css";
import Header from "./_components/Header/Header";
import Footer from "./_components/Footer/Footer";

//Google fonts
const titilium = Titillium_Web({
    subsets: ["latin"],
    weight: ["200", "300", "400", "600", "700", "900"],
    variable: "--font-titilium",
});

const anton = Anton({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-anton",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

// Fuentes locales
const monument = localfont({
    src: [
        {
            path: "../fonts/MonumentGrotesk-Light.otf",
            weight: "300",
            style: "light",
        },
        {
            path: "../fonts/MonumentGrotesk-Regular.otf",
            weight: "400",
            style: "normal",
        },
    ],
    variable: "--font-monument",
});

const apercuPro = localfont({
    src: [
        {
            path: "../fonts/ApercuPro-Regular.ttf",
            weight: "400",
            style: "normal",
        },
    ],
    variable: "--font-apercu-pro",
});

export const metadata: Metadata = {
    title: "Proyecto integrador",
    description: "Proyecto integrador ISPC",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="es"
            className={`${monument.variable} ${apercuPro.variable} ${titilium.variable} ${anton.variable} ${inter.variable} relative`}
        >
            <body className="min-h-full flex flex-col">
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
