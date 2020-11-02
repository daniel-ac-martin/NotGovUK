import { useQuery, gql } from '@apollo/client';
import { FC, Fragment, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';

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
      <ul>
        { data?.books?.map(
            ({ author, title }, i) => (
              <li key={i}>
                <strong>{title}</strong> {author}
              </li>
            )
        ) }
      </ul>
    </Fragment>
  );
};

export default Page;
export const title = 'GraphQL spike';
