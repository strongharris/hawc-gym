import { ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const onScroll = () => {
			setShow(window.scrollY > window.innerHeight);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<AnimatePresence>
			{show && (
				<motion.button
					type="button"
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.8 }}
					transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					aria-label="Scroll to top"
					className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:bg-[#0055FF]/20 hover:border-[#0055FF]/50 hover:text-white active:scale-95 transition-colors safe-area-bottom-btn"
				>
					<ChevronUp size={20} />
				</motion.button>
			)}
		</AnimatePresence>
	);
}
