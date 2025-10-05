export default function Footer() {
	return (
        <footer className="footer" style={{ animation: "fadeIn 300ms ease-out both" }}>
            <div className="container-base footer-inner">
				<p>© {new Date().getFullYear()} PM ASM1. Educational prototype.</p>
				<p>
                    <span className="text-sm">Built with Next.js • <span role="img" aria-label="books">📚</span></span>
				</p>
			</div>
		</footer>
	);
}
