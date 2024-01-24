import { TArticle, TAuthor } from "../types/types";

export const DUMMY_ARTICLES: TArticle[] = [
  {
    id: "ga3ag4334q8gbhn5g94387bq34hq3",
    date: new Date(),
    title: "The Evolution of Gaming",
    content: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tags: "gaming",
    author: "Christian Rosenville",
    status: "public",
    isFeatured: true,
  },
  {
    id: "gw5w98j3ghj9q3q3gh34GH",
    date: new Date(),
    title: "Top 10 Must-Play Games of the Year",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tags: "gaming",
    author: "Christian Rosenville",
    status: "public",
    isFeatured: true,
  },
  {
    id: "hsgfpsdjh95nvRHG84wng4yhjv0E3W478H",
    date: new Date(),
    title: "The Impact of Esports on the Gaming Industry",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tags: "esports",
    author: "Christian Rosenville",
    status: "public",
    isFeatured: true,
  },
  {
    id: "gw5w98j3ae5jweACRHGWEH",
    date: new Date(),
    title: "New games on the horizon for 2024",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tags: "gaming",
    author: "Christian Rosenville",
    status: "public",
    isFeatured: true,
  },
  {
    id: "hsgfpsdaerhASWGHARqwSFHHSDagEG",
    date: new Date(),
    title:
      "New promising MMORPG is ready for release soon! Sign up now to get early access and exclusive rewards and bonuses!",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tags: "esports",
    author: "Christian Rosenville",
    status: "public",
    isFeatured: true,
  },
];

export const DUMMY_AUTHORS: TAuthor[] = [
  {
    id: "ahbuiujh4ting3q4hj34q8hg438BJ3a",
    name: "Christian Rosenville",
    email: "web.chrisr@gmail.com",
    avatar: "https://avatars.githubusercontent.com/u/183812?v=4",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    twitter: "https://twitter.com/chrisrosenville",
    github: "@SoftwareDevChris",
    linkedin: "https://www.linkedin.com/in/christianrosenville/",
    articles: [
      "ga3ag4334q8gbhn5g94387bq34hq3",
      "gw5w98j3ghj9q3q3gh34GH",
      "hsgfpsdjh95nvRHG84wng4yhjv0E3W478H",
      "gw5w98j3ae5jweACRHGWEH",
      "gw5w98j3ae5jweACRHGWEH",
      "hsgfpsdaerhASWGHARqwSFHHSDagEG",
    ],
    isActive: true,
  },
];
