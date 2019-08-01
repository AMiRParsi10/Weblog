# The instructions for the first stage
FROM node:10-alpine as builder

# Build arguments
ENV NODE_ENV=production
ENV PORT=3000

RUN apk --no-cache add python make g++

COPY package*.json ./
RUN npm install

# The instructions for second stage
FROM node:10-alpine

# Build arguments
ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /usr/src/app
COPY --from=builder node_modules node_modules

COPY . .

# For handling Karnel signal properly.
RUN apk add --no-cache tini

# Expose specific port and other necessary ports for debugging
EXPOSE $PORT 9229 9230

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]