import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="bg-pale w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <h1 className="lg:text-6xl text-3xl text-tertiary font-bold">
        Page Not Found
      </h1>
      <p className="lg:text-2xl text-xl text-tertiary font-medium">
        {" "}
        Oops, there is nothing here...
      </p>

      <Link
        href={"/"}
        className="py-3 px-4 bg-tertiary text-secondary lg:text-2xl text-xl font-medium mt-5"
      >
        Go Back Home
      </Link>
    </div>
  );
}
