import { useQuery, gql } from '@apollo/client';
import { FC, Fragment, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { ErrorMessage } from '@not-govuk/components';

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
  // console.log('loading:');
  // console.log(loading);
  // console.log('error:');
  // console.log(error);
  // console.log('data:');
  // console.log(data);

  return (
    <Fragment>
      <h1>GraphQL</h1>
      <h2>Books</h2>
      { loading ? (
        <p>Loading...</p>
      ) : (
        error ? (
          <ErrorMessage>{error.message}</ErrorMessage>
        ) : (
          <ul>
            {data?.books?.map(
              ({ author, title }: Book, i: number) => (
                <li key={i}>
                  <strong>{title}</strong> {author}
                </li>
              )
            )}
          </ul>
        )
      ) }
    </Fragment>
  );
};

export default Page;
export const title = 'GraphQL spike';
