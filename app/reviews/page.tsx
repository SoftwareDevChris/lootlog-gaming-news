import { PageTitle } from "@/components/PageTitle";
import { SectionContainer } from "@/components/containers/SectionContainer";
import { Grid } from "@/components/articles/sections/grid/Grid";
import { SectionTitleDefault } from "@/components/articles/SectionTitleDefault";

export default function Reviews() {
  const title = "Reviews";
  const paragraph =
    "Read our honest, detailed, and informative reviews of the best games in the market. GameZone's reviews section is your guide to gaming.";

  return (
    <main>
      <SectionContainer>
        <PageTitle title={title} paragraph={paragraph} />
      </SectionContainer>

      <SectionContainer>
        <div className="mx-auto max-w-1300">
          <SectionTitleDefault title="All reviews" />
        </div>
        <Grid />
      </SectionContainer>
    </main>
  );
}
