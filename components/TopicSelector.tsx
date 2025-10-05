"use client";

interface TopicSelectorProps {
	topics: string[];
	value: string;
	onChange: (topic: string) => void;
}

export default function TopicSelector({ topics, value, onChange }: TopicSelectorProps) {
	return (
		<div style={{ display: "inline-block" }}>
			<label htmlFor="topic" className="sr-only">Topic</label>
			<select
				id="topic"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="select"
			>
				{topics.map((t) => (
					<option key={t} value={t}>{t}</option>
				))}
			</select>
		</div>
	);
}
