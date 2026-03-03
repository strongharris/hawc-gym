import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowDownRight,
	ArrowRight,
	Facebook,
	Instagram,
	Mail,
	MapPin,
	Menu,
	Phone,
	Play,
	Star,
	X,
} from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useId, useState } from "react";
import ModernLogo from "../components/ModernLogo";
import RevealText from "../components/RevealText";
import YelpIcon from "../components/YelpIcon";
import { GYM_INFO, REVIEWS, SERVICES, SITE_URL } from "../constants";

const SEO = {
	title: "HAWC Gym — Northern California's First HYROX Affiliate | San Ramon, CA",
	description:
		"HAWC Gym in San Ramon, CA is Northern California's first official HYROX affiliate. We offer HYROX race training, 1-on-1 personal training, group cross training classes, open gym, and youth fitness programs. First class free.",
	image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
} as const;

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: SEO.title },
			{ name: "description", content: SEO.description },
			{
				name: "keywords",
				content:
					"HAWC Gym, HYROX, HYROX affiliate, San Ramon gym, personal training San Ramon, group fitness classes, cross training, open gym, youth fitness, fitness San Ramon CA, HYROX training Northern California, gym near me San Ramon",
			},
			{ name: "author", content: GYM_INFO.name },
			{ name: "robots", content: "index, follow" },

			// Geo meta tags for local SEO
			{ name: "geo.region", content: `${GYM_INFO.country}-${GYM_INFO.state}` },
			{ name: "geo.placename", content: GYM_INFO.city },
			{
				name: "geo.position",
				content: `${GYM_INFO.geo.latitude};${GYM_INFO.geo.longitude}`,
			},
			{
				name: "ICBM",
				content: `${GYM_INFO.geo.latitude}, ${GYM_INFO.geo.longitude}`,
			},

			// Open Graph
			{ property: "og:title", content: SEO.title },
			{ property: "og:description", content: SEO.description },
			{ property: "og:image", content: SEO.image },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{
				property: "og:image:alt",
				content:
					"HAWC Gym interior — functional fitness facility in San Ramon, CA",
			},
			{ property: "og:url", content: SITE_URL },
			{ property: "og:type", content: "website" },
			{ property: "og:locale", content: "en_US" },
			{ property: "og:site_name", content: GYM_INFO.name },

			// Twitter Card
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: SEO.title },
			{ name: "twitter:description", content: SEO.description },
			{ name: "twitter:image", content: SEO.image },
			{
				name: "twitter:image:alt",
				content:
					"HAWC Gym interior — functional fitness facility in San Ramon, CA",
			},
		],
		links: [{ rel: "canonical", href: SITE_URL }],
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@graph": [
						{
							"@type": "WebSite",
							"@id": `${SITE_URL}/#website`,
							url: SITE_URL,
							name: GYM_INFO.name,
							description: SEO.description,
							publisher: { "@id": `${SITE_URL}/#organization` },
							inLanguage: "en-US",
						},
						{
							"@type": "WebPage",
							"@id": `${SITE_URL}/#webpage`,
							url: SITE_URL,
							name: SEO.title,
							isPartOf: { "@id": `${SITE_URL}/#website` },
							about: { "@id": `${SITE_URL}/#localbusiness` },
							description: SEO.description,
							inLanguage: "en-US",
						},
						{
							"@type": ["GymOrFitnessCenter", "LocalBusiness"],
							"@id": `${SITE_URL}/#localbusiness`,
							name: GYM_INFO.name,
							description: SEO.description,
							url: SITE_URL,
							telephone: GYM_INFO.phonePrimary,
							email: GYM_INFO.email,
							image: SEO.image,
							address: {
								"@type": "PostalAddress",
								streetAddress: GYM_INFO.streetAddress,
								addressLocality: GYM_INFO.city,
								addressRegion: GYM_INFO.state,
								postalCode: GYM_INFO.zip,
								addressCountry: GYM_INFO.country,
							},
							geo: {
								"@type": "GeoCoordinates",
								latitude: GYM_INFO.geo.latitude,
								longitude: GYM_INFO.geo.longitude,
							},
							sameAs: [
								GYM_INFO.socialLinks.instagram,
								GYM_INFO.socialLinks.facebook,
								GYM_INFO.socialLinks.yelp,
							],
							aggregateRating: {
								"@type": "AggregateRating",
								ratingValue: "5.0",
								reviewCount: String(REVIEWS.length),
								bestRating: "5",
								worstRating: "1",
							},
							review: REVIEWS.map((r) => ({
								"@type": "Review",
								author: {
									"@type": "Person",
									name: r.name,
								},
								datePublished: new Date(r.date).toISOString().split("T")[0],
								reviewRating: {
									"@type": "Rating",
									ratingValue: String(r.stars),
									bestRating: "5",
									worstRating: "1",
								},
								reviewBody: r.text,
							})),
							hasOfferCatalog: {
								"@type": "OfferCatalog",
								name: "Fitness Programs",
								itemListElement: SERVICES.map((s, i) => ({
									"@type": "Offer",
									itemOffered: {
										"@type": "Service",
										name: s.title,
										description: s.description,
									},
									position: i + 1,
								})),
							},
							foundingDate: "2017",
							priceRange: "$$",
						},
						{
							"@type": "Organization",
							"@id": `${SITE_URL}/#organization`,
							name: GYM_INFO.name,
							url: SITE_URL,
							logo: `${SITE_URL}/logo512.png`,
							contactPoint: {
								"@type": "ContactPoint",
								telephone: GYM_INFO.phonePrimary,
								contactType: "customer service",
								email: GYM_INFO.email,
								areaServed: "US",
								availableLanguage: "English",
							},
							sameAs: [
								GYM_INFO.socialLinks.instagram,
								GYM_INFO.socialLinks.facebook,
								GYM_INFO.socialLinks.yelp,
							],
						},
					],
				}),
			},
		],
	}),
	component: LandingPage,
});

