#!/bin/bash

if [$TYPE = "FRONT_END"]
then
	npm run build --prefix /app/backend
	npm start --prefix /app/backend
	echo "Running Backend Script"
	echo $TYPE
else
	npm run build --prefix /app/client
	echo "Running Frontend Scripts"
	echo $TYPE
fi
