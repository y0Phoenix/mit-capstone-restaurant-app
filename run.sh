#!/bin/bash

npm i -g typescript
if [$TYPE = "FRONT_END"]
then
	echo "Running Backend Script"
	echo $TYPE
	npm i --prefix /app/backend
	echo "npm i --prefix /app/backend"
	npm i --prefix /app/backend/typescript/public
	echo "npm i --prefix /app/backend/typescript/public"
	npm i --save-dev @types/uuid /app/backend/typescript/public
	echo "npm i --save-dev @types/uuid /app/backend/typescript/public"
	npm run build --prefix /app/backend
	echo "npm run build --prefix /app/backend"
	npm start --prefix /app/backend
	echo "npm start --prefix /app/backend"
else
	echo "Running Frontend Scripts"
	echo $TYPE
	npm i --prefix /app/client && npm i --save-dev @types/uuid /app/client && npm run build --prefix /app/client
	echo "npm i --prefix /app/client && npm i --save-dev @types/uuid /app/client && npm run build --prefix /app/client"
fi
