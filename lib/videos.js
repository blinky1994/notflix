import disneyVideosData from '../data/disney-videos.json'
import productivityVideosData from '../data/productivity-videos.json'
import travelVideosData from '../data/travel-videos.json'
import popularVideosData from '../data/popular-videos.json'

// export const getCommonVideos = async (url) => {
//     const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

//     try {
//         const BASE_URL = 'youtube.googleapis.com/youtube/v3';
//         const response = await fetch(`https://${BASE_URL}/${url}&key=${YOUTUBE_API_KEY}`) 
//         const data = await response.json();

//         if (data?.error) {
//             console.error('YOutube API error', data.error);
//             return [];
//         }

//         return data?.items.map(item => {
//             return {
//                 title: item.snippet.title,
//                 imgUrl: item.snippet.thumbnails.high.url,
//                 id: item?.id?.videoId,
//             }
//         });
//     } catch (e) {
//         console.error('Something went wrong with video library');
//         throw new Error(e);
//     }
// }

const getVideos = (data) => {
    // const formatQuery = query.replace(/\s/g, '%20');

    // const URL = `search?part=snippet&maxResults=8&q=${formatQuery}&type=video`;
    // return getCommonVideos(URL);

    return data?.items.map(item => {
        return {
            title: item.snippet.title,
            imgUrl: item.snippet.thumbnails.high.url,
            id: item?.id?.videoId,
        }
    });
}

export const getDisneyVideos = () => {
    return getVideos(disneyVideosData);
}

export const getProductivityVideos = () => {
    return getVideos(productivityVideosData);
}

export const getTravelVideos = () => {
    return getVideos(travelVideosData);
}

export const getPopularVideos = () => {
    return getVideos(popularVideosData);
}