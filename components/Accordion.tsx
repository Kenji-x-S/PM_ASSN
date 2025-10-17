"use client";
import { useId, useState } from "react";

type AccordionItem = {
    id: string;
    title: string;
    content: React.ReactNode;
    defaultOpen?: boolean;
};

export default function Accordion({ items }: { items: AccordionItem[] }) {
    const [openIds, setOpenIds] = useState<Set<string>>(
        () => new Set(items.filter(i => i.defaultOpen).map(i => i.id))
    );
    const baseId = useId();

    function toggle(id: string) {
        setOpenIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    }

    return (
        <div className="space-y-3">
            {items.map((item) => {
                const open = openIds.has(item.id);
                const sectionId = `${baseId}-${item.id}-section`;
                const headerId = `${baseId}-${item.id}-header`;
                return (
                    <section key={item.id} className="card" style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 6px 24px rgba(0,0,0,0.25)", background: open ? "rgba(2,6,23,0.65)" : "rgba(2,6,23,0.5)" }}>
                        <button
                            id={headerId}
                            onClick={() => toggle(item.id)}
                            aria-expanded={open}
                            aria-controls={sectionId}
                            className="w-full"
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                                padding: "1rem 1.1rem",
                                color: "#e5e7eb",
                                cursor: "pointer",
                                background: open ? "rgba(139,92,246,0.10)" : "rgba(255,255,255,0.025)",
                                outline: "none",
                                border: "none",
                                transition: "background 220ms ease, color 220ms ease",
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    toggle(item.id);
                                }
                            }}
                        >
                            <span style={{ fontWeight: 800, letterSpacing: 0.2 }}>{item.title}</span>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ transition: "transform 220ms ease", transform: open ? "rotate(180deg)" : "rotate(0deg)", color: open ? "#8b5cf6" : "#cbd5e1" }}
                                aria-hidden
                            >
                                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <div
                            id={sectionId}
                            role="region"
                            aria-labelledby={headerId}
                            style={{
                                maxHeight: open ? 2000 : 0,
                                overflow: "hidden",
                                transition: "max-height 300ms ease, background 220ms ease",
                                borderTop: "1px solid rgba(148,163,184,0.12)",
                                background: open ? "rgba(139,92,246,0.08)" : "rgba(15,23,42,0.55)",
                            }}
                        >
                            <div style={{ padding: open ? "1rem 1.1rem 1.1rem" : "0 1.1rem", color: "#cbd5e1" }}>{item.content}</div>
                        </div>
                    </section>
                );
            })}
        </div>
    );
}


