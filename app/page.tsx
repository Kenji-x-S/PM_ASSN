"use client";
import Link from "next/link";

const CardLink = ({ href, title, description }: { href: string; title: string; description: string }) => {
	const handleCardHover = (e: React.MouseEvent<HTMLAnchorElement>, isEnter: boolean) => {
		const element = e.currentTarget;
		if (isEnter) {
			element.style.boxShadow = "0 12px 36px rgba(139,92,246,0.35)";
			element.style.transform = "translateY(-2px)";
		} else {
			element.style.boxShadow = "0 6px 22px rgba(0,0,0,0.25)";
			element.style.transform = "none";
		}
	};

	return (
		<Link
			href={href}
			className="card p-5"
			style={{
				textDecoration: "none",
				color: "#e5e7eb",
				transition: "box-shadow 160ms ease, transform 160ms ease, border-color 160ms ease",
				boxShadow: "0 6px 22px rgba(0,0,0,0.25)",
			}}
			onMouseEnter={(e) => handleCardHover(e, true)}
			onMouseLeave={(e) => handleCardHover(e, false)}
		>
			<h3 style={{ fontWeight: 700, color: "#e5e7eb" }}>{title}</h3>
			<p className="text-sm" style={{ marginTop: "0.25rem", color: "#cbd5e1" }}>{description}</p>
		</Link>
	);
};

export default function HomePage() {
	return (
		<div className="space-y-6" style={{ position: "relative" }}>
			<section className="text-center" style={{ paddingTop: "2.5rem" }}>
				<div className="book-glow book-float" style={{ marginInline: "auto", width: 96, height: 96 }}>
					<svg viewBox="0 0 64 64" width="96" height="96" aria-hidden>
						<defs>
							<linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
								<stop offset="0%" stopColor="#8b5cf6"/>
								<stop offset="100%" stopColor="#3b82f6"/>
							</linearGradient>
						</defs>
						<path d="M8 14c0-3 2.5-5 5.5-5H34v46H13.5C10.5 55 8 53 8 50V14z" fill="url(#g)"/>
						<path d="M56 14c0-3-2.5-5-5.5-5H30v46h20.5c3 0 5.5-2 5.5-5V14z" fill="#0ea5e9" opacity="0.2"/>
						<path d="M30 12v40" stroke="#fff" strokeOpacity="0.5" strokeWidth="2"/>
						<path d="M12 18h18" stroke="#fff" strokeOpacity="0.65"/>
						<path d="M34 18h18" stroke="#fff" strokeOpacity="0.25"/>
					</svg>
				</div>
				<h1 style={{ fontSize: "2.25rem", fontWeight: 800, color: "#e5e7eb" }}>
					Comparative Analysis and Process Design using PM Standards
				</h1>
				<p className="text-muted" style={{ marginTop: "0.75rem", maxWidth: 768, marginInline: "auto", color: "#cbd5e1" }}>
					Explore PMBOK 7, PRINCE2, and ISO 21500. Search the library and compare topics across standards.
				</p>
			</section>
			<section className="grid" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
				<CardLink 
					href="/library"
					title="Library"
					description="View and search the three standards. PDFs render in-browser."
				/>
				<CardLink 
					href="/compare"
					title="Compare"
					description="Select a topic to see side-by-side comparisons."
				/>
				<CardLink 
					href="/scenarios"
					title="Scenarios"
					description="Practice with realistic project situations and apply standards."
				/>
				<CardLink 
					href="/ask-ai"
					title="Ask AI Assistant"
					description="Get personalized guidance and interactive AI-powered assistance for tailoring processes to your unique project needs."
				/>
				<CardLink 
					href="/about"
					title="About"
					description="Project purpose, team, and references."
				/>
			</section>
		</div>
	);
}