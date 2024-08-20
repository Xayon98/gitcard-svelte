import type { PageServerLoad } from './$types';

import { SECRET_API_TOKEN } from '$env/static/private'

async function sleep(ms: number): Promise<void> {
  return new Promise(
    (resolve) => setTimeout(resolve, ms));
}


var query = `
query {
  viewer {
    name,
    login,
    avatarUrl,
    bio,
    location,
    company,
    email,
    url,
    status {
      emoji,
      message
    },
    repositories  {
      totalCount
    }
  }
}
`;
var query2 = `
query {
  viewer {
    pinnedItems (first:2, types:REPOSITORY) {
      nodes {
         ... on Repository {
          name,
          url,
          description,
          primaryLanguage {
            name,
            color
          }
        }
      }
    }
	}
}
`;

var url = 'https://api.github.com/graphql',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${SECRET_API_TOKEN}`,
        },
        body: JSON.stringify({
            query: query,
        })
    },
    options2 = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${SECRET_API_TOKEN}`,
      },
      body: JSON.stringify({
        query: query2,
      })
    };
    


export const load: PageServerLoad = async () => {
  const data =  (await fetch(url, options).then(res => res.json())).data;
  const data2 = (await fetch(url, options2).then(res => res.json())).data;
  

	return {
  
    name: data.viewer.name,
    login: data.viewer.login,
    avatar: data.viewer.avatarUrl,
    bio: data.viewer.bio,
    location: data.viewer.location,
    company: data.viewer.company,
    email: data.viewer.email,
    url: data.viewer.url,
    status: data.viewer.status,
    totalCount: data.viewer.repositories.totalCount,
    repositories: data2.viewer.pinnedItems.nodes,
  }
}



