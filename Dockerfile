# Development stage
FROM node:18-alpine AS development

WORKDIR /usr/src/app

# Copy package.json and yarn.lock first to leverage Docker cache
COPY --chown=node:node package*.json yarn.lock ./

RUN yarn install

COPY --chown=node:node . .

USER node

# Build stage
FROM node:18-alpine AS build

WORKDIR /usr/src/app

# Copy package.json and yarn.lock first to leverage Docker cache
COPY --chown=node:node package*.json yarn.lock ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN yarn build

ENV NODE_ENV production

RUN yarn install --production --frozen-lockfile && yarn cache clean

USER node

# Production stage
FROM node:18-alpine AS production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]
