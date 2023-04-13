#!/bin/bash

echo 'sobral' | grep -q ${USER} 
if [ $? -e 0 ] ; then
    docker buildx build --platform linux/amd64 --network=host -t registry.deti:5000/gic-group-6/backend:v1 .
else 
    docker build --network=host -t registry.deti:5000/gic-group-6/backend:v1 .
fi

docker push registry.deti:5000/gic-group-6/backend:v1