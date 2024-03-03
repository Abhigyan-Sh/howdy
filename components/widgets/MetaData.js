import React, { useState, useEffect } from 'react'
import { extractYouTubeMetadata } from '../../utils/scrapMetaData'
import cheerio from 'cheerio'

const MetaData = ({ url }) => {
    const [metadata, setMetadata] = useState(null)

    const fetchData = async () => {
        try {
            const html = await extractYouTubeMetadata(url)
            console.log(html)
            const $ = cheerio.load(html)
            const title = $('meta[property="og:title"]').attr('content')
            const description = $('meta[property="og:description"]').attr('content')
            const thumbnailUrl = $('meta[property="og:image"]').attr('content')

            setMetadata({ title, description, thumbnailUrl })
        } catch (error) {
            console.error('Error:', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (!metadata) {
        return <div>Loading...</div>
    }
    console.log(metadata)

    return (
        <div className="flex">
            <p>{metadata.title}</p>
            <p>{metadata.description}</p>
            <img src={metadata.thumbnailUrl} alt="Thumbnail" />
        </div>
    )
}

export default MetaData
