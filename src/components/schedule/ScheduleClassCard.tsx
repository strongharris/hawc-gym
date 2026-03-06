import { CLASS_TYPES } from "../../constants";
import type { ScheduleClass } from "../../constants";

interface ScheduleClassCardProps {
	cls: ScheduleClass;
	variant: "grid" | "list";
}

export default function ScheduleClassCard({ cls, variant }: ScheduleClassCardProps) {
	const classType = CLASS_TYPES[cls.type];

	if (variant === "grid") {
		return (
			<div
				data-schedule-card
				className={`absolute left-1 right-1 border-l-4 rounded-r-sm px-2 py-1.5 overflow-hidden cursor-default transition-colors hover:brightness-125 ${classType.bgClass}`}
				style={{
					borderLeftColor: classType.color,
					top: `${((cls.startHour - 6) / 14) * 100}%`,
					height: `${(cls.durationMinutes / 60 / 14) * 100}%`,
				}}
			>
				<p className="text-[11px] font-bold leading-tight truncate">{cls.title}</p>
				<p className="text-[10px] opacity-70 leading-tight truncate">
					{cls.startTime} – {cls.endTime}
				</p>
				{cls.instructor && (
					<p className="text-[10px] opacity-50 leading-tight truncate">{cls.instructor}</p>
				)}
			</div>
		);
	}

	return (
		<div
			data-schedule-card
			className={`border-l-4 rounded-r-md px-5 py-4 flex items-center justify-between gap-4 ${classType.bgClass}`}
			style={{ borderLeftColor: classType.color }}
		>
			<div className="min-w-0">
				<p className="text-sm font-bold leading-tight truncate">{cls.title}</p>
				{cls.instructor && (
					<p className="text-xs opacity-60 mt-0.5 truncate">{cls.instructor}</p>
				)}
			</div>
			<p className="text-xs font-mono opacity-70 whitespace-nowrap shrink-0">
				{cls.startTime} – {cls.endTime}
			</p>
		</div>
	);
}
