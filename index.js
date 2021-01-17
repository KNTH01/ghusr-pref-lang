require('dotenv').config()
const { GraphQLClient, gql } = require('graphql-request')

async function main() {
  const endpoint = 'https://api.github.com/graphql'
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.TOKEN}`,
    },
  })

  const query = gql`
    {
      repositoryOwner(login: "KevinNTH") {
        repositories(last: 100, privacy: PUBLIC) {
          totalCount
          edges {
            node {
              name
              languages(last: 100) {
                edges {
                  size
                  node {
                    name
                    id
                    color
                  }
                }
              }
            }
          }
        }
      }
    }
  `
  const data = await graphQLClient.request(query)

  console.log(JSON.stringify(data, undefined, 2))
}

main().catch((error) => console.error(error))
