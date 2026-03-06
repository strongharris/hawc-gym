import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SCHEDULE_CLASSES, SCHEDULE_DAYS } from "../../constants";
import ScheduleClassCard from "./ScheduleClassCard";

function getDefaultDay(): (typeof SCHEDULE_DAYS)[number] {
	if (typeof window === "undefined") return "Monday";
	const jsDay = new Date().getDay(); // 0=Sun
	// Sunday → Monday, else map 1=Mon..6=Sat
	if (jsDay === 0) return "Monday";
	return SCHEDULE_DAYS[jsDay - 1];
}

export default function ScheduleMobileList() {
	const [activeDay, setActiveDay] = useState<(typeof SCHEDULE_DAYS)[number]>(getDefaultDay);

	const dayClasses = SCHEDULE_CLASSES.filter((c) => c.day === activeDay);

	return (
		<div className="md:hidden">
			{/* Day tabs */}
			<div
				className="flex overflow-x-auto snap-x snap-mandatory gap-1 pb-4 no-scrollbar"
				role="tablist"
				aria-label="Select day of the week"
			>
				{SCHEDULE_DAYS.map((day) => (
					<button
						key={day}
						type="button"
						role="tab"
						aria-selected={day === activeDay}
						onClick={() => setActiveDay(day)}
						className={`snap-center shrink-0 px-4 py-2 font-mono text-xs uppercase tracking-widest rounded-full transition-colors ${
							day === activeDay
								? "bg-[#0055FF] text-white"
								: "text-white/50 hover:text-white/80"
						}`}
					>
						{day.slice(0, 3)}
					</button>
				))}
			</div>

			{/* Class list */}
			<div className="min-h-[200px]" role="tabpanel" aria-label={`${activeDay} classes`}>
				<AnimatePresence mode="wait">
					<motion.div
						key={activeDay}
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -12 }}
						transition={{ duration: 0.25 }}
						className="flex flex-col gap-3"
					>
						{dayClasses.length > 0 ? (
							dayClasses.map((cls) => (
								<ScheduleClassCard key={cls.id} cls={cls} variant="list" />
							))
						) : (
							<p className="text-center text-white/40 font-mono text-sm py-12">
								No classes scheduled
							</p>
						)}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
