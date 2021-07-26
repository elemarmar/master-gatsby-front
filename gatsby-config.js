import dotenv from 'dotenv';

dotenv.config();

export default {
  siteMetadata: {
    title: `Slick Slices`,
    siteUrl: `https://gatsby.pizza`,
    description: `The best pizza place in Hamilton!`,
  },
  plugins: [
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'nwtgevqj',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
