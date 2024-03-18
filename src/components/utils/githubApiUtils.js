import axios from 'axios';

let baseUrl = "https://api.github.com";

let githubBearer = ""

export async function fetchUserSuggestions(query) {
    try {
        console.log(process.env.REACT_APP_API_KEY);
        const response = await axios.get(`baseUrl/search/users?q=${query}`, {
            headers: {
                Authorization: `Bearer ${githubBearer}`
            }
        });
        // Limit to 3 suggestions
        const users = response.data.items.slice(0, 3);
        return users;
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        return []; 
    }
}

export async function fetchUserProfile(userId) {
    try {
      const response = await axios.get(`baseUrl/users/${userId}`, {
        headers: {
          authorization: `Bearer ${githubBearer}`
        }
      });
      return { profile: response.data, error: null };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return { profile: null, error };
    }
}

export async function fetchUserEvents(userId, page = 1, perPage = 45) {
    try {
      const response = await axios.get(`baseUrl/users/${userId}/events?page=${page}&per_page=${perPage}`, {
        headers: {
          authorization: `Bearer ${githubBearer}`
        }
      });
      return { events: response.data, error: null };
    } catch (error) {
      console.error('Error fetching user events:', error);
      return { events: [], error };
    }
}

export async function fetchGithubUserFollowers(userName, pageNo) {
    try {
      const response = await axios({
        method: 'get',
        url: `baseUrl/users/${userName}/followers?page=${pageNo}&per_page=20`,
        headers: {
          authorization: `Bearer ${githubBearer}`
        }
      });
      return { followers: response.data, error: null };
    } catch (error) {
      console.error('Error fetching followers:', error);
      return { followers: [], error };
    }
}

export async function fetchGithubUserFollowings(userName, pageNo) {
    try {
      const response = await axios({
        method: 'get',
        url: `baseUrl/users/${userName}/following?page=${pageNo}&per_page=20`,
        headers: {
          authorization: `Bearer ${githubBearer}`
        }
      });
      return { followings: response.data, error: null };
    } catch (error) {
      console.error('Error fetching followings:', error);
      return { followings: [], error };
    }
}

// Fetches GitHub user repositories
export async function fetchGithubUserRepos(userName, pageNo) {
    try {
      const response = await axios.get(`https://api.github.com/users/${userName}/repos?per_page=10&page=${pageNo}`, {
        headers: {
          authorization: `Bearer ${githubBearer}` 
        }
      });
      return { repos: response.data, error: null };
    } catch (error) {
      console.error('Error fetching user repos:', error);
      return { repos: [], error };
    }
}