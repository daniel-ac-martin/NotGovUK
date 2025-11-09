FROM public.ecr.aws/lambda/nodejs:22

ENV NODE_ENV production
ENV MODE serverless

COPY package.json ${LAMBDA_TASK_ROOT}/
COPY dist/ ${LAMBDA_TASK_ROOT}/dist/
COPY aws-lambda-entry.js ${LAMBDA_TASK_ROOT}/entry.js

USER 31337
ENV LISTEN_HOST="::" \
    LISTEN_PORT="8080" \
    SSR_ONLY="false" \
    SESSIONS_SECRET="changeme" \
    AUTH_METHOD="none" \
    OIDC_ISSUER="https://sso-dev.notprod.homeoffice.gov.uk/auth/realms/prototype/" \
    OIDC_CLIENT_ID="local-dev" \
    OIDC_CLIENT_SECRET="" \
    OIDC_REDIRECT_URI="http://localhost:8080" \
    AUTH_HEADER_USERNAME="x-auth-username" \
    AUTH_HEADER_GROUPS="x-auth-groups" \
    AUTH_HEADER_ROLES="x-auth-roles"
CMD ["entry.handler"]
