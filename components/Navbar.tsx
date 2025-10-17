"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
	{ href: "/", label: "Home" },
	{ href: "/library", label: "Library" },
	{ href: "/compare", label: "Compare" },
	{ href: "/scenarios", label: "Scenarios" },
	{ href: "/ask-ai", label: "Ask AI" },
	{ href: "/about", label: "About" },
];

export default function Navbar() {
	const pathname = usePathname();
	return (
		<header className="header">
			<div className="container-base header-inner" style={{ animation: "fadeIn 300ms ease-out both" }}>
				<Link href="/" style={{ fontWeight: 600, color: "#e5e7eb", textDecoration: "none" }}>
					<span style={{ color: "#8b5cf6" }}>PM</span> ASM1
				</Link>
				<nav style={{ display: "flex", gap: "0.5rem" }}>
					{links.map((l) => {
						const active = pathname === l.href;
						return (
							<Link
								key={l.href}
								href={l.href}
								style={{
									padding: "0.5rem 0.75rem",
									borderRadius: "0.5rem",
									fontSize: "0.875rem",
									fontWeight: 500,
									color: active ? "#93c5fd" : "#cbd5e1",
									background: active ? "rgba(59,130,246,0.15)" : "transparent",
									textDecoration: "none",
									transition: "transform 120ms ease, background 120ms ease",
								}}
							>
								{l.label}
							</Link>
						);
					})}
				</nav>
			</div>
		</header>
	);
}
