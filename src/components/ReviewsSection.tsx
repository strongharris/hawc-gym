import { Star } from "lucide-react";
import { useEffect, useRef } from "react";
import { GYM_INFO, REVIEWS } from "../constants";
import { useGsapLineReveal } from "../hooks/useGsapLineReveal";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import YelpIcon from "./YelpIcon";

export default function ReviewsSection() {
	const lineRef = useGsapLineReveal();
	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const section = sectionRef.current;
		if (!section || prefersReducedMotion()) return;

		const ctx = gsap.context(() => {
			const cards = gsap.utils.toArray<HTMLElement>(
				"[data-review-card]",
				section,
			);
			gsap.fromTo(
				cards,
				{ y: 40, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.7,
					stagger: 0.15,
					ease: "power3.out",
					scrollTrigger: {
						trigger: section,
						start: "top 75%",
						once: true,
					},
				},
			);
		}, section);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			aria-label="Customer reviews"
			className="relative py-20 md:py-28 bg-[#050505] border-t border-white/10 px-6 sm:px-8 md:px-16 lg:px-24"
		>
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-12 md:mb-16">
					<div className="flex items-center gap-4 mb-6">
						<div
							ref={lineRef}
							aria-hidden="true"
							className="w-12 h-[1px] bg-[#0055FF] origin-left"
						/>
						<span className="font-mono text-xs uppercase tracking-[0.3em] text-[#0055FF]">
							What Our Members Say
						</span>
					</div>
					<h2 className="text-4xl md:text-6xl font-display font-black uppercase leading-[0.9] tracking-tighter">
						Real
						<br />
						<span className="text-[#0055FF]">Results</span>
						<span className="text-[#AAFF00]">.</span>
					</h2>
				</div>

				{/* Review cards — horizontal scroll on mobile, grid on desktop */}
				<div className="flex md:grid md:grid-cols-3 overflow-x-auto snap-x snap-mandatory md:snap-none md:overflow-visible gap-4 md:gap-6 pb-4 md:pb-0 no-scrollbar">
					{REVIEWS.map((review) => (
						<article
							key={review.name}
							data-review-card
							className="flex-shrink-0 w-[85vw] sm:w-[75vw] md:w-auto snap-center bg-white/[0.04] border border-white/10 rounded-lg p-6 sm:p-8 flex flex-col justify-between gap-6"
						>
							<div>
								{/* Stars */}
								<div
									role="img"
									className="flex items-center gap-1 mb-4"
									aria-label={`${review.stars} out of 5 stars`}
								>
									{Array.from({ length: review.stars }).map((_, i) => (
										<Star
											// biome-ignore lint/suspicious/noArrayIndexKey: static star array
											key={i}
											size={16}
											className="text-[#AAFF00] fill-[#AAFF00]"
											aria-hidden="true"
										/>
									))}
								</div>

								{/* Review text */}
								<blockquote className="text-white/70 text-sm sm:text-base leading-relaxed italic">
									"{review.text}"
								</blockquote>
							</div>

							{/* Reviewer info */}
							<div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
								<div>
									<p className="font-display font-bold uppercase tracking-wide text-white text-sm">
										{review.name}
									</p>
									<p className="font-mono text-[10px] text-white/30 mt-1">
										{review.date}
									</p>
								</div>
								<a
									href={GYM_INFO.socialLinks.yelp}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`View ${review.name}'s review on Yelp`}
									className="text-white/30 hover:text-white/60 active:text-white/60 transition-colors"
								>
									<YelpIcon className="w-5 h-5" />
								</a>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
