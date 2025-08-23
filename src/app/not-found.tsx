import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found",
  description: "Requested page is not found!",
};

export default function NotFound() {
  return (
    <section className="grid min-h-screen -mt-44 place- items-center">
      <div className="text-center">
        <p className="text-4xl font-semibold text-primary">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not Found!
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we could n&apos;t find the page you&apos;re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded bg-primary hover:bg-primary/90 duration-300 px-4 py-2 text-white"
          >
            Go back home
          </Link>
          <a href="/contact" className="text-sm font-semibold text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
