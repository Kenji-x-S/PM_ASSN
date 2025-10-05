interface InsightsCardProps {
	title: string;
	description?: string;
	points: string[];
}

export default function InsightsCard({ title, description, points }: InsightsCardProps) {
	return (
		<section className="card p-5">
			<h3 className="text-base font-semibold text-slate-800">{title}</h3>
			{description ? (
				<p className="mt-1 text-sm text-slate-600">{description}</p>
			) : null}
			<ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
				{points.map((p, idx) => (
					<li key={idx}>{p}</li>
				))}
			</ul>
		</section>
	);
}
