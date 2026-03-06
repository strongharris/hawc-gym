export const SITE_URL = "https://hawcgym.com";

export const GYM_INFO = {
	name: "HAWC GYM",
	tagline: "Northern California's FIRST HYROX Gym!",
	address: "12811a Alcosta Blvd, San Ramon, CA 94583",
	streetAddress: "12811a Alcosta Blvd",
	city: "San Ramon",
	state: "CA",
	zip: "94583",
	country: "US",
	phonePrimary: "925-499-2128",
	phoneSecondary: "925-240-3644",
	email: "eastbaytrainers@gmail.com",
	geo: {
		latitude: 37.7624,
		longitude: -121.9178,
	},
	// Mon–Fri 6 AM–8 PM, Sat 7 AM–12 PM, Sun closed
	hours: [
		{ day: "Monday",    open: "6:00 AM",  close: "8:00 PM" },
		{ day: "Tuesday",   open: "6:00 AM",  close: "8:00 PM" },
		{ day: "Wednesday", open: "6:00 AM",  close: "8:00 PM" },
		{ day: "Thursday",  open: "6:00 AM",  close: "8:00 PM" },
		{ day: "Friday",    open: "6:00 AM",  close: "8:00 PM" },
		{ day: "Saturday",  open: "7:00 AM",  close: "12:00 PM" },
		{ day: "Sunday",    open: null,        close: null },
	],
	// schema.org openingHours format
	openingHours: [
		"Mo-Fr 06:00-20:00",
		"Sa 07:00-12:00",
	],
	socialLinks: {
		instagram: "https://www.instagram.com/hawcsanramon/",
		facebook: "https://www.facebook.com/hawcgym",
		yelp: "https://www.yelp.com/biz/hawc-gym-san-ramon",
	},
};

export const SERVICES = [
	{
		title: "HYROX",
		description:
			"First Race or trying to PR - There's a spot on our team for everyone!",
	},
	{
		title: "1x1 Personal Training",
		description: "Personalized coaching to meet your specific fitness goals.",
	},
	{
		title: "Group Cross Training",
		description: "High energy group classes that challenge your limits.",
	},
	{
		title: "Open Gym",
		description: "Access to top-tier equipment on your own schedule.",
	},
	{
		title: "Youth Fitness Classes",
		description: "Classes for ages 12-14. Building strong foundations.",
	},
];

// ── Schedule ──────────────────────────────────────────────────────────

export const CLASS_TYPES = {
	HYROX: {
		label: "HYROX",
		color: "#AAFF00",
		bgClass: "bg-[#AAFF00]/15 border-[#AAFF00]/40 text-[#AAFF00]",
	},
	PERSONAL_TRAINING: {
		label: "1x1 Personal Training",
		color: "#0055FF",
		bgClass: "bg-[#0055FF]/15 border-[#0055FF]/40 text-[#0055FF]",
	},
	GROUP_CROSS_TRAINING: {
		label: "Group Cross Training",
		color: "#FF6B35",
		bgClass: "bg-[#FF6B35]/15 border-[#FF6B35]/40 text-[#FF6B35]",
	},
	OPEN_GYM: {
		label: "Open Gym",
		color: "#FFFFFF",
		bgClass: "bg-white/10 border-white/30 text-white/80",
	},
	YOUTH_FITNESS: {
		label: "Youth Fitness",
		color: "#A855F7",
		bgClass: "bg-[#A855F7]/15 border-[#A855F7]/40 text-[#A855F7]",
	},
} as const;

export type ClassTypeKey = keyof typeof CLASS_TYPES;

export interface ScheduleClass {
	id: string;
	type: ClassTypeKey;
	title: string;
	instructor: string;
	day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
	startTime: string;
	endTime: string;
	startHour: number;
	durationMinutes: number;
}

export const SCHEDULE_DAYS = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
] as const;

export const SCHEDULE_HOURS = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19] as const;

