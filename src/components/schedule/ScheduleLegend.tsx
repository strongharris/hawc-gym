import { CLASS_TYPES } from "../../constants";

export default function ScheduleLegend() {
	return (
		<div className="flex flex-wrap gap-3" role="list" aria-label="Class type legend">
			{Object.values(CLASS_TYPES).map((ct) => (
				<div
					key={ct.label}
					role="listitem"
					className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]"
				>
					<span
						className="w-2.5 h-2.5 rounded-full shrink-0"
						style={{ backgroundColor: ct.color }}
						aria-hidden="true"
					/>
					<span className="text-xs font-mono text-white/70">{ct.label}</span>
				</div>
			))}
		</div>
	);
}
