import reusableQuery from "../../../sanity/queries/reusables"
import client from "../../../sanityClient/client"

export default async function handler(req, res) {
    const {lang} = req.query
    // Get data from Sanity
    const reusables = await client.fetch(reusableQuery, { lang })
    return res.send(reusables)
} 