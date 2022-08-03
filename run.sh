#!/bin/bash

npm i --location=global typescript
if [$TYPE = FRONT_END]
then
	echo "Running Backend Script"
	echo $TYPE
	echo "npm i --prefix /app/backend"
	npm i --prefix /app/backend
	echo "npm i --prefix /app/backend/typescript/public"
	npm i --prefix /app/backend/typescript/public
	echo "npm i --save-dev @types/uuid /app/backend/typescript/public"
	npm i --save-dev @types/uuid /app/backend/typescript/public
	echo "npm run build --prefix /app/backend"
	npm run build --prefix /app/backend
	echo "npm start --prefix /app/backend"
	npm start --prefix /app/backend
else
	echo "Running Frontend Scripts"
	echo $TYPE
	echo "npm i --prefix /app/client && npm i --save-dev @types/uuid /app/client && npm run build --prefix /app/client"
	npm i --prefix /app/client && npm i --save-dev @types/uuid /app/client && npm run build --prefix /app/client
fi
