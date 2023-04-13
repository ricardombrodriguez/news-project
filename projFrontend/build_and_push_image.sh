#!/bin/bash

echo 'sobral' | grep -q ${USER} 
if [ $? -eq 0 ] ; then
    docker buildx build --platform linux/amd64 --network=host -t registry.deti:5000/gic-group-6/frontend:v1 .
else 
    docker build --network=host -t registry.deti:5000/gic-group-6/frontend:v1 .
fi

docker push registry.deti:5000/gic-group-6/frontend:v1