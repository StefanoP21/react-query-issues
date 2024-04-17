import axios from 'axios';

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization:
      'Bearer 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',
  },
});
