import Results from "@/src/components/search_results/SearchResults";

export const metadata = {
  title: "Results",
};

export default function ResultsPage({params}) {
  const {search} = params;
  return <Results search={search}/>;
}
