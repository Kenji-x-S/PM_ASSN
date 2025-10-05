import Link from "next/link";

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
			<section className="grid grid-4">
                <Link href="/library" className="card p-5" style={{ textDecoration: "none", color: "#e5e7eb" }}>
                    <h3 style={{ fontWeight: 700, color: "#e5e7eb" }}>Library</h3>
                    <p className="text-sm" style={{ marginTop: "0.25rem", color: "#cbd5e1" }}>View and search the four standards. PDFs render in-browser.</p>
				</Link>
                <Link href="/compare" className="card p-5" style={{ textDecoration: "none", color: "#e5e7eb" }}>
                    <h3 style={{ fontWeight: 700, color: "#e5e7eb" }}>Compare</h3>
                    <p className="text-sm" style={{ marginTop: "0.25rem", color: "#cbd5e1" }}>Select a topic to see side-by-side comparisons.</p>
				</Link>
                <Link href="/scenarios" className="card p-5" style={{ textDecoration: "none", color: "#e5e7eb" }}>
                    <h3 style={{ fontWeight: 700, color: "#e5e7eb" }}>Scenarios</h3>
                    <p className="text-sm" style={{ marginTop: "0.25rem", color: "#cbd5e1" }}>Practice with realistic project situations and apply standards.</p>
				</Link>
                <Link href="/about" className="card p-5" style={{ textDecoration: "none", color: "#e5e7eb" }}>
                    <h3 style={{ fontWeight: 700, color: "#e5e7eb" }}>About</h3>
                    <p className="text-sm" style={{ marginTop: "0.25rem", color: "#cbd5e1" }}>Project purpose, team, and references.</p>
				</Link>
			</section>
		</div>
	);
}
