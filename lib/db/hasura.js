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
