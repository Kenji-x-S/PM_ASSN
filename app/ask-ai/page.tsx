"use client";
import { useEffect, useRef, useState } from "react";

type ChatMessage = { sender: "user" | "ai"; text: string };

function escapeHtml(input: string): string {
    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function applyInlineMarkdown(input: string): string {
    let out = input.replace(/`([^`]+)`/g, (_m, p1) => `<code>${escapeHtml(p1)}</code>`);
    out = out.replace(/\*\*([^*]+)\*\*/g, (_m, p1) => `<strong>${p1}</strong>`);
    out = out.replace(/(^|\s)\*([^*][^]*?)\*(?=\s|$)/g, (_m, p1, p2) => `${p1}<em>${p2}</em>`);
    return out;
}

function formatMarkdownToHtml(markdown: string): string {
    if (!markdown) return "";
    const codeBlocks: string[] = [];
    let tmp = markdown.replace(/```([\s\S]*?)```/g, (_m, p1) => {
        const html = `<pre><code>${escapeHtml(String(p1))}</code></pre>`;
        codeBlocks.push(html);
        return `§§CODEBLOCK_${codeBlocks.length - 1}§§`;
    });
    const lines = tmp.split(/\r?\n/);
    const out: string[] = [];
    let inList = false;
    for (const raw of lines) {
        const line = raw.replace(/\s+$/g, "");
        if (line.trim() === "") {
            if (inList) { out.push("</ul>"); inList = false; }
            out.push("<br/>");
            continue;
        }
        const heading = line.match(/^(#{1,6})\s+(.*)$/);
        if (heading) {
            if (inList) { out.push("</ul>"); inList = false; }
            const level = heading[1].length;
            const content = applyInlineMarkdown(escapeHtml(heading[2]));
            out.push(`<h${level}>${content}</h${level}>`);
            continue;
        }
        const list = line.match(/^[-*]\s+(.*)$/);
        if (list) {
            if (!inList) { out.push("<ul>"); inList = true; }
            const content = applyInlineMarkdown(escapeHtml(list[1]));
            out.push(`<li>${content}</li>`);
            continue;
        }
        const content = applyInlineMarkdown(escapeHtml(line));
        out.push(`<p>${content}</p>`);
    }
    if (inList) out.push("</ul>");
    let html = out.join("\n");
    html = html.replace(/§§CODEBLOCK_(\d+)§§/g, (_m, idx) => codeBlocks[Number(idx)] || "");
    return html;
}

export default function AskAIPage() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { sender: "ai", text: "Hi! How can I assist you today?" },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const chatRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = chatRef.current;
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }, [messages, loading]);

    async function send() {
        const text = input.trim();
        if (!text || loading) return;
        const next = [...messages, { sender: "user", text } as ChatMessage];
        setMessages(next);
        setInput("");
        setLoading(true);
        try {
            const apiMessages = next.map((m) => ({ role: m.sender === "user" ? "user" : "assistant", content: m.text }));
            const resp = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: apiMessages })
            });
            const data = await resp.json();
            const replyText = resp.ok ? (String(data?.reply ?? "(No response)")) : (`Error: ${data?.error || "Request failed"}`);
            setMessages((prev) => [...prev, { sender: "ai", text: replyText }]);
        } finally {
            setLoading(false);
        }
    }

    function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.preventDefault();
            send();
        }
    }

    return (
        <div style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}>
            <div style={{ marginTop: "-6rem", paddingTop: "4.25rem", marginBottom: "-3rem" }}>
                <div style={{ display: "flex", flexDirection: "column", height: "calc((100vh - 4.5rem - 3.25rem) * 0.9)", overflow: "hidden", width: "100%", maxWidth: "1295px", margin: "0 auto" }}>
                    <header style={{ background: "#6d28d9", color: "#fff", fontWeight: 700, fontSize: "1.05rem", padding: "0.45rem 0.8rem", boxShadow: "0 6px 16px rgba(0,0,0,0.2)", marginBottom: 2, width: "100%", borderRadius: 8 }}>
                        Ask AI – Project Process Assistant
                    </header>
                    <div ref={chatRef} style={{ flex: 1, overflowY: "auto", padding: "0.45rem", display: "flex", flexDirection: "column", gap: 8, background: "rgba(255,255,255,0.06)", width: "100%", borderRadius: 8 }}>
                        {messages.map((m, i) => (
                            <div key={i} className="fade-in" style={{ display: "flex", justifyContent: m.sender === "user" ? "flex-end" : "flex-start", width: "100%" }}>
                                <div
                                    style={{
                                        maxWidth: "78%",
                                        background: m.sender === "user" ? "#7c3aed" : "#f1f5f9",
                                        color: m.sender === "user" ? "#fff" : "#0f172a",
                                        padding: "0.55rem 0.75rem",
                                        borderRadius: 16,
                                        boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
                                    }}
                                >
                                    {m.sender === "ai" ? (
                                        <div dangerouslySetInnerHTML={{ __html: formatMarkdownToHtml(m.text) }} />
                                    ) : (
                                        <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <span style={{ color: "#8b5cf6" }}>AI is thinking…</span>
                            </div>
                        )}
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", borderTop: "1px solid rgba(148,163,184,0.25)", padding: "0.45rem", background: "rgba(2,6,23,0.35)", width: "100%", borderRadius: 8 }}>
                        <input
                            type="text"
                            className="input"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKey}
                        />
                        <button className="btn" onClick={send} disabled={loading}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


