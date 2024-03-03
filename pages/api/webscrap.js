import fetch from 'node-fetch'

export default async (req, res) => {
    try {
        const { videoUrl } = req.query
        const response = await fetch(videoUrl)
        const html = await response.text()
        res.send(html)
    } catch (error) {
        console.error('error: ', error)
        res.status(500).json({ error: 'internal server error' })
    }
}