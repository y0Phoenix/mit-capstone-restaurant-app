#!/bin/bash

npm i -g typescript
if [$TYPE = "FRONT_END"]
then
	npm i --prefix /app/backend
	npm i --prefix /app/backend/typescript/public
	npm run build --prefix /app/backend
	npm start --prefix /app/backend
	echo "Running Backend Script"
	echo $TYPE
else
	npm i --prefix /app/client
	npm run build --prefix /app/client
	echo "Running Frontend Scripts"
	echo $TYPE
fi
