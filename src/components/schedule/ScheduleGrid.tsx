import { useEffect, useRef } from "react";
import { SCHEDULE_CLASSES, SCHEDULE_DAYS, SCHEDULE_HOURS } from "../../constants";
import { gsap, prefersReducedMotion } from "../../lib/gsap";
import ScheduleClassCard from "./ScheduleClassCard";

function formatHour(h: number): string {
	const suffix = h >= 12 ? "PM" : "AM";
	const display = h > 12 ? h - 12 : h === 0 ? 12 : h;
	return `${display} ${suffix}`;
}

function getTodayName(): string {
	if (typeof window === "undefined") return "";
	return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(new Date());
}

export default function ScheduleGrid() {
	const gridRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = gridRef.current;
		if (!el || prefersReducedMotion()) return;

		const ctx = gsap.context(() => {
			const headers = gsap.utils.toArray<HTMLElement>("[data-day-header]", el);
			gsap.fromTo(
				headers,
				{ y: 20, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
			);

			const cards = gsap.utils.toArray<HTMLElement>("[data-schedule-card]", el);
			gsap.fromTo(
				cards,
				{ scale: 0.8, opacity: 0 },
				{ scale: 1, opacity: 1, duration: 0.4, stagger: 0.04, ease: "back.out(1.4)", delay: 0.3 },
			);

			const labels = gsap.utils.toArray<HTMLElement>("[data-time-label]", el);
			gsap.fromTo(
				labels,
				{ x: -20, opacity: 0 },
				{ x: 0, opacity: 1, duration: 0.4, stagger: 0.03, ease: "power3.out", delay: 0.1 },
			);
		}, el);

		return () => ctx.revert();
	}, []);

	const today = getTodayName();

	return (
		<div ref={gridRef} className="hidden md:block overflow-x-auto">
			<div
				className="grid min-w-[800px]"
				style={{ gridTemplateColumns: "80px repeat(6, 1fr)" }}
				role="grid"
				aria-label="Weekly class schedule grid"
			>
				{/* Header row */}
				<div className="border-b border-white/10 p-3" />
				{SCHEDULE_DAYS.map((day) => (
					<div
						key={day}
						data-day-header
						className={`border-b border-white/10 p-3 text-center font-mono text-xs uppercase tracking-[0.2em] ${
							day === today ? "text-[#0055FF] font-bold" : "text-white/50"
						}`}
						role="columnheader"
					>
						{day.slice(0, 3)}
					</div>
				))}

				{/* Time column + day columns */}
				<div className="relative border-r border-white/5">
					{SCHEDULE_HOURS.map((h) => (
						<div
							key={h}
							data-time-label
							className="absolute right-3 font-mono text-[10px] text-white/30 -translate-y-1/2"
							style={{ top: `${((h - 6) / 14) * 100}%` }}
						>
							{formatHour(h)}
						</div>
					))}
				</div>

				{SCHEDULE_DAYS.map((day) => {
					const dayClasses = SCHEDULE_CLASSES.filter((c) => c.day === day);
					return (
						<div
							key={day}
							className={`relative border-r border-white/5 last:border-r-0 ${
								day === today ? "bg-white/[0.03]" : ""
							}`}
							style={{ height: `${14 * 60}px` }}
							role="gridcell"
						>
							{/* Gridlines */}
							{SCHEDULE_HOURS.map((h) => (
								<div
									key={h}
									className="absolute left-0 right-0 border-t border-white/5"
									style={{ top: `${((h - 6) / 14) * 100}%` }}
								/>
							))}
							{dayClasses.map((cls) => (
								<ScheduleClassCard key={cls.id} cls={cls} variant="grid" />
							))}
						</div>
					);
				})}
			</div>
		</div>
	);
}
