"use client";
import { useState } from "react";

interface PdfViewerProps {
	src: string;
	title?: string;
	className?: string;
}

export default function PdfViewer({ src, title = "PDF Viewer", className = "" }: PdfViewerProps) {
	const [loading, setLoading] = useState(true);
	return (
        <div className={`flipbook ${className}`} style={{ width: "100%", height: "100%", overflow: "hidden" }}>
            {loading ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "3rem", fontSize: 14, color: "#cbd5e1" }}>Loading PDF…</div>
            ) : null}
            <iframe
                key={src}
                src={src}
                title={title}
                style={{ width: "100%", height: "100%", border: 0, background: "#0b1220" }}
                onLoad={() => setLoading(false)}
            />
        </div>
	);
}
