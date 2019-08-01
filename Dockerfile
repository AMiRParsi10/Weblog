# The instructions for the first stage
FROM node:10-alpine

# Build arguments
ENV NODE_ENV=production
ENV PORT=3000

# Set necessary environment variables.
ENV  NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV  PATH=$PATH:/home/node/.npm-global/bin:/home/node/node_modules/.bin:$PATH

# For handling Karnel signal properly.
RUN apk add --no-cache tini

# Non previlage mode for better security (this user comes with official NodeJS image).
USER node

# # Check every 30 seconds with 3 seconds timout for 3 retries to ensure this service returns HTTP 200.
# HEALTHCHECK --interval=10s --start-period=5s --timeout=3s --retries=3 CMD node healthcheck.js

# Create necessary directories.
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# Copy package.json, package-lock.json, yarn.lock and npm-shrinkwrap.json
COPY --chown=node:node ["package*.json","*.lock","npm-shrinkwrap.json*", "./"]

# Run npm install. Necessary to run before adding application code to leverage Docker cache
RUN npm install --silent
RUN npm cache clean --force
RUN mv node_modules ../

# Copy compiled application files
COPY --chown=node:node ./dist .

# Expose specific port and other necessary ports for debugging
EXPOSE $PORT 9229 9230

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]