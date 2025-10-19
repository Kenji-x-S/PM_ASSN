"use client";
import { useState, useMemo, useRef } from "react";
import data from "../../data/comparisonData.json";
import similarities from "../../data/similarities.json";
import differences from "../../data/differences.json";
import uniquePoints from "../../data/uniquePoints.json";
import SearchBar from "../../components/SearchBar";
import ComparisonTable from "../../components/ComparisonTable";
import { ChevronDown, Zap, Check, AlertCircle } from "lucide-react";

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
<div style={{ minHeight: "100vh", minWidth: "95vw",maxWidth: "95vw", background: "linear-gradient(135deg, rgba(2,6,23,0.95) 0%, rgba(15,23,42,0.95) 100%)", borderRadius: "1rem", border: "1px solid rgba(148,163,184,0.2)", transition: "border 0.3s ease", opacity: 1}}>
      <div className="space-y-8" style={{ padding: "2rem 1rem" }}>
        
        {/* Header Section */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ 
            fontSize: "1.5rem", 
            fontWeight: 700,
            color: "#e5e7eb",
            margin: 0,
          }}>
            Compare by Topic
          </h1>
        </div>

        {/* Search Section */}
        <div style={{
          maxWidth: "900px",
          margin: "0 auto",
          width: "100%",
        }}>
          <div
            onFocusCapture={() => setFocused(true)}
            style={{
              position: "relative",
            }}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Element)) {
                setFocused(false);
              }
            }}
          >
            <div style={{
              position: "relative",
              background: "rgba(30,41,59,0.8)",
              border: "1px solid rgba(148,163,184,0.2)",
              borderRadius: "0.75rem",
              padding: "0.75rem 1rem",
              backdropFilter: "blur(10px)",
              transition: "all 200ms ease",
            }}>
              <SearchBar
                placeholder="Search topics..."
                value={query}
                onChange={setQuery}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onSubmit={handleSubmit}
              />
            </div>

            {/* Dropdown suggestions */}
            {focused && suggestions.length > 0 && (
              <div
                style={{
                  marginTop: "0.5rem",
                  background: "rgba(30,41,59,0.95)",
                  border: "1px solid rgba(148,163,184,0.2)",
                  borderRadius: "0.75rem",
                  backdropFilter: "blur(10px)",
                  overflow: "hidden",
                  animation: "slideDown 150ms ease-out",
                  position: "relative", // Changed from absolute to relative
                  width: "100%",
                }}
              >
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {suggestions.map((s, idx) => (
                    <li key={s}>
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          setTopic(s);
                          setQuery(s);
                          setFocused(false);
                          inputRef.current?.blur();
                        }}
                        style={{
                          display: "block",
                          width: "100%",
                          textAlign: "left",
                          padding: "0.75rem 1rem",
                          background: "transparent",
                          border: 0,
                          cursor: "pointer",
                          color: "#e5e7eb",
                          borderRadius: 0,
                          borderBottom: idx < suggestions.length - 1 ? "1px solid rgba(148,163,184,0.1)" : "none",
                          transition: "background 150ms ease",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background =
                            "rgba(139,92,246,0.15)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background =
                            "transparent";
                        }}
                      >
                        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <Zap size={16} style={{ color: "#8b5cf6" }} />
                          {s}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        {topic ? (
          <>
            {/* Topic Info Card */}
            <div style={{
              background: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.3)",
              borderRadius: "1rem",
              padding: "1.5rem",
              marginBottom: "2rem",
              marginTop: "2rem",
              backdropFilter: "blur(10px)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                <Zap size={20} style={{ color: "#8b5cf6" }} />
                <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#e5e7eb", margin: 0 }}>
                  {topic}
                </h2>
              </div>
              <p style={{ color: "#cbd5e1", margin: 0, fontSize: "0.95rem" }}>
                Compare how each framework approaches {topic.toLowerCase()}. Select a standard to view detailed summaries and jump to the Library.
              </p>
            </div>

            {/* Comparison Table */}
            <div style={{ marginBottom: "3rem" }}>
              <style>{`
                .comparison-header {
                  background: linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(99,102,241,0.3) 100%) !important;
                  border-bottom: 2px solid rgba(139,92,246,0.5) !important;
                }
                .comparison-header th {
                  color: #e5e7eb !important;
                  font-weight: 700 !important;
                  padding: 1rem !important;
                }
              `}</style>
              <div style={{
                background: "linear-gradient(135deg, rgba(30,41,59,0.6) 0%, rgba(20,33,47,0.6) 100%)",
                border: "1px solid rgba(148,163,184,0.2)",
                borderRadius: "1rem",
                padding: "1.5rem",
                backdropFilter: "blur(10px)",
                overflow: "auto",
              }}>
                <ComparisonTable standards={standards} data={withPages} pages={pages} />
              </div>
            </div>

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
                <div className="space-y-8">
                  {/* Similarities */}
                  <section>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                      <Check size={24} style={{ color: "#10b981" }} />
                      <h3 style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "#e5e7eb",
                        margin: 0,
                      }}>
                        Similarities
                      </h3>
                    </div>
                    {sim.length > 0 ? (
                      <div style={{
                        background: "rgba(16,185,129,0.1)",
                        border: "1px solid rgba(16,185,129,0.3)",
                        borderRadius: "1rem",
                        padding: "1.5rem",
                        backdropFilter: "blur(10px)",
                      }}>
                        <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
                          {sim.map((p: string, idx: number) => (
                            <li
                              key={idx}
                              style={{
                                color: "#cbd5e1",
                                marginBottom: "0.75rem",
                                fontSize: "0.95rem",
                                lineHeight: "1.5",
                              }}
                            >
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
                        No similarities captured for this topic yet.
                      </p>
                    )}
                  </section>

                  {/* Differences */}
                  <section>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                      <AlertCircle size={24} style={{ color: "#f59e0b" }} />
                      <h3 style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "#e5e7eb",
                        margin: 0,
                      }}>
                        Key Differences
                      </h3>
                    </div>
                    {diff.length > 0 ? (
                      <div style={{
                        background: "rgba(245,158,11,0.1)",
                        border: "1px solid rgba(245,158,11,0.3)",
                        borderRadius: "1rem",
                        padding: "1.5rem",
                        backdropFilter: "blur(10px)",
                      }}>
                        <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
                          {diff.map((p: string, idx: number) => (
                            <li
                              key={idx}
                              style={{
                                color: "#cbd5e1",
                                marginBottom: "0.75rem",
                                fontSize: "0.95rem",
                                lineHeight: "1.5",
                              }}
                            >
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
                        No differences captured for this topic yet.
                      </p>
                    )}
                  </section>

                  {/* Unique Points */}
                  <section>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                      <Zap size={24} style={{ color: "#8b5cf6" }} />
                      <h3 style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "#e5e7eb",
                        margin: 0,
                      }}>
                        Unique Points
                      </h3>
                    </div>
                    {uniqStandards.length > 0 ? (
                      <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "1.5rem",
                      }}>
                        {uniqStandards.map((std) => (
                          <div
                            key={std}
                            style={{
                              background: "rgba(139,92,246,0.1)",
                              border: "1px solid rgba(139,92,246,0.3)",
                              borderRadius: "1rem",
                              padding: "1.5rem",
                              backdropFilter: "blur(10px)",
                              transition: "all 200ms ease",
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLDivElement).style.background = "rgba(139,92,246,0.15)";
                              (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(139,92,246,0.5)";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLDivElement).style.background = "rgba(139,92,246,0.1)";
                              (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(139,92,246,0.3)";
                            }}
                          >
                            <h4
                              style={{
                                margin: 0,
                                fontSize: "1rem",
                                fontWeight: 700,
                                color: "#93c5fd",
                                marginBottom: "1rem",
                              }}
                            >
                              {std}
                            </h4>
                            <ul
                              style={{
                                margin: 0,
                                paddingLeft: "1.25rem",
                              }}
                            >
                              {(uniq as any)[std].map((p: string, idx: number) => (
                                <li
                                  key={idx}
                                  style={{
                                    color: "#cbd5e1",
                                    marginBottom: "0.5rem",
                                    fontSize: "0.9rem",
                                    lineHeight: "1.4",
                                  }}
                                >
                                  {p}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
                        No unique points captured for this topic yet.
                      </p>
                    )}
                  </section>
                </div>
              );
            })()}
          </>
        ) : (
          <div style={{
            textAlign: "center",
            padding: "4rem 2rem",
            background: "rgba(30,41,59,0.5)",
            borderRadius: "1rem",
            border: "1px dashed rgba(148,163,184,0.2)",
          }}>
            <Zap size={48} style={{ color: "#8b5cf6", margin: "0 auto 1rem", opacity: 0.5 }} />
            <p style={{ color: "#cbd5e1", fontSize: "1.1rem", fontWeight: 500, margin: 0 }}>
              Search and select a topic to begin comparison
            </p>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "0.5rem" }}>
              Use the search bar above to find topics like "Risk Management" or "Scope Management"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}