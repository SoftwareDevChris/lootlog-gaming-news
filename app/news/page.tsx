import { PageTitle } from "@/components/PageTitle";
import { SectionContainer } from "@/components/containers/SectionContainer";
import { Grid } from "@/components/articles/sections/grid/Grid";
import { SectionTitleDefault } from "@/components/articles/SectionTitleDefault";

export default function News() {
  const title = "News";
  const paragraph =
    "Stay updated with the latest happenings in the gaming world. GameZone's news section is your one-stop shop for all things gaming.";

  return (
    <main>
      <SectionContainer>
        <PageTitle title={title} paragraph={paragraph} />
      </SectionContainer>

      <SectionContainer>
        <div className="mx-auto max-w-1300">
          <SectionTitleDefault title="All news articles" />
        </div>
        <Grid />
      </SectionContainer>
    </main>
  );
}
