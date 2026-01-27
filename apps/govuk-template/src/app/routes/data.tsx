import type { Route } from "./+types/data";
import { data } from 'react-router';
import { userInfoContext } from '@not-govuk/react-router-context';
import { ErrorMessage } from '@not-govuk/components';
import { siteTitle } from '../config';

type Book = {
  title: string
  author: string
};

export const title = 'Data flow';
const description = 'Example of data flowing from the server to the client.';

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${title} - ${siteTitle}` },
    { name: 'description', content: description },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  let error: string = '';

  const Redact = <T = unknown>(roles: string[]) => (obj: Record<string, T>) => (key: string, role: string) => {
    if (!roles.includes(role)) {
      error = `You do not have permission to access the property '${key}' on this object.`
    }

    return obj[key];
  };
  const user = context.get(userInfoContext);
  const redactor = Redact<string>(user?.roles || []);

  // Some fake data
  const bookData: Book[] = [
    {
      title: "Harry Potter and the Sorcerer's stone",
      author: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
  ];
  const books: Book[] = bookData.map(e => {
    const redact = redactor(e);

    return {
      title: redact('title', 'books.title'),
      author: redact('author', 'books.author')
    }
  });

  return (
    error
    ? data({ error }, 403)
    : data({ books })
  );
}

export default function Data({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h1>{title}</h1>
      <h2>Books</h2>
      { !('error' in loaderData) ? null : (
        <ErrorMessage>{loaderData.error}</ErrorMessage>
      ) }
      { !('books' in loaderData) ? null : (
        <ul>
          {loaderData.books.map(
            ({ author, title }: Book, i: number) => (
              <li key={i}>
                <strong>{title}</strong> {author}
              </li>
            )
          )}
        </ul>
      ) }
    </>
  );
}
