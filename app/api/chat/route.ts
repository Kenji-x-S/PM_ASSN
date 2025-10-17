import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const GEMINI_API_KEY = "AIzaSyB1VmTtashTf6pkolR_4nksRh-siXdIuxQ";
    const MODEL = "models/gemini-2.5-flash";

    // Accept either:
    //  - freeform chat: { prompt } or { scenario, messages }
    //  - structured process request: { mode: "process", scenarioPreset, optionalContext }
    const incoming = await req.json().catch(() => ({}));
    const promptFromClient: string | undefined = incoming?.prompt;
    const scenario: string = incoming?.scenario ?? "";
    const messages: Array<{ role: string; content: string }> = Array.isArray(incoming?.messages) ? incoming.messages : [];
    const mode: string | undefined = incoming?.mode;
    const scenarioPreset: string | undefined = incoming?.scenarioPreset;
    const optionalContext: string = incoming?.optionalContext ?? "";

    // System instruction to stay true to the three books
    const systemPreamble = `You are an assistant that ONLY uses guidance strictly from these three sources: PMBOK 7 (Project Management Institute), PRINCE2, and ISO 21500. If the user asks for anything outside these, politely say you can only answer based on those sources. Be concise, actionable, and reference the source by name and section/topic where possible. If uncertain, say so.`;

    const dialogue = messages
      .map((m) => `${(m.role || "user").toUpperCase()}: ${m.content}`)
      .join("\n\n");

    // If client requests a structured process generator, force strict JSON output
    const processJsonSpec = `
Return ONLY a single JSON object with these fields (no commentary):
{
  "phases": [
    { "name": string, "objectives": string[], "activities": string[] }
  ],
  "keyActivities": string[],
  "roles": [ { "role": string, "responsibilities": string[] } ],
  "artifacts": string[],
  "decisionGates": [ { "gate": string, "criteria": string[] } ],
  "references": {
    "pmbok": string[],
    "prince2": string[],
    "iso21500_21502": string[]
  },
  "tailoringJustification": string[]
}`;

    const presetDescriptions: Record<string, string> = {
      custom_software: `Custom Software Development Project. Context: Well-defined requirements, under 6 months, under 7 team members. Deliverable: Lightweight process optimized for speed and flexibility.`,
      innovative_product: `Innovative Product Development Project. Context: R&D-heavy, uncertain outcomes, ~1-year duration. Deliverable: Hybrid/adaptive process balancing innovation, iteration, and stakeholder management.`,
      gov_project: `Large Government Project. Context: Civil, electrical, and IT components, 2-year duration. Deliverable: Comprehensive process covering governance, compliance, procurement, risk management, and reporting.`,
    };

    const fullPrompt = mode === "process"
      ? `${systemPreamble}\n\nPROJECT SCENARIO (choose relevant practices from PMBOK7, PRINCE2, ISO 21500/21502):\n${presetDescriptions[scenarioPreset || ""] || scenarioPreset || "(unspecified scenario)"}\n\nOPTIONAL CONTEXT:\n${optionalContext || "(none)"}\n\nREQUIREMENTS:\n- Generate phases, key activities, roles/responsibilities, artifacts/deliverables, decision gates, explicit references to standards (with sections or themes if possible), and tailoring justification for inclusions/omissions.\n- Keep it concise but complete and pragmatic.\n- The process must be appropriate to the scenario.\n- ${processJsonSpec}`
      : (promptFromClient && typeof promptFromClient === "string" && promptFromClient.trim().length > 0
        ? `${systemPreamble}\n\n${promptFromClient.trim()}`
        : `${systemPreamble}\n\nSCENARIO:\n${scenario || "(not provided)"}\n\nDIALOGUE:\n${dialogue}`);

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

    // Try to coerce JSON if mode === "process"
    if (mode === "process") {
      const tryTexts: string[] = [];
      if (typeof output === "string") tryTexts.push(output);
      // Extract JSON fenced code if present
      const jsonMatch = typeof output === "string" ? output.match(/```json\s*([\s\S]*?)\s*```/i) : null;
      if (jsonMatch && jsonMatch[1]) tryTexts.unshift(jsonMatch[1]);
      for (const t of tryTexts) {
        try {
          const parsed = JSON.parse(t);
          return NextResponse.json({ structured: parsed, raw: result });
        } catch {}
      }
      // Fallback to text if JSON parse failed
      return NextResponse.json({ reply: output, raw: result });
    }

    // Unified shape for chat frontend
    return NextResponse.json({ reply: output, raw: result });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || String(error) }, { status: 500 });
  }
}
