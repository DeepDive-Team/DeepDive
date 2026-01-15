declare module "*.module.css" {
	const classes: { [className: string]: string };
	export = classes;
}