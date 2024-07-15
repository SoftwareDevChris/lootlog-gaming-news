import { Suspense } from "react";

import "./VideoSection.scss";

import parse from "html-react-parser";

import { getArticlesByCategory } from "@/lib/articleService";

import { LoadingSpinner } from "@/components/ui/loading/spinner/LoadingSpinner";
import { SectionTitle } from "../SectionTitle";

export const VideoSection = async () => {
  const videoArticles = await getArticlesByCategory("video");

  return (
    <Suspense fallback={<LoadingSpinner theme="orange" />}>
      <SectionTitle title="Videos" route="/videos" />
      <div className="video-section">
        <div className="text-area">
          <div className="text-area-overlay"></div>
          <h3 className="title">{videoArticles.articles![0].title}</h3>
          <p className="subtitle">{videoArticles.articles![0].subtitle}</p>
          <div className="body">{parse(videoArticles.articles![0].body)}</div>
        </div>
        <div className="video-area">
          <iframe
            src={
              `https://youtube.com/embed/${
                videoArticles.articles![0].youtubeVideoId
              }` ?? ""
            }
          />
        </div>
      </div>
    </Suspense>
  );
};
