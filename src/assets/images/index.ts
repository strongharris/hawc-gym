import heroCommunity from "./hero-community.jpg";
import hyroxPodium from "./hyrox-podium.jpg";
import serviceGroupTraining from "./service-group-training.jpg";
import serviceHyrox from "./service-hyrox.jpg";
import serviceOpenGym from "./service-open-gym.jpg";
import servicePersonalTraining from "./service-personal-training.jpg";
import spaceCommunity from "./space-exterior.jpg";

// Gallery / community photos
import galleryDekaGroup from "./gallery-deka-group.jpg";
import galleryGymFamily from "./gallery-gym-family.jpg";
import galleryHyroxAction from "./gallery-hyrox-action.jpg";
import galleryHyroxTeam from "./gallery-hyrox-team.jpg";
import galleryMudRun from "./gallery-mud-run.jpg";
import galleryOutdoorGroup from "./gallery-outdoor-group.jpg";
import gallerySocialOuting from "./gallery-social-outing.jpg";

export const images = {
	heroCommunity,
	serviceHyrox,
	servicePersonalTraining,
	serviceGroupTraining,
	serviceOpenGym,
	spaceCommunity,
	hyroxPodium,
} as const;

// Map service titles → Vite-hashed image URLs
export const SERVICE_IMAGES: Record<string, string> = {
	HYROX: serviceHyrox,
	"1x1 Personal Training": servicePersonalTraining,
	"Group Cross Training": serviceGroupTraining,
	"Open Gym": serviceOpenGym,
	"Youth Fitness Classes": hyroxPodium, // TODO: replace when a real youth photo is available
};

// Community gallery photos — used in the photo collage section
export const GALLERY_PHOTOS = [
	{ src: galleryDekaGroup, alt: "HAWC Gym DEKA competition group with medals inside the gym", w: 600, h: 450 },
	{ src: galleryMudRun, alt: "HAWC members covered in mud after an obstacle race", w: 600, h: 398 },
	{ src: gallerySocialOuting, alt: "HAWC Gym members on a social outing together", w: 600, h: 450 },
	{ src: galleryHyroxTeam, alt: "HAWC team at the HYROX podium wall", w: 600, h: 450 },
	{ src: galleryOutdoorGroup, alt: "Large HAWC Gym group training session outdoors", w: 600, h: 450 },
	{ src: galleryGymFamily, alt: "HAWC Gym families — members with a toddler at the gym", w: 450, h: 600 },
	{ src: galleryHyroxAction, alt: "Athlete throwing a wall ball at HYROX competition", w: 600, h: 400 },
	{ src: spaceCommunity, alt: "HAWC members celebrating with medals outside the gym", w: 1000, h: 750 },
	{ src: hyroxPodium, alt: "HAWC Gym team celebrating on the HYROX podium", w: 800, h: 600 },
	{ src: serviceGroupTraining, alt: "HAWC Gym group flexing after a training session", w: 800, h: 800 },
] as const;
