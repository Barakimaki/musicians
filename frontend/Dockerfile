
# Stage 1: build
FROM node AS development

WORKDIR /adamonis/frontend/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli@17.3.6

COPY . .

RUN npm run build

EXPOSE 4200