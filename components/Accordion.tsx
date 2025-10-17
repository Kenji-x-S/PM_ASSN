"use client";
import { useId, useState, memo, useCallback, useMemo, useRef, useLayoutEffect } from "react";

type AccordionItem = {
    id: string;
    title: string;
    content: React.ReactNode;
    defaultOpen?: boolean;
};

const HEADER_BUTTON_STYLE = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "1rem 1.1rem",
    color: "#e5e7eb",
    cursor: "pointer",
    outline: "none",
    border: "none",
    transition: "background 220ms ease, color 220ms ease",
} as const;

const TITLE_SPAN_STYLE = {
    fontWeight: 800,
    letterSpacing: 0.2,
} as const;

const SVG_STYLE = {
    transition: "transform 220ms ease",
} as const;

// Memoized AccordionItem component
const AccordionItemComponent = memo(
    function AccordionItem({
        item,
        open,
        onToggle,
        baseId,
    }: {
        item: AccordionItem;
        open: boolean;
        onToggle: () => void;
        baseId: string;
    }) {
        const contentRef = useRef<HTMLDivElement>(null);
        const [height, setHeight] = useState(0);

        // Use useLayoutEffect instead of useEffect to avoid double render
        // This runs synchronously after DOM mutations but before browser paint
        useLayoutEffect(() => {
            if (contentRef.current) {
                const newHeight = open ? contentRef.current.scrollHeight : 0;
                setHeight(newHeight);
            }
        }, [open]);

        const sectionId = `${baseId}-${item.id}-section`;
        const headerId = `${baseId}-${item.id}-header`;

        const handleKeyDown = useCallback(
            (e: React.KeyboardEvent<HTMLButtonElement>) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onToggle();
                }
            },
            [onToggle]
        );

        const headerStyle = useMemo(
            () => ({
                ...HEADER_BUTTON_STYLE,
                background: open ? "rgba(139,92,246,0.10)" : "rgba(255,255,255,0.025)",
            }),
            [open]
        );

        const svgStyle = useMemo(
            () => ({
                ...SVG_STYLE,
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                color: open ? "#8b5cf6" : "#cbd5e1",
            }),
            [open]
        );

        const containerStyle = useMemo(
            () => ({
                overflow: "hidden" as const,
                height: `${height}px`,
                transition: "height 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                borderTop: "1px solid rgba(148,163,184,0.12)",
                background: open ? "rgba(139,92,246,0.08)" : "rgba(15,23,42,0.55)",
            }),
            [height, open]
        );

        return (
            <section
                className="card"
                style={{
                    borderRadius: 20,
                    overflow: "hidden",
                    boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
                    background: open ? "rgba(2,6,23,0.65)" : "rgba(2,6,23,0.5)",
                }}
            >
                <button
                    id={headerId}
                    onClick={onToggle}
                    aria-expanded={open}
                    aria-controls={sectionId}
                    style={headerStyle}
                    onKeyDown={handleKeyDown}
                >
                    <span style={TITLE_SPAN_STYLE}>{item.title}</span>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={svgStyle}
                        aria-hidden
                    >
                        <path
                            d="M6 9l6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <div
                    id={sectionId}
                    role="region"
                    aria-labelledby={headerId}
                    style={containerStyle}
                >
                    <div ref={contentRef} style={{ padding: "1rem 1.1rem 1.1rem", color: "#cbd5e1" }}>
                        {item.content}
                    </div>
                </div>
            </section>
        );
    },
    (prev, next) => prev.open === next.open && prev.item === next.item
);

export default function Accordion({ items }: { items: AccordionItem[] }) {
    const [openIds, setOpenIds] = useState<Set<string>>(
        () => new Set(items.filter((i) => i.defaultOpen).map((i) => i.id))
    );
    const baseId = useId();

    const toggle = useCallback((id: string) => {
        setOpenIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    }, []);

    return (
        <div className="space-y-3">
            {items.map((item) => (
                <AccordionItemComponent
                    key={item.id}
                    item={item}
                    open={openIds.has(item.id)}
                    onToggle={() => toggle(item.id)}
                    baseId={baseId}
                />
            ))}
        </div>
    );
}