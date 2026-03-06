import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { GYM_INFO } from "../../constants";
import ScheduleGrid from "./ScheduleGrid";
import ScheduleLegend from "./ScheduleLegend";
import ScheduleMobileList from "./ScheduleMobileList";

interface ScheduleModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function ScheduleModal({ isOpen, onClose }: ScheduleModalProps) {
	// Escape key closes modal
	useEffect(() => {
		if (!isOpen) return;
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [isOpen, onClose]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					role="dialog"
					aria-label="Weekly class schedule"
					aria-modal="true"
					initial={{ opacity: 0, scale: 0.97 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.97 }}
					transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
					className="fixed inset-0 z-[60] bg-[#050505] flex flex-col"
				>
					{/* Header bar */}
					<div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/10 bg-[#050505]/95 backdrop-blur-xl">
						<h2 className="font-mono text-xs uppercase tracking-[0.3em] text-[#0055FF]">
							Weekly Schedule
						</h2>
						<button
							type="button"
							onClick={onClose}
							aria-label="Close schedule"
							className="text-white/60 hover:text-white transition-colors"
						>
							<X size={24} />
						</button>
					</div>

					{/* Scrollable body */}
					<div className="flex-1 overflow-y-auto px-6 md:px-12 lg:px-24 py-10 md:py-16 max-w-7xl mx-auto w-full">
						{/* Hours summary */}
						<p className="text-white/50 font-mono text-xs uppercase tracking-widest mb-8">
							Mon–Fri {GYM_INFO.hours[0].open} – {GYM_INFO.hours[0].close}{" "}
							&middot; Sat {GYM_INFO.hours[5].open} –{" "}
							{GYM_INFO.hours[5].close} &middot; Sun Closed
						</p>

						{/* Legend */}
						<div className="mb-8 md:mb-12">
							<ScheduleLegend />
						</div>

						{/* Grid (desktop) / List (mobile) */}
						<ScheduleGrid />
						<ScheduleMobileList />
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
