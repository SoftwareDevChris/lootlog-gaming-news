import Image from "next/image";

// Large title size for spotlight article
const ArticleItemSpotlightTitle: React.FC = () => {
  return (
    <h3 className="lg:text-md bg-custom-amber-800 p-1 text-sm font-bold text-white sm:text-lg">
      Simaluted long article title that is very long and has a lot of text and
      may even becomer longer
    </h3>
  );
};

// Regular title size for articles
const ArticleItemTitle: React.FC = () => {
  return (
    <h3 className="lg:text-md bg-custom-amber-800 p-1 text-sm font-bold text-white sm:text-sm">
      Simaluted long article title that is very long and has a lot of text and
      may even becomer longer
    </h3>
  );
};

// Article container
const ArticleItem: React.FC<{ isSpotlight?: boolean }> = ({ isSpotlight }) => {
  return (
    <article className="aspect-16/9 relative overflow-hidden">
      <Image
        className="aspect-16/9 object-cover object-center"
        alt=""
        src="/images/placeholder.webp"
        fill
      />
      <div className="absolute bottom-0 left-0 w-full">
        {isSpotlight ? <ArticleItemSpotlightTitle /> : <ArticleItemTitle />}
      </div>
    </article>
  );
};

// Exported feature-articles container
export const Featured = () => {
  return (
    <section className="mx-auto max-w-[1300px]">
      <h2 className="pb-3 text-3xl font-bold uppercase">Latest</h2>
      <div className="block lg:flex">
        <div className="mb-3 h-auto lg:mb-0.5 lg:w-6/12">
          <ArticleItem isSpotlight />
        </div>
        <div className="grid h-auto gap-3 sm:grid-cols-2 sm:grid-rows-2 lg:w-6/12 lg:pl-3">
          <ArticleItem />
          <ArticleItem />
          <ArticleItem />
          <ArticleItem />
        </div>
      </div>
    </section>
  );
};
