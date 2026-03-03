import { motion } from "motion/react";
import type { ReactNode } from "react";

const RevealText = ({
	children,
	delay = 0,
}: {
	children: ReactNode;
	delay?: number;
}) => (
	<motion.div
		initial={{ y: 50, opacity: 0 }}
		whileInView={{ y: 0, opacity: 1 }}
		viewport={{ once: true, margin: "-100px" }}
		transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
	>
		{children}
	</motion.div>
);

export default RevealText;
