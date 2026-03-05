import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/gsap";

/**
 * Animates an element from scaleX(0) → scaleX(1) when it scrolls into view.
 * Apply `transform-origin: left` on the element for a left-to-right grow effect.
 */
export function useGsapLineReveal<T extends HTMLElement = HTMLDivElement>() {
	const ref = useRef<T>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el || prefersReducedMotion()) return;

		const ctx = gsap.context(() => {
			gsap.fromTo(
				el,
				{ scaleX: 0 },
				{
					scaleX: 1,
					duration: 0.6,
					ease: "power2.inOut",
					scrollTrigger: {
						trigger: el,
						start: "top 85%",
						once: true,
					},
				},
			);
		});

		return () => ctx.revert();
	}, []);

	return ref;
}
