export default function LoginLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col items-center justify-center gap-4">
			<div className="justify-center inline-block w-full max-w-md text-center">
				{children}
			</div>
		</section>
	);
}
