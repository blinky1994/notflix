export async function queryHasuraGQL(operationsDoc, operationName, variables) {
    const result = await fetch(
       process.env.NEXT_PUBLIC_HASURA_ADMIN_URL,
      {
        method: "POST",
        headers: {
            Authorization: 
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVG9tbXkgRG9lIiwiaWF0IjoxNjY4NjgwNzI3LCJleHAiOjE2Njg2ODE3MjcsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIiwiYWRtaW4iXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiJqb2hubnkifX0.c2RzGpp4gZGWReNh5dhQLutDb9HmBoT1rhfkx81oRf0"
        },
        body: JSON.stringify({
          query: operationsDoc,
          variables: variables,
          operationName: operationName
        })
      }
    );
      const finalResult = await result.json();
      console.log(finalResult.data);
    return finalResult;
  }

