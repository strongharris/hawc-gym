import gsap from "gsap";
import ScrollTriggerPkg from "gsap/ScrollTrigger";

const ScrollTrigger = ScrollTriggerPkg;
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export function prefersReducedMotion(): boolean {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
