export default function handler(req, res) {
	res.send('' +
		'User-agent: *\n' +
		'Allow: /\n' +
		'\n' +
		'Sitemap: https://arlioz.be/sitemap.xml' +
		'')
}