function LandingPage() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const nameId = useId();
	const phoneId = useId();
	const messageId = useId();
	const { scrollYProgress } = useScroll();
	const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
	const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

	useEffect(() => {
		if (isMenuOpen) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "unset";
	}, [isMenuOpen]);

	return (
		<div className="min-h-screen bg-[#050505] text-zinc-50 font-sans selection:bg-[#0055FF] selection:text-white overflow-hidden">
			{/* --- SKIP NAVIGATION --- */}
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-[#0055FF] focus:text-white focus:rounded-full focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:outline-none"
			>
				Skip to main content
			</a>

			{/* --- ATMOSPHERIC GLOW --- */}
			<div aria-hidden="true" className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#0055FF] rounded-full blur-[150px] opacity-[0.07] pointer-events-none z-0" />

			{/* --- NOISE TEXTURE --- */}
			<div
				aria-hidden="true"
				className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 mix-blend-overlay"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
				}}
			/>

			{/* --- NAVIGATION --- */}
			<motion.nav
				aria-label="Main navigation"
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
				className="fixed top-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center mix-blend-difference"
			>
				<a href="/" className="flex items-center gap-4" aria-label="HAWC Gym — Home">
					<ModernLogo className="w-8 h-8 text-white" />
					<span className="font-display font-bold text-xl tracking-widest uppercase text-white">
						HAWC<span className="text-[#0055FF]">.</span>
					</span>
				</a>

				<div className="hidden md:flex items-center gap-12 font-mono text-xs uppercase tracking-[0.2em] text-white">
					<a href="#program" className="hover:text-[#0055FF] transition-colors">
						Program
					</a>
					<a href="#space" className="hover:text-[#0055FF] transition-colors">
						Space
					</a>
					<a
						href="#community"
						className="hover:text-[#0055FF] transition-colors"
					>
						Community
					</a>
					<a href="#contact" className="hover:text-[#0055FF] transition-colors">
						Contact
					</a>
				</div>

				<button
					type="button"
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					aria-expanded={isMenuOpen}
					className="md:hidden text-white z-50 relative"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					{isMenuOpen ? <X size={28} /> : <Menu size={28} />}
				</button>
			</motion.nav>

			{/* --- MOBILE MENU --- */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						role="dialog"
						aria-label="Mobile navigation menu"
						initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
						animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
						exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
						transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
						className="fixed inset-0 z-40 bg-[#050505] flex flex-col justify-center px-8"
					>
						<nav aria-label="Mobile navigation">
							<div className="flex flex-col gap-8">
								{["Program", "Space", "Community", "Contact"].map((item, i) => (
									<motion.a
										key={item}
										href={`#${item.toLowerCase()}`}
										onClick={() => setIsMenuOpen(false)}
										initial={{ x: -50, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										transition={{ delay: 0.2 + i * 0.1 }}
										className="text-5xl font-display font-light uppercase tracking-tighter text-white hover:text-[#0055FF] transition-colors flex items-center gap-6"
									>
										<span aria-hidden="true" className="text-sm font-mono opacity-40">0{i + 1}</span>
										{item}
									</motion.a>
								))}
							</div>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>

			<main id="main-content" className="relative z-10">
				{/* --- HERO SECTION --- */}
				<section aria-label="Hero — Unleash your potential at HAWC Gym" className="relative h-screen flex items-center justify-center overflow-hidden">
					<motion.div
						style={{ y: heroY, opacity: heroOpacity }}
						className="absolute inset-0 z-0"
					>
						<img
							src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2668&auto=format&fit=crop"
							alt="Interior of HAWC Gym functional fitness facility with training equipment in San Ramon, California"
							className="w-full h-full object-cover opacity-40 grayscale"
							fetchPriority="high"
						/>
						<div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />
					</motion.div>

					<div className="relative z-10 text-center px-4 w-full max-w-7xl mx-auto mt-20">
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
							className="mb-6 flex justify-center"
						>
							<p className="px-4 py-1.5 border border-white/20 rounded-full text-[10px] font-mono uppercase tracking-[0.3em] text-white/70 backdrop-blur-md">
								Northern California's First HYROX Affiliate
							</p>
						</motion.div>

						<motion.h1
							initial={{ y: 100, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{
								duration: 1.2,
								delay: 0.2,
								ease: [0.16, 1, 0.3, 1],
							}}
							className="text-[12vw] md:text-[10vw] font-display font-black uppercase leading-[0.85] tracking-tighter text-white"
						>
							Unleash
							<br />
							<span
								className="text-transparent"
								style={{ WebkitTextStroke: "2px rgba(255,255,255,0.8)" }}
							>
								Potential
							</span>
							<span className="text-[#0055FF]">.</span>
						</motion.h1>

						<motion.div
							initial={{ y: 50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
							className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
						>
							<a
								href="#contact"
								className="group relative px-8 py-4 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest overflow-hidden rounded-full inline-flex items-center"
							>
								<span className="relative z-10 flex items-center gap-2">
									Start Training{" "}
									<ArrowRight
										size={16}
										aria-hidden="true"
										className="group-hover:translate-x-1 transition-transform"
									/>
								</span>
								<span aria-hidden="true" className="absolute inset-0 bg-[#0055FF] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
								<span aria-hidden="true" className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
									Start Training <ArrowRight size={16} />
								</span>
							</a>

							<button
								type="button"
								aria-label="Watch HAWC Gym film"
								className="flex items-center gap-3 text-white/70 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest group"
							>
								<span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/60 transition-colors" aria-hidden="true">
									<Play size={14} className="ml-1" />
								</span>
								Watch Film
							</button>
						</motion.div>
					</div>
				</section>

				{/* --- STATS STRIP --- */}
				<section aria-label="Gym quick facts" className="border-y border-white/10 bg-[#050505]/80 backdrop-blur-xl relative z-20">
					<dl className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
						{[
							{ label: "Location", val: "San Ramon" },
							{ label: "Established", val: "2017" },
							{ label: "Type", val: "Official Hyrox" },
							{ label: "Vibe", val: "Raw Iron" },
						].map((stat) => (
							<div
								key={stat.label}
								className="p-8 md:p-12 text-center flex flex-col items-center justify-center group"
							>
								<dt className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-3 group-hover:text-[#0055FF] transition-colors">
									{stat.label}
								</dt>
								<dd className="text-xl md:text-3xl font-display font-light uppercase tracking-wide text-white/90">
									{stat.val}
								</dd>
							</div>
						))}
					</dl>
				</section>

				{/* --- SERVICES (Horizontal Accordion) --- */}
				{/* biome-ignore lint/correctness/useUniqueElementIds: intentional navigation anchor */}
				<section id="program" aria-label="Fitness programs and services" className="border-b border-white/10 overflow-hidden">
					<RevealText>
						<div className="flex items-center gap-4 py-16 md:py-20 px-6 md:px-12">
							<div aria-hidden="true" className="w-12 h-[1px] bg-[#0055FF]" />
							<h2 className="font-mono text-xs uppercase tracking-[0.3em] text-[#0055FF]">
								Our Programs
							</h2>
						</div>
					</RevealText>

					{/* Mobile View: Horizontal Carousel */}
					<div className="md:hidden flex overflow-x-auto snap-x snap-mandatory pb-8 px-4 gap-4 no-scrollbar" role="list" aria-label="Fitness programs">
						{SERVICES.map((service, i) => (
							<article
								key={service.title}
								role="listitem"
								className="group relative flex-shrink-0 w-[85vw] snap-center border border-white/10 h-[55vh] min-h-[400px] overflow-hidden"
							>
								<img
									src={service.image}
									alt={`${service.title} program at HAWC Gym`}
									loading="lazy"
									className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700"
								/>
								<div className="absolute inset-0 bg-black/60 transition-all duration-500" />
								<div className="relative z-10 h-full p-6 flex flex-col justify-between">
									<div className="flex justify-between items-start text-white">
										<span aria-hidden="true" className="text-4xl font-display font-black">0{i + 1}</span>
										<ArrowDownRight aria-hidden="true" className="w-8 h-8" />
									</div>
									<div className="text-white">
										<h3 className="text-3xl font-display font-black uppercase mb-2 leading-none">
											{service.title}
										</h3>
										<p className="text-sm opacity-80 leading-tight font-bold">
											{service.description}
										</p>
									</div>
								</div>
							</article>
						))}
					</div>

					{/* Desktop View: Horizontal Hover Accordion */}
					<div className="hidden md:flex h-[600px]" role="list" aria-label="Fitness programs">
						{SERVICES.map((service, i) => (
							<article
								key={service.title}
								role="listitem"
								className="group relative flex-1 hover:flex-[2.5] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] border-r border-white/10 last:border-r-0 overflow-hidden cursor-crosshair"
							>
								<img
									src={service.image}
									alt={`${service.title} program at HAWC Gym`}
									loading="lazy"
									className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
								/>
								<div className="absolute inset-0 transition-colors duration-500 bg-black/70 group-hover:bg-black/40" />

								<div className="relative z-10 h-full w-full pointer-events-none">
									{/* Top number */}
									<div aria-hidden="true" className="absolute top-8 left-8 text-xl font-mono font-bold border-b-2 inline-block pb-1 transition-colors duration-300 text-white/50 border-white/50 group-hover:text-white group-hover:border-white">
										0{i + 1}
									</div>

									{/* Collapsed title (vertical, centered) */}
									<h3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 text-4xl font-display font-black uppercase tracking-tighter whitespace-nowrap transition-all duration-300 opacity-100 group-hover:opacity-0 text-white">
										{service.title}
									</h3>

									{/* Expanded content */}
									<div className="absolute bottom-0 left-0 w-full p-8 md:p-12 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75 flex flex-col justify-end h-1/2 bg-gradient-to-t from-black/90 to-transparent">
										<p aria-hidden="true" className="text-4xl lg:text-6xl font-display font-black uppercase text-white mb-4 leading-[0.9]">
											{service.title}
										</p>
										<p className="text-white/90 text-lg font-bold leading-relaxed max-w-md">
											{service.description}
										</p>
										<div aria-hidden="true" className="mt-6 flex items-center gap-3 text-[#0055FF] font-bold uppercase tracking-widest text-sm">
											Explore <ArrowRight size={20} />
										</div>
									</div>
								</div>
							</article>
						))}
					</div>
				</section>

				{/* --- THE SPACE (SPLIT LAYOUT) --- */}
				{/* biome-ignore lint/correctness/useUniqueElementIds: intentional navigation anchor */}
				<section
					id="space"
					aria-label="Our facility"
					className="relative border-y border-white/10 bg-[#0a0a0a]"
				>
					<div className="grid grid-cols-1 lg:grid-cols-2 min-h-[800px]">
						<div className="p-12 md:p-24 flex flex-col justify-center relative z-10">
							<RevealText>
								<h2 className="text-6xl md:text-8xl font-display font-black uppercase leading-[0.85] tracking-tighter mb-8">
									The
									<br />
									<span
										className="text-transparent"
										style={{ WebkitTextStroke: "1px rgba(255,255,255,0.5)" }}
									>
										Space
									</span>
								</h2>
								<p className="text-xl text-white/60 leading-relaxed max-w-md mb-12 font-light">
									No mirrors to distract. No AC to comfort. Just you, the
									weights, and the work. Our 5,000 sq ft facility in San Ramon is designed for functional
									fitness, HYROX preparation, and raw strength training.
								</p>
							</RevealText>

							<ul className="space-y-6" aria-label="Facility highlights">
								{[
									"5000 SQ FT Facility",
									"Competition Grade Rigs",
									"Concept2 Ergs",
								].map((feature, i) => (
									<RevealText delay={0.2 + i * 0.1} key={feature}>
										<li className="flex items-center gap-4 group cursor-default">
											<span aria-hidden="true" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#0055FF] group-hover:bg-[#0055FF]/10 transition-colors">
												<span className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-[#0055FF] transition-colors" />
											</span>
											<span className="font-mono text-sm uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">
												{feature}
											</span>
										</li>
									</RevealText>
								))}
							</ul>
						</div>

						<div className="relative h-[500px] lg:h-auto overflow-hidden group">
							<img
								src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069"
								alt="HAWC Gym training space with competition-grade rigs and functional fitness equipment"
								loading="lazy"
								className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
							/>
							<div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] to-transparent lg:w-1/3" />
						</div>
					</div>
				</section>

				{/* --- TESTIMONIALS (MINIMAL CARDS) --- */}
				{/* biome-ignore lint/correctness/useUniqueElementIds: intentional navigation anchor */}
				<section
					id="community"
					aria-label="Member testimonials and reviews"
					className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto"
				>
					<RevealText>
						<div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
							<h2 className="text-5xl md:text-7xl font-display font-black uppercase leading-[0.9] tracking-tighter">
								Community
								<br />
								<span className="text-[#0055FF]">Voices</span>
							</h2>
							<div className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
								<Star aria-hidden="true" className="text-[#0055FF] fill-[#0055FF]" size={16} />
								<span className="font-mono text-xs uppercase tracking-widest text-white/80">
									5.0 Average Rating
								</span>
							</div>
						</div>
					</RevealText>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{REVIEWS.map((review, i) => (
							<motion.article
								key={review.name}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: i * 0.1 }}
								className="p-8 md:p-10 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex flex-col justify-between min-h-[320px]"
							>
								<div>
									<div className="flex gap-1 mb-8" role="img" aria-label={`${review.stars} out of 5 stars`}>
										{[1, 2, 3, 4, 5].map((n) => (
											<Star
												key={n}
												size={14}
												aria-hidden="true"
												className="text-[#0055FF] fill-[#0055FF]"
											/>
										))}
									</div>
									<blockquote className="text-lg text-white/80 font-light leading-relaxed mb-8">
										<p>"{review.text}"</p>
									</blockquote>
								</div>
								<footer className="flex justify-between items-center pt-6 border-t border-white/10">
									<cite className="font-display font-bold uppercase tracking-wide text-white not-italic">
										{review.name}
									</cite>
									<time dateTime={new Date(review.date).toISOString().split("T")[0]} className="font-mono text-[10px] text-white/40">
										{review.date}
									</time>
								</footer>
							</motion.article>
						))}
					</div>
				</section>

				{/* --- CONTACT FOOTER --- */}
				{/* biome-ignore lint/correctness/useUniqueElementIds: intentional navigation anchor */}
				<footer
					id="contact"
					className="relative border-t border-white/10 overflow-hidden"
				>
					<div aria-hidden="true" className="absolute inset-0 bg-[#0055FF]/5" />

					<div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
						<div className="p-12 md:p-24 lg:border-r border-white/10">
							<RevealText>
								<h2 className="text-5xl md:text-7xl font-display font-black uppercase leading-[0.9] tracking-tighter mb-6">
									Start
									<br />
									Training.
								</h2>
								<p className="text-white/50 font-mono text-xs uppercase tracking-widest mb-16">
									First class is on us.
								</p>
							</RevealText>

							<form aria-label="Contact form — get your free first class" className="space-y-10" onSubmit={(e) => e.preventDefault()}>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
									<div className="relative group">
										<input
											type="text"
											id={nameId}
											name="name"
											autoComplete="name"
											required
											className="w-full bg-transparent border-b border-white/20 py-2 text-white font-sans focus:outline-none focus:border-[#0055FF] transition-colors peer placeholder-transparent"
											placeholder="Name"
										/>
										<label
											htmlFor={nameId}
											className="absolute left-0 top-2 text-white/40 font-mono text-xs uppercase tracking-widest transition-all peer-focus:-top-5 peer-focus:text-[10px] peer-focus:text-[#0055FF] peer-valid:-top-5 peer-valid:text-[10px]"
										>
											Name
										</label>
									</div>
									<div className="relative group">
										<input
											type="tel"
											id={phoneId}
											name="phone"
											autoComplete="tel"
											required
											className="w-full bg-transparent border-b border-white/20 py-2 text-white font-sans focus:outline-none focus:border-[#0055FF] transition-colors peer placeholder-transparent"
											placeholder="Phone"
										/>
										<label
											htmlFor={phoneId}
											className="absolute left-0 top-2 text-white/40 font-mono text-xs uppercase tracking-widest transition-all peer-focus:-top-5 peer-focus:text-[10px] peer-focus:text-[#0055FF] peer-valid:-top-5 peer-valid:text-[10px]"
										>
											Phone
										</label>
									</div>
								</div>
								<div className="relative group">
									<textarea
										id={messageId}
										name="message"
										rows={1}
										required
										className="w-full bg-transparent border-b border-white/20 py-2 text-white font-sans focus:outline-none focus:border-[#0055FF] transition-colors peer placeholder-transparent resize-none"
										placeholder="Message"
									/>
									<label
										htmlFor={messageId}
										className="absolute left-0 top-2 text-white/40 font-mono text-xs uppercase tracking-widest transition-all peer-focus:-top-5 peer-focus:text-[10px] peer-focus:text-[#0055FF] peer-valid:-top-5 peer-valid:text-[10px]"
									>
										Goals / Message
									</label>
								</div>

								<button
									type="submit"
									className="group relative w-full md:w-auto px-10 py-4 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest overflow-hidden rounded-full mt-8"
								>
									<span className="relative z-10 flex items-center justify-center gap-2">
										Send Message{" "}
										<ArrowRight
											size={16}
											aria-hidden="true"
											className="group-hover:translate-x-1 transition-transform"
										/>
									</span>
									<span aria-hidden="true" className="absolute inset-0 bg-[#0055FF] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
									<span aria-hidden="true" className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
										Send Message <ArrowRight size={16} />
									</span>
								</button>
							</form>
						</div>

						<div className="p-12 md:p-24 flex flex-col justify-between bg-white/5 backdrop-blur-sm">
							<div>
								<h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-12">
									Connect With Us
								</h3>
								<nav aria-label="Social media links" className="space-y-6">
									<a
										href={GYM_INFO.socialLinks.instagram}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Follow HAWC Gym on Instagram"
										className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
									>
										<span className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#0055FF] group-hover:bg-[#0055FF]/10 transition-colors">
											<Instagram size={18} aria-hidden="true" />
										</span>
										<span className="font-display font-bold uppercase tracking-wide text-xl">
											Instagram
										</span>
									</a>
									<a
										href={GYM_INFO.socialLinks.facebook}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Follow HAWC Gym on Facebook"
										className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
									>
										<span className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#0055FF] group-hover:bg-[#0055FF]/10 transition-colors">
											<Facebook size={18} aria-hidden="true" />
										</span>
										<span className="font-display font-bold uppercase tracking-wide text-xl">
											Facebook
										</span>
									</a>
									<a
										href={GYM_INFO.socialLinks.yelp}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="View HAWC Gym reviews on Yelp"
										className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
									>
										<span className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#0055FF] group-hover:bg-[#0055FF]/10 transition-colors">
											<YelpIcon className="w-5 h-5" />
										</span>
										<span className="font-display font-bold uppercase tracking-wide text-xl">
											Yelp
										</span>
									</a>
								</nav>
							</div>

							<address className="mt-16 space-y-4 not-italic">
								<div className="flex items-start gap-4 text-white/60">
									<MapPin size={18} aria-hidden="true" className="text-[#0055FF] shrink-0 mt-1" />
									<a
										href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(GYM_INFO.address)}`}
										target="_blank"
										rel="noopener noreferrer"
										className="font-sans text-sm leading-relaxed hover:text-white transition-colors"
									>
										{GYM_INFO.address}
									</a>
								</div>
								<div className="flex items-center gap-4 text-white/60">
									<Phone size={18} aria-hidden="true" className="text-[#0055FF] shrink-0" />
									<a href={`tel:${GYM_INFO.phonePrimary.replace(/-/g, "")}`} className="font-mono text-sm hover:text-white transition-colors">
										{GYM_INFO.phonePrimary}
									</a>
								</div>
								<div className="flex items-center gap-4 text-white/60">
									<Mail size={18} aria-hidden="true" className="text-[#0055FF] shrink-0" />
									<a href={`mailto:${GYM_INFO.email}`} className="font-mono text-sm hover:text-white transition-colors">
										{GYM_INFO.email}
									</a>
								</div>
							</address>
						</div>
					</div>

					<div className="border-t border-white/10 py-6 px-6 text-center md:flex md:justify-between md:px-12 items-center bg-[#050505]">
						<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
							© {new Date().getFullYear()} HAWC GYM. All Rights Reserved.
						</p>
						<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mt-2 md:mt-0">
							Designed for Performance
						</p>
					</div>
				</footer>
			</main>
		</div>
	);
}