export const SCHEDULE_CLASSES: ScheduleClass[] = [
	// Monday
	{ id: "m1", type: "HYROX", title: "HYROX Foundations", instructor: "Coach Mike", day: "Monday", startTime: "6:00 AM", endTime: "7:00 AM", startHour: 6, durationMinutes: 60 },
	{ id: "m2", type: "GROUP_CROSS_TRAINING", title: "CrossTrain AM", instructor: "Coach Bri", day: "Monday", startTime: "7:15 AM", endTime: "8:15 AM", startHour: 7.25, durationMinutes: 60 },
	{ id: "m3", type: "PERSONAL_TRAINING", title: "1x1 Session", instructor: "Coach Mike", day: "Monday", startTime: "9:00 AM", endTime: "10:00 AM", startHour: 9, durationMinutes: 60 },
	{ id: "m4", type: "OPEN_GYM", title: "Open Gym", instructor: "", day: "Monday", startTime: "11:00 AM", endTime: "2:00 PM", startHour: 11, durationMinutes: 180 },
	{ id: "m5", type: "YOUTH_FITNESS", title: "Youth Fitness", instructor: "Coach Bri", day: "Monday", startTime: "4:00 PM", endTime: "5:00 PM", startHour: 16, durationMinutes: 60 },
	{ id: "m6", type: "HYROX", title: "HYROX Race Prep", instructor: "Coach Mike", day: "Monday", startTime: "5:30 PM", endTime: "6:30 PM", startHour: 17.5, durationMinutes: 60 },
	// Tuesday
	{ id: "t1", type: "GROUP_CROSS_TRAINING", title: "CrossTrain AM", instructor: "Coach Bri", day: "Tuesday", startTime: "6:00 AM", endTime: "7:00 AM", startHour: 6, durationMinutes: 60 },
	{ id: "t2", type: "HYROX", title: "HYROX Endurance", instructor: "Coach Mike", day: "Tuesday", startTime: "7:15 AM", endTime: "8:15 AM", startHour: 7.25, durationMinutes: 60 },
	{ id: "t3", type: "PERSONAL_TRAINING", title: "1x1 Session", instructor: "Coach Mike", day: "Tuesday", startTime: "10:00 AM", endTime: "11:00 AM", startHour: 10, durationMinutes: 60 },
	{ id: "t4", type: "GROUP_CROSS_TRAINING", title: "CrossTrain PM", instructor: "Coach Bri", day: "Tuesday", startTime: "5:30 PM", endTime: "6:30 PM", startHour: 17.5, durationMinutes: 60 },
	// Wednesday
	{ id: "w1", type: "HYROX", title: "HYROX Foundations", instructor: "Coach Mike", day: "Wednesday", startTime: "6:00 AM", endTime: "7:00 AM", startHour: 6, durationMinutes: 60 },
	{ id: "w2", type: "GROUP_CROSS_TRAINING", title: "CrossTrain AM", instructor: "Coach Bri", day: "Wednesday", startTime: "7:15 AM", endTime: "8:15 AM", startHour: 7.25, durationMinutes: 60 },
	{ id: "w3", type: "OPEN_GYM", title: "Open Gym", instructor: "", day: "Wednesday", startTime: "11:00 AM", endTime: "2:00 PM", startHour: 11, durationMinutes: 180 },
	{ id: "w4", type: "YOUTH_FITNESS", title: "Youth Fitness", instructor: "Coach Bri", day: "Wednesday", startTime: "4:00 PM", endTime: "5:00 PM", startHour: 16, durationMinutes: 60 },
	{ id: "w5", type: "HYROX", title: "HYROX Race Prep", instructor: "Coach Mike", day: "Wednesday", startTime: "5:30 PM", endTime: "6:30 PM", startHour: 17.5, durationMinutes: 60 },
	// Thursday
	{ id: "th1", type: "GROUP_CROSS_TRAINING", title: "CrossTrain AM", instructor: "Coach Bri", day: "Thursday", startTime: "6:00 AM", endTime: "7:00 AM", startHour: 6, durationMinutes: 60 },
	{ id: "th2", type: "HYROX", title: "HYROX Endurance", instructor: "Coach Mike", day: "Thursday", startTime: "7:15 AM", endTime: "8:15 AM", startHour: 7.25, durationMinutes: 60 },
	{ id: "th3", type: "PERSONAL_TRAINING", title: "1x1 Session", instructor: "Coach Bri", day: "Thursday", startTime: "10:00 AM", endTime: "11:00 AM", startHour: 10, durationMinutes: 60 },
	{ id: "th4", type: "GROUP_CROSS_TRAINING", title: "CrossTrain PM", instructor: "Coach Bri", day: "Thursday", startTime: "5:30 PM", endTime: "6:30 PM", startHour: 17.5, durationMinutes: 60 },
	// Friday
	{ id: "f1", type: "HYROX", title: "HYROX Simulation", instructor: "Coach Mike", day: "Friday", startTime: "6:00 AM", endTime: "7:30 AM", startHour: 6, durationMinutes: 90 },
	{ id: "f2", type: "GROUP_CROSS_TRAINING", title: "CrossTrain AM", instructor: "Coach Bri", day: "Friday", startTime: "8:00 AM", endTime: "9:00 AM", startHour: 8, durationMinutes: 60 },
	{ id: "f3", type: "OPEN_GYM", title: "Open Gym", instructor: "", day: "Friday", startTime: "11:00 AM", endTime: "2:00 PM", startHour: 11, durationMinutes: 180 },
	{ id: "f4", type: "HYROX", title: "HYROX Race Prep", instructor: "Coach Mike", day: "Friday", startTime: "5:00 PM", endTime: "6:00 PM", startHour: 17, durationMinutes: 60 },
	// Saturday
	{ id: "s1", type: "HYROX", title: "HYROX Community WOD", instructor: "Coach Mike", day: "Saturday", startTime: "7:00 AM", endTime: "8:30 AM", startHour: 7, durationMinutes: 90 },
	{ id: "s2", type: "GROUP_CROSS_TRAINING", title: "CrossTrain Weekend", instructor: "Coach Bri", day: "Saturday", startTime: "9:00 AM", endTime: "10:00 AM", startHour: 9, durationMinutes: 60 },
	{ id: "s3", type: "OPEN_GYM", title: "Open Gym", instructor: "", day: "Saturday", startTime: "10:00 AM", endTime: "12:00 PM", startHour: 10, durationMinutes: 120 },
];

export const REVIEWS = [
	{
		name: "Alexandra C.",
		date: "1/12/2026",
		stars: 5,
		text: "HAWC Gym is more than a gym it's a community, a family, and a place where you become a better version of yourself. All ages are welcome. All fitness levels...",
	},
	{
		name: "Rizza G.",
		date: "5/5/2024",
		stars: 5,
		text: "Crazy luck—Been dealing with injuries for sometime as I busted my sesamoid and more, but found this gym which was approved by my podiatrist who also...",
	},
	{
		name: "Janine B.",
		date: "10/5/2024",
		stars: 5,
		text: "Wonderful place to workout!! Each workout is different and challenging so you never get bored. Caters to competitive athletes and newbies.",
	},
];
