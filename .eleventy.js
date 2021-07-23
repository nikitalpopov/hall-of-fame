module.exports = (eleventyConfig) => {
	const handlebars = require('handlebars');
	eleventyConfig.setLibrary('hbs', handlebars);

	eleventyConfig.addHandlebarsHelper("jsonPrint", obj => JSON.stringify(obj, null, 2));
	eleventyConfig.addHandlebarsHelper("addOne", num => (num + 1));
	eleventyConfig.addHandlebarsHelper("eq", (a, b) => (a === b));
	eleventyConfig.addHandlebarsHelper("gt", (a, b) => (+a) > (+b));
	eleventyConfig.addHandlebarsHelper("not", exp => !exp);

	eleventyConfig.addWatchTarget('./_tmp/style.css');
	eleventyConfig.addPassthroughCopy({ './_tmp/style.css': './style.css' });

	eleventyConfig.addPassthroughCopy('assets');

	return {
		dir: {
			input: './',
			includes: 'includes'
		},
		passthroughFileCopy: true
	}
}
