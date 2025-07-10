import React from "react";
import { MotionHighlight } from "@/components/animate-ui/effects/motion-highlight";

const FREELANCERS = [
	{
		name: "Rakesh Kumar",
		badge: "Top Rated",
		badgeIcon: "◆◆◆",
		language: "English",
		description:
			"We are a top AI, Web & Mobile App Development Agency with 5+ years of experience.",
		skills: [
			"Node.js",
			"React",
			"JavaScript",
			"User experience design",
			"+ 25",
		],
		avatar: "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740", // Replace with your avatar image path
		reviews: 92,
		rating: 4.7,
		orders: 139,
	},
    {
		name: "Ankita Shukla",
		badge: "Top Rated",
		badgeIcon: "◆◆◆",
		language: "English",
		description:
			"We are a top AI, Web & Mobile App Development Agency with 5+ years of experience.",
		skills: [
			"Node.js",
			"React",
			"JavaScript",
			"User experience design",
			"+ 25",
		],
		avatar: "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740", // Replace with your avatar image path
		reviews: 92,
		rating: 4.7,
		orders: 139,
	},
    {
		name: "Himanshi Singh",
		badge: "Top Rated",
		badgeIcon: "◆◆◆",
		language: "English",
		description:
            "We are a top AI, Web & Mobile App Development Agency with 5+ years of experience.",
		skills: [
			"Node.js",
			"React",
			"JavaScript",
			"User experience design",
			"+ 25",
		],
		avatar: "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740", // Replace with your avatar image path
		reviews: 92,
		rating: 4.7,
		orders: 112,
	},
	{
		name: "Priya Sharma",
		badge: "Rising Talent",
		badgeIcon: "◆",
		language: "English, Hindi",
		description:
			"Creative UI/UX designer with a passion for crafting intuitive and visually appealing digital experiences.",
		skills: ["Figma", "Adobe XD", "User Research", "Wireframing", "+ 10"],
		avatar: "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740",
		reviews: 15,
		rating: 4.9,
		orders: 20,
	},
	{
		name: "Amit Patel",
		badge: "Level Two",
		badgeIcon: "◆◆",
		language: "English",
		description:
			"I write compelling and SEO-optimized content that engages readers and drives traffic.",
		skills: ["Content Writing", "SEO", "Copywriting", "Blogging", "+ 15"],
		avatar: "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740",
		reviews: 45,
		rating: 4.8,
		orders: 78,
	},
	{
		name: "Sneha Reddy",
		badge: "Top Rated",
		badgeIcon: "◆◆◆",
		language: "English, Telugu",
		description:
			"Professional video editor turning raw footage into cinematic stories. Let's create something amazing.",
		skills: [
			"Premiere Pro",
			"After Effects",
			"Color Grading",
			"Motion Graphics",
			"+ 8",
		],
		avatar: "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740",
		reviews: 150,
		rating: 5.0,
		orders: 210,
    }
];

const Freelancers = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
			{FREELANCERS.map((f, idx) => (
				<MotionHighlight key={idx} hover className="rounded-2xl">
					<div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 flex flex-col items-start max-w-md mx-auto">
						<div className="flex items-center gap-4 w-full">
							<img
								src={f.avatar}
								alt={f.name}
								className="w-16 h-16 rounded-full object-cover border-2 border-green-400"
							/>
							<div>
								<div className="flex items-center gap-2">
									<span className="text-xl font-bold text-gray-900">
										{f.name}
									</span>
									<span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
										{f.badge}{" "}
										<span className="text-xs">{f.badgeIcon}</span>
									</span>
								</div>
								<div className="text-gray-500 text-sm">
									{f.language}
								</div>
							</div>
						</div>
						<div className="mt-3 text-gray-700 text-base line-clamp-2">
							{f.description}
						</div>
						<div className="flex flex-wrap gap-2 mt-4">
							{f.skills.map((skill, i) => (
								<span
									key={i}
									className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
								>
									{skill}
								</span>
							))}
						</div>
						<div className="flex items-center justify-between w-full mt-6 pt-4 border-t">
							<div className="flex flex-col items-center">
								<span className="text-xs text-gray-500">Reviews</span>
								<span className="flex items-center gap-1 font-semibold text-gray-800">
									<svg
										className="w-4 h-4 text-yellow-500"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
									</svg>
									{f.rating}
								</span>
								<span className="text-xs text-gray-500">
									{f.reviews} Reviews
								</span>
							</div>
							<div className="flex flex-col items-center">
								<span className="text-xs text-gray-500">Orders</span>
								<span className="font-bold text-gray-800">
									{f.orders}
								</span>
							</div>
						</div>
					</div>
				</MotionHighlight>
			))}
		</div>
	);
};

export default Freelancers;
