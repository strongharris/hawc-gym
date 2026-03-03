const ModernLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
	<svg
		viewBox="0 0 100 100"
		className={className}
		fill="none"
		stroke="currentColor"
		strokeWidth="4"
		strokeLinecap="square"
		strokeLinejoin="miter"
	>
		<title>HAWC Gym Logo</title>
		<path
			d="M20 80 L20 20 L50 10 L80 30 L60 45 L70 80 L20 80"
			stroke="currentColor"
			fill="none"
		/>
		<path
			d="M30 80 L30 40 L55 25"
			stroke="#0055FF"
			strokeWidth="6"
			className="opacity-100"
		/>
		<circle cx="50" cy="30" r="2" fill="currentColor" stroke="none" />
	</svg>
);

export default ModernLogo;
