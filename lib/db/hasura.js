export async function isNewUser(token, issuer) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      id
      email
      issuer
      publicAddress
    }
  }
`;
 const response = await queryHasuraGQL(
  operationsDoc,
  "isNewUser",
  { issuer },
  token
 )

 return response?.data.users?.length === 0 ? true : false;
}

export async function queryHasuraGQL(operationsDoc, operationName, variables, token) {
    const result = await fetch(
       process.env.NEXT_PUBLIC_HASURA_ADMIN_URL,
      {
        method: "POST",
        headers: {
            Authorization: 
            `Bearer ${token}`,
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          query: operationsDoc,
          variables: variables,
          operationName: operationName
        })
      }
    );
    const finalResult = await result.json();
    return finalResult;
}

export async function createNewUser(token, metadata) {
  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, publicAddress: $publicAddress, issuer: $issuer}) {
      affected_rows
      returning {
        email
        id
        issuer
        publicAddress
      }
    }
  }
`;

  const { issuer, email, publicAddress } = metadata;

 const response = await queryHasuraGQL(
  operationsDoc,
  "createNewUser",
  { issuer, email, publicAddress },
  token
 )

 return response;
}

export async function insertStats(token, { favourited, userId, watched, videoId }) {
  const operationsDoc = `
  mutation insertStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
    insert_stats_one(
      object: { 
        favourited: $favourited,
        userId: $userId,
        watched: $watched,
        videoId: $videoId
    })  {
        favourited,
        userId,
        watched,
        videoId
    }
  }
`;

 const response = await queryHasuraGQL(
  operationsDoc,
  "insertStats",
  { favourited, userId, watched, videoId },
  token
 )

 return response;
}

export async function updateStats(token, { favourited, userId, watched, videoId }) {
  const operationsDoc = `
  mutation updateStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
    update_stats(
       _set: { watched: $watched, favourited: $favourited }, 
       where: {
        userId: { _eq: $userId }, 
        videoId: { _eq: $videoId }
    }) {
      returning {
          favourited,
          userId,
          watched,
          videoId
      }
    }
  }
`;

 const response = await queryHasuraGQL(
  operationsDoc,
  "updateStats",
  { favourited, userId, watched, videoId },
  token
 )

 return response;
}

export async function findVideoIdByUser(userId, videoId, token) {
  const operationsDoc = `
  query findVideoIdByUser($userId : String!, $videoId: String!) {
    stats(where: { userId: {_eq: $userId}, videoId: {_eq: $videoId} }) {
      id
      userId
      videoId
      favourited
      watched
    }
  }
`;

const response = await queryHasuraGQL(
  operationsDoc,
  "findVideoIdByUser",
  { videoId, userId,  },
  token
 )

  return response?.data?.stats;
}