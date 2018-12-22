FROM node:8-alpine
RUN mkdir -p /users/jmz/developer/rpt08/27-TrypAdvisor/Services
WORKDIR /users/jmz/developer/rpt08/27-TrypAdvisor/Services
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "node", "server/index.js" ]
