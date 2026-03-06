import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

const STATS = [
	{ label: "Location", val: "San Ramon", countTo: null },
	{ label: "Established", val: "2017", countTo: 2017, from: 2000 },
	{
		label: "Facility",
		val: "5,000 sq ft",
		countTo: 5000,
		from: 0,
		suffix: " sq ft",
		format: true,
	},
	{ label: "First Class", val: "Free", countTo: null },
] as const;

export default function StatsStrip() {
	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const section = sectionRef.current;
		if (!section || prefersReducedMotion()) return;

		const ctx = gsap.context(() => {
			const cells = gsap.utils.toArray<HTMLElement>(
				"[data-stat-cell]",
				section,
			);

			// Staggered fade-up for all cells
			gsap.fromTo(
				cells,
				{ y: 30, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.6,
					stagger: 0.15,
					ease: "power3.out",
					scrollTrigger: {
						trigger: section,
						start: "top 80%",
						once: true,
					},
				},
			);

			// Counter animations for numeric values
			const counterEls = gsap.utils.toArray<HTMLElement>(
				"[data-counter]",
				section,
			);
			for (const el of counterEls) {
				const to = Number(el.dataset.counterTo);
				const from = Number(el.dataset.counterFrom);
				const suffix = el.dataset.counterSuffix || "";
				const shouldFormat = el.dataset.counterFormat === "true";
				const proxy = { val: from };

				gsap.to(proxy, {
					val: to,
					duration: 1.2,
					ease: "power2.out",
					scrollTrigger: {
						trigger: section,
						start: "top 80%",
						once: true,
					},
					onUpdate() {
						const rounded = Math.round(proxy.val);
						el.textContent =
							(shouldFormat ? rounded.toLocaleString() : String(rounded)) +
							suffix;
					},
				});
			}
		}, section);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			aria-label="Gym quick facts"
			className="border-y border-white/10 bg-[#050505]/80 backdrop-blur-xl relative z-20"
		>
			<dl className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
				{STATS.map((stat, i) => (
					<div
						key={stat.label}
						data-stat-cell
						className={`p-6 sm:p-8 md:p-12 text-center flex flex-col items-center justify-center group ${i < 2 ? "border-b border-white/10 md:border-b-0" : ""}`}
					>
						<dt className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-3 group-hover:text-[#0055FF] transition-colors">
							{stat.label}
						</dt>
						<dd className="text-xl md:text-3xl font-display font-light uppercase tracking-wide text-white/90">
							{stat.countTo != null ? (
								<span
									data-counter
									data-counter-to={stat.countTo}
									data-counter-from={stat.from}
									data-counter-suffix={stat.suffix || ""}
									data-counter-format={String(!!stat.format)}
								>
									{stat.val}
								</span>
							) : (
								stat.val
							)}
						</dd>
					</div>
				))}
			</dl>
		</section>
	);
}
