"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import "./SpotlightCard.css";

// SpotlightCard (ReactBits-based) with your original highlight color


const SpotlightCard = ({ children }: { children: React.ReactNode }) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const frame = useRef<number | null>(null);


  const handleMouseEnter = () => {
    if (divRef.current) setRect(divRef.current.getBoundingClientRect());
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rect || !divRef.current) return;
    if (frame.current !== null) cancelAnimationFrame(frame.current);

    frame.current = window.requestAnimationFrame(() => {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      divRef.current!.style.setProperty("--mouse-x", `${x}px`);
      divRef.current!.style.setProperty("--mouse-y", `${y}px`);
    });
  };

  const handleMouseLeave = () => {
    if (frame.current) cancelAnimationFrame(frame.current);
    if (divRef.current) {
      divRef.current.style.removeProperty("--mouse-x");
      divRef.current.style.removeProperty("--mouse-y");
    }
  };

  return (
    <div
      ref={divRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="card-spotlight"
    >
      {children}
    </div>
  );
};




// CardLink now uses SpotlightCard
const CardLink = ({
	href,
	title,
	description,
}: {
	href: string;
	title: string;
	description: string;
}) => {
	return (
		<Link
			href={href}
			style={{
				textDecoration: "none",
				color: "#e5e7eb",
				width: "100%",
				height: "100%",
			}}
		>
			<SpotlightCard>
				<h3 style={{ fontWeight: 700, color: "#e5e7eb", marginBottom: "0.25rem" }}>{title}</h3>
				<p className="text-sm" style={{ color: "#cbd5e1" }}>
					{description}
				</p>
			</SpotlightCard>
		</Link>
	);
};

export default function HomePage() {
	return (
		<div className="space-y-6" style={{ position: "relative" }}>
			<section className="text-center" style={{ paddingTop: "2.5rem" }}>
				<div
					className="book-glow book-float"
					style={{ marginInline: "auto", width: 96, height: 96 }}
				>
					<svg viewBox="0 0 64 64" width="96" height="96" aria-hidden>
						<defs>
							<linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
								<stop offset="0%" stopColor="#8b5cf6" />
								<stop offset="100%" stopColor="#3b82f6" />
							</linearGradient>
						</defs>
						<path
							d="M8 14c0-3 2.5-5 5.5-5H34v46H13.5C10.5 55 8 53 8 50V14z"
							fill="url(#g)"
						/>
						<path
							d="M56 14c0-3-2.5-5-5.5-5H30v46h20.5c3 0 5.5-2 5.5-5V14z"
							fill="#0ea5e9"
							opacity="0.2"
						/>
						<path d="M30 12v40" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" />
						<path d="M12 18h18" stroke="#fff" strokeOpacity="0.65" />
						<path d="M34 18h18" stroke="#fff" strokeOpacity="0.25" />
					</svg>
				</div>
				<h1
					style={{
						fontSize: "2.25rem",
						fontWeight: 800,
						color: "#e5e7eb",
					}}
				>
					Comparative Analysis and Process Design using PM Standards
				</h1>
				<p
					className="text-muted"
					style={{
						marginTop: "0.75rem",
						maxWidth: 768,
						marginInline: "auto",
						color: "#cbd5e1",
					}}
				>
					Explore PMBOK 7, PRINCE2, and ISO 21500. Search the library and compare topics across standards.
				</p>
			</section>

			<section
				className="grid"
				style={{
					gridTemplateColumns: "repeat(5, 1fr)",
					gap: "1rem",
				}}
			>
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
