export async function isNewUser(token) {
  const operationsDoc = `
  query MyQuery {
    users(where: {issuer: {_eq: "did:ethr:0x67dd71A73682F0023caEc8A99A2c57Ec00Aa63e4"}}) {
      id
      email
      issuer
      publicAddress
    }
  }
`;
 const response = await queryHasuraGQL(
  operationsDoc,
  "MyQuery",
  {},
  token
 )

 console.log({response});
 return response?.users?.length === 0 ? true : false;
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

  const operationsDoc = `
  query MyQuery {
    users(where: {issuer: {_eq: "did:ethr:0x67dd71A73682F0023caEc8A99A2c57Ec00Aa63e4"}}) {
      id
      email
      issuer
      publicAddress
    }
  }
`;

function fetchMyQuery() {
  return queryHasuraGQL(
    operationsDoc,
    "MyQuery",
    {},
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweDY3ZGQ3MUE3MzY4MkYwMDIzY2FFYzhBOTlBMmM1N0VjMDBBYTYzZTQiLCJwdWJsaWNBZGRyZXNzIjoiMHg2N2RkNzFBNzM2ODJGMDAyM2NhRWM4QTk5QTJjNTdFYzAwQWE2M2U0IiwiZW1haWwiOiJpdmFuY2hlbnlpZmFuQGhvdG1haWwuY29tIiwib2F1dGhQcm92aWRlciI6bnVsbCwicGhvbmVOdW1iZXIiOm51bGwsImlhdCI6MTY2ODY5NTc0NCwiZXhwIjoxNjY5MzAwNTQ0LCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsImFkbWluIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiZGlkOmV0aHI6MHg2N2RkNzFBNzM2ODJGMDAyM2NhRWM4QTk5QTJjNTdFYzAwQWE2M2U0In19.skohdkXzXvTTy2MT_gVrrG4YAZp_yoO5vEHdfkHyKDE'
  );
}

export async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);
}

