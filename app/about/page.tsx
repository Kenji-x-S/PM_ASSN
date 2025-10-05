export default function AboutPage() {
	return (
        <div className="space-y-6" style={{ maxWidth: 768 }}>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#e5e7eb" }}>About This Project</h2>
            <p style={{ color: "#cbd5e1" }}>
				This application is a frontend-only prototype for a university assignment titled
				"Comparative Analysis and Process Design using PM Standards". It allows exploration
                of PMBOK 7, PRINCE2, and ISO 21500, with topic-based comparison and summarized insights.
			</p>
            <div className="card p-5">
                <h3 style={{ fontWeight: 700, color: "#e5e7eb" }}>Team</h3>
                <p className="text-sm" style={{ marginTop: "0.25rem", color: "#cbd5e1" }}>BSCS23187 - Danish Dar <br/> BSCS23139 - Huzaifa Saleem <br/> BSCS23064 - Abdullah Asim</p>
			</div>
            <div className="card p-5">
                <h3 style={{ fontWeight: 700, color: "#e5e7eb" }}>Sources</h3>
                <ul className="text-sm" style={{ marginTop: "0.5rem", paddingLeft: "1.25rem", color: "#cbd5e1" }}>
					<li>PMBOK 7 (Project Management Institute)</li>
					<li>PRINCE2</li>
                    
					<li>ISO 21500</li>
				</ul>
			</div>
		</div>
	);
}
