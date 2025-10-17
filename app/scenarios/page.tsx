"use client";
import { useMemo, useState } from "react";
import Accordion from "../../components/Accordion";
import { SCENARIO_LIST } from "../../data/scenarios";

type ScenarioKey = "custom_software" | "innovative_product" | "gov_project";

const CARD_HOVER_STYLE = {
    transition: "box-shadow 160ms ease, transform 160ms ease, border-color 160ms ease",
} as const;

export default function ScenariosPage() {
    const [active, setActive] = useState<ScenarioKey>("custom_software");

    const cards = useMemo(() => (
        SCENARIO_LIST.map((s) => {
            const key = s.key as ScenarioKey;
            const selected = key === active;
            return (
                <button
                    key={key}
                    onClick={() => setActive(key)}
                    className="card"
                    style={{
                        ...CARD_HOVER_STYLE,
                        textAlign: "left",
                        padding: "1rem",
                        borderRadius: 16,
                        border: selected ? "1px solid rgba(139,92,246,0.6)" : "1px solid rgba(148,163,184,0.15)",
                        background: selected ? "rgba(139,92,246,0.10)" : "rgba(2,6,23,0.45)",
                        color: "#e5e7eb",
                        boxShadow: selected ? "0 10px 28px rgba(139,92,246,0.25)" : "0 6px 22px rgba(0,0,0,0.25)",
                        width: "100%",
                        height: "100%",
                        minHeight: 168,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget.style.boxShadow = "0 12px 36px rgba(139,92,246,0.35)"); (e.currentTarget.style.transform = "translateY(-2px)"); }}
                    onMouseLeave={(e) => { (e.currentTarget.style.boxShadow = selected ? "0 10px 28px rgba(139,92,246,0.25)" : "0 6px 22px rgba(0,0,0,0.25)"); (e.currentTarget.style.transform = "none"); }}
                >
                    <div>
                        <div style={{ fontWeight: 800 }}>{s.title}</div>
                        <div className="text-sm" style={{ color: "#8b5cf6", marginTop: 4 }}>{s.context}</div>
                    </div>
                    <div className="text-sm" style={{ opacity: 0.9, marginTop: 6 }}>{s.deliverable}</div>
                </button>
            );
        })
    ), [active]);

    const current = useMemo(() => SCENARIO_LIST.find(s => s.key === active)!, [active]);

    return (
        <div className="space-y-6">
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#e5e7eb" }}>Process Proposal & Tailoring</h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12, alignItems: "stretch" }}>
                {cards}
            </div>

            <div className="card" style={{ padding: "1rem", borderRadius: 16, background: "rgba(2,6,23,0.5)" }}>
                <div style={{ color: "#cbd5e1", marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, color: "#e5e7eb" }}>{current.title}</span> — {current.context}
                </div>
                <div className="text-sm" style={{ opacity: 0.9 }}>{current.deliverable}</div>
            </div>

            <Accordion
                items={[
                    {
                        id: "phases",
                        title: "Phases",
                        content: (
                            <div className="space-y-4">
                                {current.data.phases.map((p, idx) => (
                                    <div key={idx} className="space-y-1">
                                        <div style={{ fontWeight: 700, color: "#e5e7eb" }}>{p.name}</div>
                                        {p.description ? (
                                            <div className="text-sm" style={{ color: "#cbd5e1" }}>{p.description}</div>
                                        ) : null}
                                        {p.references?.length ? (
                                            <div className="text-sm" style={{ color: "#8b5cf6" }}>Referenced Standards: {p.references.join(", ")}</div>
                                        ) : null}
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
                                {current.data.keyActivities.map((a, i) => (<li key={i}>{a}</li>))}
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
                                        <ul className="text-sm" style={{ color: "#cbd5e1", paddingLeft: 18, listStyle: "disc", marginTop: 4 }}>
                                            {r.responsibilities.map((res, j) => (<li key={j}>{res}</li>))}
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
                                {current.data.artifacts.map((a, i) => (<li key={i}>{a}</li>))}
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
                                {current.data.references.map((ref, i) => (<li key={i}>{ref}</li>))}
                            </ul>
                        ),
                    },
                    {
                        id: "tailoring",
                        title: "Tailoring Justification",
                        content: (
                            <ul className="text-sm" style={{ color: "#cbd5e1", paddingLeft: 18, listStyle: "disc" }}>
                                {current.data.tailoring.map((t, i) => (<li key={i}>{t}</li>))}
                            </ul>
                        ),
                    },
                ]}
            />
        </div>
    );
}
