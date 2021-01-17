require('dotenv').config()
const { GraphQLClient, gql } = require('graphql-request')

function computeData(data) {
  const edgeRepositories = data.repositoryOwner.repositories.edges
  const result = {}

  for (let nodeRepository of edgeRepositories) {
    nodeRepository.node.languages.edges.map((item) => {
      const size = item.size
      const name = item.node.name

      result[name] = result[name] ? result[name] + size : size
    })
  }

  return Object.entries(result)
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
}

async function main() {
  const endpoint = 'https://api.github.com/graphql'
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.TOKEN}`,
    },
  })

  const username = 'KevinNTH'
  const query = gql`
    query getLanguagesRepartition($username: String!) {
      repositoryOwner(login: $username) {
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
  const data = await graphQLClient.request(query, { username })
  const result = computeData(data)

  console.log(`Language repartition (in Bytes) for ${username}`)
  Object.keys(result).map((language) => {
    console.log(`* ${result[language]}: ${language}`)
  })
}

main().catch((error) => console.error(error))
