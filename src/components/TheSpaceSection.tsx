import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import { images } from "../assets/images";

const FEATURES = [
	"All fitness levels welcome",
	"You'll feel at home from day one",
	"Everyone leaves stronger",
];

export default function TheSpaceSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		const section = sectionRef.current;
		const image = imageRef.current;
		if (!section || !image || prefersReducedMotion()) return;

		const ctx = gsap.context(() => {
			// Image parallax (scrub-linked)
			gsap.fromTo(
				image,
				{ y: -80, scale: 1.15 },
				{
					y: 80,
					scale: 1.0,
					ease: "none",
					scrollTrigger: {
						trigger: section,
						start: "top bottom",
						end: "bottom top",
						scrub: true,
					},
				},
			);

			// Text content timeline
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: "[data-space-text]",
					start: "top 75%",
					once: true,
				},
			});

			tl.fromTo(
				"[data-space-heading]",
				{ y: 80, opacity: 0 },
				{ y: 0, opacity: 1, duration: 1, ease: "power3.out" },
			)
				.fromTo(
					"[data-space-paragraph]",
					{ y: 80, opacity: 0 },
					{ y: 0, opacity: 1, duration: 1, ease: "power3.out" },
					"-=0.8",
				)
				.fromTo(
					"[data-space-accent]",
					{ scaleX: 0 },
					{ scaleX: 1, duration: 0.6, ease: "power2.inOut" },
					"-=0.5",
				)
				.fromTo(
					"[data-space-bullet]",
					{ x: -40, opacity: 0 },
					{
						x: 0,
						opacity: 1,
						duration: 0.6,
						stagger: 0.15,
						ease: "power3.out",
					},
					"-=0.3",
				);
		}, section);

		return () => ctx.revert();
	}, []);

	return (
		// biome-ignore lint/correctness/useUniqueElementIds: intentional navigation anchor
		<section
			ref={sectionRef}
			id="space"
			aria-label="Our facility"
			className="relative border-y border-white/10 bg-[#0a0a0a] px-8 md:px-16 lg:px-24"
		>
			<div className="grid grid-cols-1 lg:grid-cols-2 min-h-0 lg:min-h-[800px]">
				<div
					data-space-text
					className="p-6 sm:p-8 md:p-16 lg:p-24 flex flex-col justify-center relative z-10"
				>
					<h2
						data-space-heading
						className="text-5xl md:text-6xl font-display font-black uppercase leading-[0.85] tracking-tighter mb-8"
					>
						The
						<br />
						<span
							className="text-transparent"
							style={{ WebkitTextStroke: "1px rgba(255,255,255,0.5)" }}
						>
							Space
						</span>
					</h2>
					<p
						data-space-paragraph
						className="text-xl text-white/60 leading-relaxed max-w-md mb-8 font-light"
					>
						Whether you're training for HYROX, showing up for a group class, or
						just getting your own workout in — there's a place for you here. A
						space built for all of it, and a community that shows up for each
						other every single day.
					</p>

					{/* Accent line */}
					<div
						data-space-accent
						aria-hidden="true"
						className="w-16 h-[2px] bg-[#0055FF] mb-8 origin-left"
					/>

					<ul className="space-y-6" aria-label="Facility highlights">
						{FEATURES.map((feature) => (
							<li
								key={feature}
								data-space-bullet
								className="flex items-center gap-4 group cursor-default"
							>
								<span
									aria-hidden="true"
									className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#0055FF] group-hover:bg-[#0055FF]/10 transition-colors"
								>
									<span className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-[#0055FF] transition-colors" />
								</span>
								<span className="font-mono text-sm uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">
									{feature}
								</span>
							</li>
						))}
					</ul>
				</div>

				<div className="relative h-[300px] sm:h-[400px] lg:h-auto overflow-hidden group">
					<img
						ref={imageRef}
						src={images.spaceCommunity}
						alt="~25 HAWC Gym members with medals outside the San Ramon facility, HAWC GYM logo visible"
						loading="lazy"
						decoding="async"
						width={1000}
						height={750}
						className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] to-transparent lg:w-1/3" />
				</div>
			</div>
		</section>
	);
}
