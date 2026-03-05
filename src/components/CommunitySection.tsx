import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { Draggable } from "gsap/Draggable";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY_PHOTOS } from "../assets/images";
import { useGsapLineReveal } from "../hooks/useGsapLineReveal";

gsap.registerPlugin(Draggable);

const SPACING = 0.1;
const SNAP_TIME = gsap.utils.snap(SPACING);

function buildSeamlessLoop(
	items: HTMLElement[],
	spacing: number,
	animateFunc: (el: HTMLElement) => gsap.core.Timeline,
) {
	const overlap = Math.ceil(1 / spacing);
	const startTime = items.length * spacing + 0.5;
	const loopTime = (items.length + overlap) * spacing + 1;
	const rawSequence = gsap.timeline({ paused: true });
	const seamlessLoop = gsap.timeline({
		paused: true,
		repeat: -1,
		onRepeat() {
			if (this._time === this._dur) {
				this._tTime += this._dur - 0.01;
			}
		},
	});
	const l = items.length + overlap * 2;

	for (let i = 0; i < l; i++) {
		const index = i % items.length;
		const time = i * spacing;
		rawSequence.add(animateFunc(items[index]), time);
		if (i <= items.length) {
			seamlessLoop.add(`label${i}`, time);
		}
	}

	rawSequence.time(startTime);
	seamlessLoop
		.to(rawSequence, {
			time: loopTime,
			duration: loopTime - startTime,
			ease: "none",
		})
		.fromTo(
			rawSequence,
			{ time: overlap * spacing + 1 },
			{
				time: startTime,
				duration: startTime - (overlap * spacing + 1),
				immediateRender: false,
				ease: "none",
			},
		);

	return seamlessLoop;
}

export default function CommunitySection() {
	const lineRef = useGsapLineReveal();
	const cardsRef = useRef<HTMLUListElement>(null);
	const dragProxyRef = useRef<HTMLDivElement>(null);
	const scrubRef = useRef<gsap.core.Tween | null>(null);
	const seamlessLoopRef = useRef<gsap.core.Timeline | null>(null);
	const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const goToOffset = (offset: number) => {
		const scrub = scrubRef.current;
		if (!scrub) return;
		scrub.vars.offset = SNAP_TIME(offset);
		scrub.invalidate().restart();
	};

	const step = (direction: number) => {
		const scrub = scrubRef.current;
		if (!scrub) return;
		goToOffset((scrub.vars.offset as number) + direction * SPACING);
		resetAutoplay();
	};

	const resetAutoplay = () => {
		if (autoplayRef.current) clearInterval(autoplayRef.current);
		autoplayRef.current = setInterval(() => {
			const scrub = scrubRef.current;
			if (scrub) {
				goToOffset((scrub.vars.offset as number) + SPACING);
			}
		}, 3000);
	};

	useEffect(() => {
		const cardsList = cardsRef.current;
		const dragProxy = dragProxyRef.current;
		if (!cardsList || !dragProxy) return;

		const cards = gsap.utils.toArray<HTMLElement>(cardsList.children);
		if (cards.length === 0) return;

		// Initial state — all cards hidden and off to the right
		gsap.set(cards, { xPercent: 400, opacity: 0, scale: 0 });

		const animateFunc = (element: HTMLElement) => {
			const tl = gsap.timeline();
			tl.fromTo(
				element,
				{ scale: 0, opacity: 0 },
				{
					scale: 1,
					opacity: 1,
					zIndex: 100,
					duration: 0.5,
					yoyo: true,
					repeat: 1,
					ease: "power1.in",
					immediateRender: false,
				},
			).fromTo(
				element,
				{ xPercent: 400 },
				{
					xPercent: -400,
					duration: 1,
					ease: "none",
					immediateRender: false,
				},
				0,
			);
			return tl;
		};

		const seamlessLoop = buildSeamlessLoop(cards, SPACING, animateFunc);
		seamlessLoopRef.current = seamlessLoop;

		const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());
		const playhead = { offset: 0 };

		const scrub = gsap.to(playhead, {
			offset: 0,
			onUpdate() {
				seamlessLoop.time(wrapTime(playhead.offset));
			},
			duration: 0.5,
			ease: "power3",
			paused: true,
		});
		scrubRef.current = scrub;

		// Show the first card immediately
		goToOffset(0);

		// Draggable — swipe to cycle
		Draggable.create(dragProxy, {
			type: "x",
			trigger: cardsList,
			onPress() {
				(this as any).startOffset = scrub.vars.offset;
			},
			onDrag() {
				scrub.vars.offset =
					(this as any).startOffset + (this.startX - this.x) * 0.001;
				scrub.invalidate().restart();
			},
			onDragEnd() {
				goToOffset(scrub.vars.offset as number);
				resetAutoplay();
				gsap.set(dragProxy, { x: 0 });
			},
		});

		// Start autoplay
		autoplayRef.current = setInterval(() => {
			goToOffset((scrub.vars.offset as number) + SPACING);
		}, 3000);

		return () => {
			if (autoplayRef.current) clearInterval(autoplayRef.current);
			scrub.kill();
			seamlessLoop.kill();
		};
	}, []);

	return (
		// biome-ignore lint/correctness/useUniqueElementIds: intentional navigation anchor
		<section
			id="community"
			aria-label="HAWC Gym community photo gallery"
			className="relative py-20 md:py-28 overflow-hidden bg-[#050505]"
		>
			<div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
				{/* Header */}
				<div className="mb-12 md:mb-16">
					<div className="flex items-center gap-4 mb-6">
						<div
							ref={lineRef}
							aria-hidden="true"
							className="w-12 h-[1px] bg-[#0055FF] origin-left"
						/>
						<span className="font-mono text-xs uppercase tracking-[0.3em] text-[#0055FF]">
							Community
						</span>
					</div>
					<h2 className="text-4xl md:text-6xl font-display font-black uppercase leading-[0.9] tracking-tighter">
						More Than
						<br />
						<span className="text-[#0055FF]">A Gym</span>
						<span className="text-[#AAFF00]">.</span>
					</h2>
				</div>

				{/* Card carousel */}
				<div className="relative flex items-center justify-center h-[24rem] md:h-[30rem]">
					<ul
						ref={cardsRef}
						className="relative w-[16rem] md:w-[20rem] h-[22rem] md:h-[28rem]"
						aria-label="Community photos"
					>
						{GALLERY_PHOTOS.map((photo, i) => (
							<li
								// biome-ignore lint/suspicious/noArrayIndexKey: static gallery array
								key={i}
								className="list-none absolute top-0 left-0 w-[16rem] md:w-[20rem] rounded-lg overflow-hidden shadow-2xl shadow-black/50"
								style={{
									aspectRatio: "3 / 4",
									backgroundImage: `url(${photo.src})`,
									backgroundSize: "cover",
									backgroundPosition: "center",
								}}
							>
								<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
							</li>
						))}
					</ul>

					{/* Drag proxy */}
					<div ref={dragProxyRef} className="invisible absolute" />
				</div>

				{/* Navigation */}
				<div className="flex items-center justify-center gap-4 mt-8">
					<button
						type="button"
						aria-label="Previous photo"
						className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 hover:bg-white/5 transition-colors"
						onClick={() => step(-1)}
					>
						<ChevronLeft size={20} />
					</button>
					<span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
						Swipe or Tap
					</span>
					<button
						type="button"
						aria-label="Next photo"
						className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 hover:bg-white/5 transition-colors"
						onClick={() => step(1)}
					>
						<ChevronRight size={20} />
					</button>
				</div>
			</div>
		</section>
	);
}
