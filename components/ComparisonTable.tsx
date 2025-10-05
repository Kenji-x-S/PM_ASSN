import Link from "next/link";

interface ComparisonEntry {
	summary: string;
	pdf: string;
}

interface ComparisonTableProps {
	standards: string[];
	data: Record<string, ComparisonEntry>;
	pages?: Record<string, number>;
}

export default function ComparisonTable({ standards, data, pages }: ComparisonTableProps) {
	return (
		<div className="card" style={{ overflowX: "auto" }}>
			<table style={{ minWidth: "100%", borderCollapse: "collapse" }}>
				<thead style={{ background: "#f1f5f9" }}>
					<tr>
						{standards.map((s) => (
							<th key={s} style={{ textAlign: "left", padding: "0.75rem 1rem", fontSize: 14, fontWeight: 600, color: "#334155", borderBottom: "1px solid #e2e8f0" }}>{s}</th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr>
						{standards.map((s) => (
							<td key={s} style={{ verticalAlign: "top", padding: "1rem", fontSize: 14, color: "#334155", borderTop: "1px solid #e2e8f0" }}>
								<p style={{ marginBottom: "0.75rem" }}>{data[s]?.summary ?? "N/A"}</p>
								{(() => {
									const page = pages?.[s];
									const base = `/library?file=${encodeURIComponent(data[s]?.pdf ?? "")}`;
									const href = page ? `${base}&page=${page}` : base;
									return <Link href={href} className="link">Open in PDF</Link>;
								})()}
							</td>
						))}
					</tr>
				</tbody>
			</table>
		</div>
	);
}
