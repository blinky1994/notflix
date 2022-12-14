import disneyVideosData from '../data/disney-videos.json'
import productivityVideosData from '../data/productivity-videos.json'
import travelVideosData from '../data/travel-videos.json'
import popularVideosData from '../data/popular-videos.json'
import bannerVideosData from '../data/banner-videos.json'
import { getMyListVideosDB, getWatchedVideos } from './db/hasura'

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
            publishTime: item.snippet.publishedAt,
            description: item.snippet.description,
            channelTitle: item.snippet.channelTitle,
            viewCount: Math.floor(Math.random(0.001, 1) * 10000000),
        }
    });
}

const getAllVideos = () => {
    return [ 
        ...getVideos(disneyVideosData), //10
        ...getVideos(productivityVideosData), //10
        ...getVideos(travelVideosData), //10
        ...getVideos(popularVideosData), //10
        ...getVideos(bannerVideosData) // 3
    ];
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

export const getBannerVideos = () => {
    return getVideos(bannerVideosData);
}

export const getVideoById = async (videoId) => {
    const allVideos = getAllVideos();
    const foundVideo = allVideos.find(video => video.id === videoId );

    return foundVideo ? foundVideo : {} 
}

export const getWatchItAgainVideos = async (userId, token) => {

    const watchedVideoIds = await getWatchedVideos(userId, token);

    if (watchedVideoIds.length) {
        const allVideos = getAllVideos();

        // const watchItAgainVideos = allVideos.filter(video => watchedVideoIds.includes(video.id));
        const watchItAgainVideos = watchedVideoIds.map(id => {
            return allVideos.find(video => video.id === id);
        })
        return watchItAgainVideos.reverse();
    }

    return [];
} 

export const getMyListVideos = async (userId, token) => {
    const myListVideoIds = await getMyListVideosDB(userId, token);
    if (myListVideoIds.length) {
        const allVideos = getAllVideos();

        const myListVideos = myListVideoIds.map(id => {
            return allVideos.find(video => video.id === id);
        })
        return myListVideos.reverse();
    }

    return [];
}