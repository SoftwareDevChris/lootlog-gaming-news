import { Suspense } from "react";

// Components
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";
import { NewsSection } from "@/components/sections/news-section/NewsSection";
import { ReviewSection } from "@/components/sections/review-section/ReviewSection";
import { VideoSection } from "@/components/sections/video-section/VideoSection";
import { GuideSection } from "@/components/sections/guide-section/GuideSection";

export default async function Home() {
  return (
    <main>
      <Suspense fallback={<LoadingScreen />}>
        <NewsSection />
        <VideoSection />
        <ReviewSection />
        <GuideSection />
      </Suspense>
    </main>
  );
}
