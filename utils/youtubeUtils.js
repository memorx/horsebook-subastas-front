// utils/youtubeUtils.js

export function extractYouTubeId(url) {
    if (url) {
        try {
            const parsedUrl = new URL(url);
            const pathParts = parsedUrl.pathname.split("/");
            let videoId = parsedUrl.searchParams.get("v");

            // If the URL contains "/live/", extract the ID from the preceding segment
            if (pathParts.includes("live")) {
                const index = pathParts.indexOf("live");
                videoId = pathParts[index - 1];
            }

            // If the ID is not found in the query parameters,
            // try to extract it from the path
            if (!videoId) {
                videoId = pathParts[pathParts.length - 1];
            }

            return videoId;
        } catch (error) {
            return null;
        }
    } else {
        return null;
    }
}
