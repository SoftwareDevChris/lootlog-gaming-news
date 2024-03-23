import { TArticle, TUser } from "../types/types";

export const DUMMY_ARTICLES: TArticle[] = [
  {
    id: "ga3ag4334q8gbhn5g94387bq34hq3",
    created_at: new Date(),
    title: "The Evolution of Gaming",
    content: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    authorId: "ahbuiujh4ting3q4hj34q8hg438BJ3a",
    categoryId: 1,
    image: [
      {
        name: "",
        url: "https://via.placeholder.com/150",
        articleId: "ga3ag4334q8gbhn5g94387bq34hq3",
      },
    ],
    is_published: true,
    is_featured: true,
  },
  {
    id: "gw5w98j3ghj9q3q3gh34GH",
    created_at: new Date(),
    title: "Top 10 Must-Play Games of the Year",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    authorId: "ahbuiujh4ting3q4hj34q8hg438BJ3a",
    categoryId: 1,
    image: [
      {
        name: "",
        url: "https://via.placeholder.com/150",
        articleId: "gw5w98j3ghj9q3q3gh34GH",
      },
    ],
    is_published: true,
    is_featured: true,
  },
  {
    id: "hsgfpsdjh95nvRHG84wng4yhjv0E3W478H",
    created_at: new Date(),
    title: "The Impact of Esports on the Gaming Industry",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    authorId: "ahbuiujh4ting3q4hj34q8hg438BJ3a",
    categoryId: 1,
    image: [
      {
        name: "",
        url: "https://via.placeholder.com/150",
        articleId: "hsgfpsdjh95nvRHG84wng4yhjv0E3W478H",
      },
    ],
    is_published: true,
    is_featured: true,
  },
  {
    id: "gw5w98j3ae5jweACRHGWEH",
    created_at: new Date(),
    title: "New games on the horizon for 2024",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    authorId: "ahbuiujh4ting3q4hj34q8hg438BJ3a",
    categoryId: 1,
    image: [
      {
        name: "",
        url: "https://via.placeholder.com/150",
        articleId: "gw5w98j3ae5jweACRHGWEH",
      },
    ],
    is_published: true,
    is_featured: true,
  },
  {
    id: "hsgfpsdaerhASWGHARqwSFHHSDagEG",
    created_at: new Date(),
    title:
      "New promising MMORPG is ready for release soon! Sign up now to get early access and exclusive rewards and bonuses!",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    authorId: "ahbuiujh4ting3q4hj34q8hg438BJ3a",
    categoryId: 1,
    image: [
      {
        name: "",
        url: "https://via.placeholder.com/150",
        articleId: "hsgfpsdaerhASWGHARqwSFHHSDagEG",
      },
    ],
    is_published: true,
    is_featured: true,
  },
];

export const DUMMY_AUTHORS: TUser[] = [
  {
    id: "ahbuiujh4ting3q4hj34q8hg438BJ3a",
    firstName: "Christian",
    lastName: "Rosenville",
    email: "web.chrisr@gmail.com",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    twitter_url: "https://twitter.com/chrisrosenville",
    github_url: "@SoftwareDevChris",
    linkedin_url: "https://www.linkedin.com/in/christianrosenville/",
    articles: [
      "ga3ag4334q8gbhn5g94387bq34hq3",
      "gw5w98j3ghj9q3q3gh34GH",
      "hsgfpsdjh95nvRHG84wng4yhjv0E3W478H",
      "gw5w98j3ae5jweACRHGWEH",
      "gw5w98j3ae5jweACRHGWEH",
      "hsgfpsdaerhASWGHARqwSFHHSDagEG",
    ],
    is_active: true,
  },
];
