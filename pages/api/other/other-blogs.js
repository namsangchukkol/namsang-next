import otherBlogs from "../../../sanity/queries/otherBlogs"
import client from "../../../sanityClient/client"

export default async function handler(req, res) {
    const { lang, slug } = req.query
    const blogs = await client.fetch(otherBlogs, { lang, slug })
    return res.send(blogs)
} 