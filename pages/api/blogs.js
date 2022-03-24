import blogs from "../../sanity/queries/blogs"
import client from "../../sanityClient/client"

export default async function handler(req, res) {
    const { lang, min, max } = req.query
    const blogsContent = await client.fetch(blogs, { lang, min: min, max: max })
    // console.log(lang, min, max)
    return res.send('hello')
} 