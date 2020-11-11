import { makeExecutableSchema } from '@graphql-tools/schema';
import { errors } from '@not-govuk/engine';

// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// The GraphQL schema in string form
const typeDefs = `
type Query { books: [Book] }
type Book { title: String, author: String }
`;

const Redact = (roles: string[]) => (obj: object) => (key: string, role: string) => {
  if (!roles.includes(role)) {
    throw new errors.ForbiddenError(`You do not have permission to access the property '${key}' on this object.`);
  }

  return obj[key];
};

// The resolvers
const resolvers = {
  Query: { books: (root, args, context) => {
    const redactor = Redact(context?.auth?.roles || []);

    try {
      return books.map(e => {
        const redact = redactor(e);

        return {
          title: redact('title', 'books.title'),
          author: redact('author', 'books.author')
        }
      });
    } catch (e) {
      return e;
    }
  } },
};

// Put together a schema
export const graphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default graphQLSchema;
