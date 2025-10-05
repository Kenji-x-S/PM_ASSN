import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const GEMINI_API_KEY = "AIzaSyB1VmTtashTf6pkolR_4nksRh-siXdIuxQ";
    const MODEL = "models/gemini-2.5-flash";

    // Accept either { prompt } or { scenario, messages }
    const incoming = await req.json().catch(() => ({}));
    const promptFromClient: string | undefined = incoming?.prompt;
    const scenario: string = incoming?.scenario ?? "";
    const messages: Array<{ role: string; content: string }> = Array.isArray(incoming?.messages) ? incoming.messages : [];

    // System instruction to stay true to the three books
    const systemPreamble = `You are an assistant that ONLY uses guidance strictly from these three sources: PMBOK 7 (Project Management Institute), PRINCE2, and ISO 21500. If the user asks for anything outside these, politely say you can only answer based on those sources. Be concise, actionable, and reference the source by name and section/topic where possible. If uncertain, say so.`;

    const dialogue = messages
      .map((m) => `${(m.role || "user").toUpperCase()}: ${m.content}`)
      .join("\n\n");

    const fullPrompt = promptFromClient && typeof promptFromClient === "string" && promptFromClient.trim().length > 0
      ? `${systemPreamble}\n\n${promptFromClient.trim()}`
      : `${systemPreamble}\n\nSCENARIO:\n${scenario || "(not provided)"}\n\nDIALOGUE:\n${dialogue}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    const body = {
      contents: [
        {
          role: "user",
          parts: [{ text: fullPrompt }],
        },
      ],
    } as const;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const raw = await response.text();
    let result: any = {};
    try { result = JSON.parse(raw); } catch { /* leave as text */ }

    if (!response.ok) {
      return NextResponse.json({ error: "Gemini request failed", status: response.status, detail: result || raw }, { status: 502 });
    }

    const output = result?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text).filter(Boolean).join("\n\n")
      ?? result?.candidates?.[0]?.content?.parts?.[0]?.text
      ?? "No output.";

    // Unified shape for the frontend
    return NextResponse.json({ reply: output, raw: result });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || String(error) }, { status: 500 });
  }
}
