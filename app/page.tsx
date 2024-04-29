import { GithubIcon } from "@/components/icons";
import { LogButton } from "@/components/logButton";
import { subtitle, title } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-56">
			<div className="justify-center inline-block max-w-lg text-center">
				<h1 className={title({ size: "lg" })}>Make&nbsp;</h1>
				<h1 className={title({ size: "lg", className: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text font-bold" })}>streaks&nbsp;</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					start consistency today
				</h2>
			</div>

			<div className="flex gap-3">
				<Link
					isExternal
					className={buttonStyles({ variant: "bordered" })}
					href={siteConfig.links.github}
				>
					<GithubIcon size={20} />
					GitHub
				</Link>
				<LogButton />
			</div>
		</section>
	);
}
