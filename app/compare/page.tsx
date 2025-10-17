"use client";
import { useState, useMemo, useRef } from "react";
import data from "../../data/comparisonData.json";
import similarities from "../../data/similarities.json";
import differences from "../../data/differences.json";
import uniquePoints from "../../data/uniquePoints.json";
import SearchBar from "../../components/SearchBar";
import ComparisonTable from "../../components/ComparisonTable";

// Example pages per standard per topic (placeholders)
const TOPIC_PAGES: Record<string, Record<string, number>> = {
  "Risk Management": { PRINCE2: 120, PMBOK7: 95, ISO21500: 40 },
  "Stakeholder Engagement": { PRINCE2: 60, PMBOK7: 50, ISO21500: 25 },
  "Scope Management": { PRINCE2: 70, PMBOK7: 110, ISO21500: 50 },
  "Quality Management": { PRINCE2: 80, PMBOK7: 130, ISO21500: 60 },
  "Schedule Management": { PRINCE2: 90, PMBOK7: 140, ISO21500: 70 },
};

export default function ComparePage() {
  const topics = data.topics;
  const standards = ["PRINCE2", "PMBOK7", "ISO21500"];

  const [topic, setTopic] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);

  // Reference for the search input (to blur on dropdown click)
  const inputRef = useRef<HTMLInputElement | null>(null);

  const suggestions = useMemo(() => {
    const defaults = topics.slice(0, 5);
    const q = query.trim().toLowerCase();
    if (!q) return defaults;
    return topics
      .filter((t) => t.toLowerCase().startsWith(q))
      .slice(0, 5);
  }, [topics, query]);

  const current = useMemo(() => {
    return (data.comparisons as any)[topic] as Record<
      string,
      { summary: string; pdf: string }
    >;
  }, [topic]);

  const pages = TOPIC_PAGES[topic] || {};

  const withPages = useMemo(() => {
    if (!current) return {};
    const result: Record<string, { summary: string; pdf: string }> = {};
    for (const key in current) {
      result[key] = { summary: current[key].summary, pdf: current[key].pdf };
    }
    return result;
  }, [current]);

  const handleSubmit = (val: string) => {
    const match =
      topics.find((t) => t.toLowerCase() === val.toLowerCase()) ||
      topics.find((t) => t.toLowerCase().startsWith(val.toLowerCase())) ||
      topics[0];
    if (match) setTopic(match);
    setFocused(false);
  };

  return (
    <div className="space-y-6">
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0f172a" }}>
          Compare by Topic
        </h2>

        <div
          style={{
            width: "80vw",
            maxWidth: "80vw",
            margin: "0 auto",
            padding: "0 1rem",
          }}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(e) => {
            // Defocus only when focus leaves container entirely
            if (!e.currentTarget.contains(e.relatedTarget as Element)) {
              setFocused(false);
            }
          }}
        >
          <SearchBar
            placeholder="Search topics..."
            value={query}
            onChange={setQuery}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onSubmit={handleSubmit}
          />

          {/* Dropdown suggestions */}
          {focused && suggestions.length > 0 && (
            <div
              className="card dropdown-enter-active"
              style={{ marginTop: "0.5rem", padding: "0.25rem 0.25rem" }}
            >
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {suggestions.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()} // prevent blur before click
                      onClick={() => {
                        setTopic(s);
                        setQuery(s);
                        setFocused(false);
                        inputRef.current?.blur(); // manually blur input
                      }}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        padding: "0.5rem 0.75rem",
                        background: "transparent",
                        border: 0,
                        cursor: "pointer",
                        color: "#e5e7eb",
                        borderRadius: "0.5rem",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "rgba(147,197,253,0.12)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "transparent";
                      }}
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Results */}
      {topic && (
        <>
          <p className="text-sm text-muted">
            Select a topic to see side-by-side summaries across standards. Use
            "Open in PDF" to jump to the Library view.
          </p>

          <ComparisonTable standards={standards} data={withPages} pages={pages} />

          <p className="text-sm text-muted">
            Deep-link pages are example placeholders. You can adjust the page
            number in the Library.
          </p>

          {/* Insights Section */}
          {(() => {
            const sim =
              (similarities as any).items?.find(
                (i: any) => i.topic === topic
              )?.points ?? [];
            const diff =
              (differences as any).items?.find(
                (i: any) => i.topic === topic
              )?.points ?? [];
            const uniq =
              (uniquePoints as any).items?.find(
                (i: any) => i.topic === topic
              )?.unique ?? {};
            const uniqStandards = Object.keys(uniq);

            return (
              <div className="space-y-6">
                {/* Similarities */}
                <section className="space-y-4">
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "#e5e7eb",
                      margin: 0,
                    }}
                  >
                    Similarities
                  </h3>
                  {sim.length > 0 ? (
                    <div className="card p-4">
                      <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
                        {sim.map((p: string, idx: number) => (
                          <li
                            key={idx}
                            className="text-sm"
                            style={{ color: "#cbd5e1" }}
                          >
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-muted">
                      No similarities captured for this topic yet.
                    </p>
                  )}
                </section>

                {/* Differences */}
                <section className="space-y-4">
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "#e5e7eb",
                      margin: 0,
                    }}
                  >
                    Key Differences
                  </h3>
                  {diff.length > 0 ? (
                    <div className="card p-4">
                      <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
                        {diff.map((p: string, idx: number) => (
                          <li
                            key={idx}
                            className="text-sm"
                            style={{ color: "#cbd5e1" }}
                          >
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-muted">
                      No differences captured for this topic yet.
                    </p>
                  )}
                </section>

                {/* Unique Points */}
                <section className="space-y-4">
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "#e5e7eb",
                      margin: 0,
                    }}
                  >
                    Unique Points
                  </h3>
                  {uniqStandards.length > 0 ? (
                    <div className="grid grid-4">
                      {uniqStandards.map((std) => (
                        <div key={std} className="card p-4">
                          <h4
                            style={{
                              margin: 0,
                              fontSize: 14,
                              fontWeight: 700,
                              color: "#93c5fd",
                            }}
                          >
                            {std}
                          </h4>
                          <ul
                            style={{
                              marginTop: "0.5rem",
                              paddingLeft: "1.25rem",
                            }}
                          >
                            {(uniq as any)[std].map((p: string, idx: number) => (
                              <li
                                key={idx}
                                className="text-sm"
                                style={{ color: "#cbd5e1" }}
                              >
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted">
                      No unique points captured for this topic yet.
                    </p>
                  )}
                </section>
              </div>
            );
          })()}
        </>
      )}
    </div>
  );
}
