# Notflix
Video streaming site based on Netflix, built with React and NextJS. Uses Magic API for passwordless authentication and youtube API to fetch videos. Since it's built on NextJS, the server side rendering provides a very fast loading time. More details on rendering methods below.

![notflix](https://user-images.githubusercontent.com/56903269/209973264-8c485c1b-0ad6-4164-933b-7021eaacd14a.png)

# User authentication
For user authentication, I used Magic Auth (https://magic.link/docs/home/welcome) to provide a passwordless login which uses email verification. Magic Auth provides a DID (Decentralized ID) token which I later used to create a JSON web token to authenticate the user. The user will be automatically be signed out if no cookies are created.

# Youtube API
I obtained video data from the Youtube API and due to the API limit, I saved the data in a JSON format and used them for the videos page so it is not dynamic (A dynamic videos page was the initial plan but I ran out of limit as mentioned before).

# Static Generation 
Since I have the youtube videos data stored locally, I used static site generation since the data is available at build time. NextJS pre-renders content by default which is later hydrated. This method allows for caching on the CDN networks without configuration so it helps to improve loading times.

# Incremental Static Regeneration 
When there's dynamic data such as view counts, static generation does not update it since the content is pre-rendered during built time. This is where incremental static regeneration comes in. It uses a revalidatation interval where it will rebuild and update the cache with latest data. To provide an example, a revalidate value of 60 seconds will mean that when a subsequent user loads a page that has been cached the first time, the timer will run for 60s before regenerating the page and updating the cache. This is how the view count data updates.

# Server Side Rendering
As this is a content-heavy site for videos, server side rendering will be a good technique here as the server can take on the load of pre-rendering the html with the video content and at the same time, allow for proper SEO (search engine optimization). This further improves the user experience due to faster loading times.

# Storing user liked videos
A `/stats` endpoint works with Hasura GraphQL to fetch / mutate the user's stat data such as `watched`, `userId`, `videoId`, `favourited`. The database that Hasura is linked to is the PostgreSQL relational database where there is a user's table and stats table. The stats table hold the data as mentioned before and the user's table stores data like `issuer` (Decentralized ID), `publicAddress` (user's public key), `email`, and `id`.
