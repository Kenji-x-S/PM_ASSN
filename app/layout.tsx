import "../styles/globals.css";
import type { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
	title: "Comparative Analysis and Process Design using PM Standards",
	description: "Explore, compare, and derive insights from PMBOK7, PRINCE2, ISO21502, and ISO21500.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
            <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                <Navbar />
                <main className="container-base" style={{ paddingTop: "6rem", paddingBottom: "3rem", flex: 1 }}>{children}</main>
                <Footer />
			</body>
		</html>
	);
}
