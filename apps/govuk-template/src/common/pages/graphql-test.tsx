import { useQuery, gql } from '@apollo/client';
import { FC, Fragment, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { ErrorMessage } from '@not-govuk/components';
import { useIsMounted } from '@not-govuk/route-utils';

type Book = {
  title: string
  author: string
};

const books = gql`
  { books {
    title
    author
  } }
`;

const Page: FC<PageProps> = () => {
  const { loading, error, data } = useQuery(books);
  const isMounted = useIsMounted();

  return (
    <Fragment>
      <h1>GraphQL</h1>
      <h2>Books</h2>
      { data ? (
        <ul>
          {data.books?.map(
            ({ author, title }: Book, i: number) => (
              <li key={i}>
                <strong>{title}</strong> {author}
              </li>
            )
          )}
        </ul>
      ) : (
        !isMounted ? null : (
          loading ? (
            <p>Loading...</p>
          ) : (
            !error ? null : (
              <ErrorMessage>{error.message}</ErrorMessage>
            )
          )
        )
      ) }
    </Fragment>
  );
};

export default Page;
export const title = 'GraphQL spike';
