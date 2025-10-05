"use client";
import { useState, useRef } from "react";

type ChatMessage = { role: "user" | "assistant"; content: string };

export default function ScenariosPage() {
    const [scenario, setScenario] = useState<string>("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const listRef = useRef<HTMLDivElement | null>(null);

    async function send() {
        const text = input.trim();
        if (!text) return;
        const nextMessages = [...messages, { role: "user", content: text } as ChatMessage];
        setMessages(nextMessages);
        setInput("");
        setLoading(true);
        try {
            const resp = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ scenario, messages: nextMessages })
            });
            const data = await resp.json().catch(() => ({} as any));
            const reply = resp.ok ? ((data?.reply as string) || "(No response)") : (`Error: ${data?.error ?? "Request failed"}${data?.status ? ` (${data.status})` : ""}\n${typeof data?.detail === "string" ? data.detail : JSON.stringify(data?.detail ?? {}, null, 2)}`);
            setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
            setTimeout(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }); }, 0);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-6">
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#e5e7eb" }}>Scenario Assistant (Gemini, constrained to PMBOK 7, PRINCE2, ISO 21500)</h2>
            <div className="card p-5" style={{ display: "grid", gridTemplateRows: "auto 1fr auto", height: "70vh" }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input
                        className="input"
                        placeholder="Describe your scenario (context, constraints, goals)…"
                        value={scenario}
                        onChange={(e) => setScenario(e.target.value)}
                    />
                </div>
                <div ref={listRef} style={{ overflow: "auto", marginTop: 12, padding: "0.5rem", background: "rgba(2,6,23,0.5)", borderRadius: 8 }}>
                    {messages.map((m, idx) => (
                        <div key={idx} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 8 }}>
                            <div className="card p-4" style={{ maxWidth: 720, background: m.role === "user" ? "rgba(59,130,246,0.25)" : "rgba(17,24,39,0.7)" }}>
                                <div className="text-sm" style={{ whiteSpace: "pre-wrap", color: "#e5e7eb" }}>{m.content}</div>
                            </div>
                        </div>
                    ))}
                    {loading ? <div className="text-sm" style={{ color: "#93c5fd" }}>Thinking…</div> : null}
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 12 }}>
                    <input
                        className="input"
                        placeholder="Ask a question or request guidance…"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") send(); }}
                    />
                    <button className="btn" onClick={send} disabled={loading}>Send</button>
                </div>
            </div>
        </div>
    );
}
