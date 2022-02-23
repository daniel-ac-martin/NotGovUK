FROM cypress/included:9.5.0

RUN mv /root/.cache /home/node/.cache
ENV CYPRESS_CACHE_FOLDER=/home/node/.cache/Cypress

COPY feat/ /cypress/integration/
RUN echo '{ "pluginsFile": false }' > '/cypress.json'

USER node
ENV CYPRESS_BASE_URL="http://localhost:8080" \
    CYPRESS_PROJECT_ID="" \
    CYPRESS_RECORD_KEY=""
