import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="text-cyan">404</p>
        <h1 className="mt-2 text-3xl font-semibold">Page not found</h1>
        <Link to="/" className="mt-6 inline-block rounded-full bg-accent px-5 py-2 text-sm">
          Back home
        </Link>
      </div>
    </div>
  );
}
