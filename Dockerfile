FROM docker-hub.artifactory.globoi.com/node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM docker-hub.artifactory.globoi.com/node:20-alpine AS runner
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/yarn.lock ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY run.sh run.sh
RUN chmod +x run.sh

RUN if [ -f .env ]; then cp .env .env; fi

EXPOSE 8000
CMD ["sh", "run.sh"]
