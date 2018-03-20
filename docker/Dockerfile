# ---- Build ----
FROM pipdevs/ts-dev:2.5.2 AS build

# set working directory
WORKDIR /app
# copy project file
COPY package.json .
 
# install node packages
RUN npm install --only=production 
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# install ALL node_modules, including 'devDependencies'
RUN npm install

# copy all project
COPY . .
# compile source code
RUN  tsc
 
# ---- Test ----
# run linters, setup and tests
FROM build AS test
#RUN  npm run test
#ENTRYPOINT ["npm", "test"]

#
# ---- Release ----
#FROM base AS release
# copy production node_modules
#COPY --from=dependencies /app/prod_node_modules ./node_modules
# copy app sources
#COPY --from=build /app/obj .
# expose port and define CMD
#EXPOSE 5000
#CMD npm run start