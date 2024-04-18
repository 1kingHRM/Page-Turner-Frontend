import Book from "@/src/components/books/Book";

export const metadata = {
  title: "Book",
};

export default function BookPage({params}) {
  const {id} = params;
  return <Book id={id}/>;
}
