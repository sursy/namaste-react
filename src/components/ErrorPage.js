import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <main className="mx-auto max-w-[1400px] px-8 py-12">
      <h1 className="mb-2 text-3xl font-bold">Error</h1>
      <h2 className="mb-2 text-xl">Page not found</h2>
      <p className="mb-4">
        {error?.status} {error?.statusText}
      </p>
      <Link className="text-blue-600" to="/">Back to home</Link>
    </main>
  );
}

export default ErrorPage;
