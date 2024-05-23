# Specify Node Version and Image
# Name Image development (can be anything)
FROM node AS development

# Specify Working directory inside container
WORKDIR /adamonis/src/app

# Copy package-lock.json & package.json from host to inside container working directory
COPY package*.json ./
COPY tsconfig.json ./

# Install deps inside container
RUN npm install

RUN npm run build

EXPOSE 3000

################
## PRODUCTION ##
################
# Build another image named production
FROM node AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set work dir
WORKDIR /adamonis/src/app

COPY --from=development /adamonis/src/app/ .

EXPOSE 3000

# run app
CMD [ "node", "dist/main"]