"use client";
import { useMemo, useState, useCallback, memo, useRef } from "react";
import Accordion from "../../components/Accordion";
import { SCENARIO_LIST } from "../../data/scenarios";

type ScenarioKey = "custom_software" | "innovative_product" | "gov_project";

/* ------------------ Merged Spotlight + Scenario Card ------------------ */
const ScenarioCard = memo(
	function ScenarioCard({
		scenario,
		isSelected,
		onSelect,
	}: {
		scenario: (typeof SCENARIO_LIST)[0];
		isSelected: boolean;
		onSelect: () => void;
	}) {
		const divRef = useRef<HTMLDivElement | null>(null);

		const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
			const rect = divRef.current!.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			divRef.current!.style.setProperty("--mouse-x", `${x}px`);
			divRef.current!.style.setProperty("--mouse-y", `${y}px`);
			divRef.current!.style.setProperty("--spotlight-color", "rgba(139, 92, 246, 0.35)");
		};

		const style: React.CSSProperties = {
			textAlign: "left",
			color: "#e5e7eb",
			cursor: "pointer",
			width: "100%",
			height: "100%",
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
			minHeight: "100%",
			transition: "all 160ms ease",
		};

		return (
			<button
				onClick={onSelect}
				style={{
					all: "unset",
					width: "100%",
					height: "100%",
					minHeight: "150px",
					cursor: "pointer",
				}}
			>
				<div
					ref={divRef}
					onMouseMove={handleMouseMove}
					className="card-spotlight"
					style={{
						position: "relative",
						transition: "box-shadow 160ms ease, transform 160ms ease, border-color 160ms ease",
						borderRadius: "1rem",
						padding: "1.25rem",
						width: "100%",
						height: "100%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						overflow: "hidden",
						willChange: "transform",
						border: isSelected ? "1px solid rgba(139,92,246,0.6)" : "1px solid transparent",
						backgroundColor: isSelected ? "rgba(139,92,246,0.10)" : "rgba(2,6,23,0.45)",
						boxShadow: isSelected ? "inset 0 0 20px rgba(139,92,246,0.25), 0 6px 22px rgba(0, 0, 0, 0.25)" : "0 6px 22px rgba(0, 0, 0, 0.25)",
					}}
				>
					<div style={style}>
						<div>
							<div style={{ fontWeight: 800 }}>{scenario.title}</div>
							<div className="text-sm" style={{ color: "#8b5cf6", marginTop: 4 }}>
								{scenario.context}
							</div>
						</div>
						<div className="text-sm" style={{ opacity: 0.9, marginTop: 6 }}>
							{scenario.deliverable}
						</div>
					</div>
				</div>
			</button>
		);
	},
	(prev, next) => prev.isSelected === next.isSelected
);

/* ------------------ Accordion Section ------------------ */
const AccordionSection = memo(function AccordionSection({
	current,
}: {
	current: (typeof SCENARIO_LIST)[0];
}) {
	const accordionItems = useMemo(
		() => [
			{
				id: "phases",
				title: "Phases",
				content: (
					<div className="space-y-4">
						{current.data.phases.map((p, idx) => (
							<div key={idx} className="space-y-1">
								<div style={{ fontWeight: 700, color: "#e5e7eb" }}>{p.name}</div>
								{p.description && (
									<div className="text-sm" style={{ color: "#cbd5e1" }}>
										{p.description}
									</div>
								)}
								{p.references?.length && (
									<div className="text-sm" style={{ color: "#8b5cf6" }}>
										Referenced Standards: {p.references.join(", ")}
									</div>
								)}
							</div>
						))}
					</div>
				),
				defaultOpen: true,
			},
			{
				id: "activities",
				title: "Key Activities",
				content: (
					<ul className="text-sm" style={{ color: "#cbd5e1", paddingLeft: 18, listStyle: "disc" }}>
						{current.data.keyActivities.map((a, i) => (
							<li key={i}>{a}</li>
						))}
					</ul>
				),
			},
			{
				id: "roles",
				title: "Roles & Responsibilities",
				content: (
					<div className="space-y-2">
						{current.data.roles.map((r, i) => (
							<div key={i}>
								<div style={{ fontWeight: 600, color: "#e5e7eb" }}>{r.role}</div>
								<ul
									className="text-sm"
									style={{ color: "#cbd5e1", paddingLeft: 18, listStyle: "disc", marginTop: 4 }}
								>
									{r.responsibilities.map((res, j) => (
										<li key={j}>{res}</li>
									))}
								</ul>
							</div>
						))}
					</div>
				),
			},
			{
				id: "artifacts",
				title: "Artifacts / Deliverables",
				content: (
					<ul className="text-sm" style={{ color: "#cbd5e1", paddingLeft: 18, listStyle: "disc" }}>
						{current.data.artifacts.map((a, i) => (
							<li key={i}>{a}</li>
						))}
					</ul>
				),
			},
			{
				id: "gates",
				title: "Decision Gates",
				content: (
					<div className="space-y-2">
						{current.data.decisionGates.map((g, i) => (
							<div key={i}>
								<div style={{ fontWeight: 600, color: "#e5e7eb" }}>{g.gate}</div>
							</div>
						))}
					</div>
				),
			},
			{
				id: "refs",
				title: "Referenced Standards",
				content: (
					<ul className="text-sm" style={{ color: "#cbd5e1", paddingLeft: 18, listStyle: "disc" }}>
						{current.data.references.map((ref, i) => (
							<li key={i}>{ref}</li>
						))}
					</ul>
				),
			},
			{
				id: "tailoring",
				title: "Tailoring Justification",
				content: (
					<ul className="text-sm" style={{ color: "#cbd5e1", paddingLeft: 18, listStyle: "disc" }}>
						{current.data.tailoring.map((t, i) => (
							<li key={i}>{t}</li>
						))}
					</ul>
				),
			},
		],
		[current]
	);

	return <Accordion items={accordionItems} />;
});

/* ------------------ Main Page ------------------ */
export default function ScenariosPage() {
	const [active, setActive] = useState<ScenarioKey>("custom_software");

	const handleSelectScenario = useCallback((key: ScenarioKey) => {
		setActive(key);
	}, []);

	const current = useMemo(() => SCENARIO_LIST.find((s) => s.key === active)!, [active]);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "1.5rem",
				maxWidth: "100%",
			}}
		>
			<h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#e5e7eb" }}>
				Process Proposal & Tailoring
			</h2>

			{/* Cards Grid - Fixed width with hardcoded sizes */}
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(3, 1fr)",
					gap: 12,
					alignItems: "stretch",
					width: "100%",
				}}
			>
				{SCENARIO_LIST.map((s) => (
					<ScenarioCard
						key={s.key}
						scenario={s}
						isSelected={s.key === active}
						onSelect={() => handleSelectScenario(s.key as ScenarioKey)}
					/>
				))}
			</div>

			{/* Selected Info */}
			<div
				className="card"
				style={{
					padding: "1rem",
					borderRadius: 16,
					background: "rgba(2,6,23,0.5)",
					maxWidth: "100%",
					alignSelf: "stretch",
				}}
			>
				<div style={{ color: "#cbd5e1", marginBottom: 6 }}>
					<span style={{ fontWeight: 700, color: "#e5e7eb" }}>{current.title}</span> —{" "}
					{current.context}
				</div>
				<div className="text-sm" style={{ opacity: 0.9 }}>
					{current.deliverable}
				</div>
			</div>

			{/* Accordion */}
			<div style={{ width: "100%", alignSelf: "stretch" }}>
				<AccordionSection current={current} />
			</div>
		</div>
	);
}