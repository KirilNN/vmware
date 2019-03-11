export const getRepos = () => `{
    organization(login: "vmware") {
        pinnedRepositories(first: 10) {
            edges {
				node {
					name
				}
            }
		}
    }
}`;

export const getGeneralInfo = (nameId: string) => `{
    repositoryOwner(login: ${nameId}) {
        login
        ... on User {
          bio
        }
      }
}`;

export const getCommits = (nameId: string) => `
{
    repository(name: ${nameId}, owner: "vmware") {
        ref(qualifiedName: "master") {
            target {
            ... on Commit {
                id
                history(first: 20) {
                    pageInfo {
                        hasNextPage
                    }
                    edges {
                        node {
                            messageHeadline
                            oid
                            message
                        author {
                            name
                            email
                            date
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
`;
