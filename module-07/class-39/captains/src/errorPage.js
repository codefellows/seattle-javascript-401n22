import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <main>
      <h2>Sorry, we couldn't do that!</h2>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </main>
  );
}
