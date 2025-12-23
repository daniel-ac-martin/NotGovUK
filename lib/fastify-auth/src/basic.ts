import { createError } from '@fastify/error';
import { AuthBagger, UserProfile } from './common';

// Basic authentication

export type Options = {
  username: string
  password: string
  roles?: string[]
  realm?: string
  charset?: BufferEncoding
};

const authPrefix = 'Basic ';
const BadHeader = createError('FST_BAD_HEADER', 'Malformed Authorization header', 400);
const AuthFailed = createError('FST_BASIC_AUTH_FAILED', 'Incorrect or missing authentication details', 401);

export const basic: AuthBagger<Options> = ({
  password,
  roles = [],
  username,
  realm = 'members',
  charset = 'utf-8'
}, _fullSessions) => {
  const base64Decode = (s: string) => Buffer.from(s, 'base64').toString(charset);
  const decodeHeader = (s: string) => {
    try {
      return base64Decode(s.substring(authPrefix.length)).split(':');
    } catch (_err) {
      throw new BadHeader();
    }
  };

  return {
    authenticate: (req, reply) => {
      const authHeader = req.headers['authorization'] || '';
      const [ suppliedUsername, suppliedPassword ] = (
        authHeader.startsWith(authPrefix)
          ? decodeHeader(authHeader)
          : []
      );

      if (suppliedUsername === username && suppliedPassword === password) {
        // Authentication successful; set the user info
        const user: UserProfile = {
          username,
          roles
        };

        req.user = user;
      } else {
        // Permission denied; provide error and challenge
        reply.header('WWW-Authenticate', `Basic realm="${realm}", charset="${charset}"`);
        throw new AuthFailed();
      }
    },
    wantSession: false
  };
};

export default basic;
