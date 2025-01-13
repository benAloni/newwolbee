ARG NODE_VERSION=20.12.2

FROM node:${NODE_VERSION}-alpine3.18

ENV NODE_ENV production

WORKDIR /backend

RUN npm install -g nodemon

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev


USER node

COPY . .



CMD ["npm", "run", "watch"]
