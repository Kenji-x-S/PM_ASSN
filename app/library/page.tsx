"use client";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PdfViewer from "../../components/PdfViewer";

const SOURCES = [
	{ title: "PRINCE2", file: "/pdfs/PRINCE2.pdf" },
	{ title: "PMBOK 7", file: "/pdfs/Project-Management-Institute-A-Guide-to-the-Project-Management-Body-of-Knowledge-PMBOK-R-Guide-PMBOK®️-Guide-Project-Management-Institute-2021.pdf" },
	{ title: "ISO 21500", file: "/pdfs/ISO 21500-2021_ Project, programme and portfolio management - Context and concepts.pdf" },
];

export default function LibraryPage() {
	const [mounted, setMounted] = useState(false);
	useEffect(() => { setMounted(true); }, []);

	const searchParams = useSearchParams();
	const router = useRouter();
	const fileParam = searchParams.get("file");
	const pageParam = searchParams.get("page");
	const [activeFile, setActiveFile] = useState<string | null>(fileParam);
	const [page, setPage] = useState<number>(pageParam ? parseInt(pageParam, 10) : 1);
	const [bookmarks, setBookmarks] = useState<Array<{ title: string; file: string; page?: number }>>([]);

	useEffect(() => {
		setActiveFile(fileParam);
	}, [fileParam]);

	useEffect(() => {
		const p = pageParam ? parseInt(pageParam, 10) : 1;
		if (!Number.isNaN(p)) setPage(p);
	}, [pageParam]);

	useEffect(() => {
		try {
			const stored = localStorage.getItem("pm-asm1-bookmarks");
			if (stored) setBookmarks(JSON.parse(stored));
		} catch {}
	}, []);

	useEffect(() => {
		try {
			localStorage.setItem("pm-asm1-bookmarks", JSON.stringify(bookmarks));
		} catch {}
	}, [bookmarks]);

    const filtered = SOURCES;

	const activeSrc = useMemo(() => {
		if (!activeFile) return null;
		const pageHash = page && page > 0 ? `#page=${page}` : "";
		return `${activeFile}${pageHash}`;
	}, [activeFile, page]);

	if (!mounted) {
		return (
			<div className="space-y-6">
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#e5e7eb" }}>Standards Library</h2>
				<div className="card p-4">Loading…</div>
			</div>
		);
	}

	return (
        <div className="space-y-6">
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#e5e7eb" }}>Standards Library</h2>

			<div className="grid" style={{ gridTemplateColumns: "220px 1fr", alignItems: "start" }}>
                {/* Left sidebar: Bookmarks */}
				<aside className="card p-4" style={{ position: "sticky", top: "6rem", maxHeight: "calc(100vh - 8rem)", overflow: "auto", marginLeft: "-0.25rem", paddingLeft: "0.75rem" }}>
                    <h3 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#93c5fd", letterSpacing: 0.3 }}>Bookmarks</h3>
                    <ul style={{ listStyle: "none", padding: 0, marginTop: "0.75rem" }}>
                        {bookmarks.length === 0 ? (
                            <li className="text-sm text-muted">No bookmarks yet.</li>
                        ) : bookmarks.map((b, i) => (
                            <li key={`${b.file}-${i}`} style={{ marginBottom: "0.5rem" }}>
                                <button
                                    className="bookmark-item"
                                    onClick={() => {
                                        setActiveFile(b.file);
                                        const p = b.page ?? 1;
                                        setPage(p);
                                        router.replace(`/library?file=${encodeURIComponent(b.file)}&page=${p}`);
                                    }}
                                    style={{
                                        width: "100%",
                                        textAlign: "left",
                                        padding: "0.6rem 0.75rem",
                                        borderRadius: "0.6rem",
                                        background: "rgba(2,6,23,0.6)",
                                        border: "1px solid rgba(147,197,253,0.25)",
                                        color: "#e5e7eb",
                                        cursor: "pointer",
                                        transition: "transform 140ms ease, background 140ms ease, border-color 140ms ease"
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(2,6,23,0.8)";
                                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(147,197,253,0.45)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(2,6,23,0.6)";
                                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(147,197,253,0.25)";
                                    }}
                                >
                                    <span style={{ display: "block", fontWeight: 700 }}>{b.title}</span>
                                    {b.page ? (
                                        <span className="text-sm" style={{ color: "#93c5fd" }}>Page {b.page}</span>
                                    ) : null}
                                </button>
                            </li>
                        ))}
                    </ul>
                    {bookmarks.length > 0 ? (
                        <div className="mt-4">
                            <button className="btn" onClick={() => setBookmarks([])}>Clear bookmarks</button>
                        </div>
                    ) : null}
                </aside>

                {/* Right content: sources and big viewer */}
                <section className="space-y-6">
                    <div className="grid grid-4">
						{filtered.map((s) => (
							<button
								key={s.title}
								onClick={() => {
									setActiveFile(s.file);
									setPage(1);
									router.replace(`/library?file=${encodeURIComponent(s.file)}&page=1`);
								}}
                                className="card p-4 fade-in"
                                style={{ textAlign: "left", border: activeFile === s.file ? "2px solid var(--primary)" : "1px solid rgba(148,163,184,0.2)", cursor: "pointer" }}
							>
                                <h3 style={{ fontWeight: 700, color: "#e5e7eb", margin: 0 }}>{s.title}</h3>
							</button>
						))}
					</div>

                    <div className="card p-4" style={{ height: "88vh", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
							<input type="number" min={1} value={page} onChange={(e) => {
								const p = Math.max(1, parseInt(e.target.value || "1", 10));
								setPage(p);
								if (activeFile) router.replace(`/library?file=${encodeURIComponent(activeFile)}&page=${p}`);
							}} className="input" style={{ width: 120 }} />
							<button className="btn" onClick={() => {
								if (!activeFile) return;
								setBookmarks((prev) => [
									...prev,
									{ title: `${SOURCES.find((s) => s.file === activeFile)?.title ?? "Standard"}`, file: activeFile, page }
								]);
							}}>Bookmark page</button>
						</div>
                        <div style={{ flex: 1, minHeight: 0 }}>
                            {activeSrc ? (
                                <PdfViewer src={activeSrc} title={`Viewing ${activeSrc}`} />
                            ) : (
                                <p className="text-sm text-muted">Select a standard to view the PDF.</p>
                            )}
                        </div>
					</div>
				</section>
			</div>
		</div>
	);
}
