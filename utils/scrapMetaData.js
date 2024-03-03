export const extractYouTubeMetadata = async (videoUrl) => {
    try {
        const response = await fetch(`/api/webscrap/videoUrl=${encodeURIComponent(videoUrl)}`)
        return await response.text()
    } catch (error) {
        console.error('error: ', error)
        return null
    }
}