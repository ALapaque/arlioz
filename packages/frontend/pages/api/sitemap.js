export default function handler(req, res) {
	res.setHeader('Content-Type', 'text/xml');
	res.send(
		`<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">


<url>
  <loc>https://arlioz.be/</loc>
  <lastmod>2023-09-23T10:51:02+00:00</lastmod>
  <priority>1.00</priority>
</url>
<url>
  <loc>https://arlioz.be/project/Messenger</loc>
  <lastmod>2023-09-23T10:51:02+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://arlioz.be/project/My%2520planning</loc>
  <lastmod>2023-09-23T10:51:02+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://arlioz.be/project/Jk%2520studio</loc>
  <lastmod>2023-09-23T10:51:02+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://arlioz.be/project/Tesla</loc>
  <lastmod>2023-09-23T10:51:02+00:00</lastmod>
  <priority>0.80</priority>
</url>


</urlset>`
	)
}
