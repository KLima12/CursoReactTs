import { PageLayout } from "../shared/layout/pageLayout/PageLayout";
import { useParams, useSearchParams } from "react-router";
export const Detail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  return (
    <PageLayout title="Detalhes">
      Detail {id} {searchParams.get("filter")}
    </PageLayout>
  );
};
