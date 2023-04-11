#!/bin/bash
# Apply kubernetes manifests

# =================== REDIS =================== #
cd ./redis
kubectl apply -f redis-configmap.yaml
kubectl apply -f redis-statefulset.yaml
kubectl apply -f redis-svc.yaml

# =================== MONGODB =================== #
cd ../mongo
kubectl apply -f mongodb-statefulset.yaml
kubectl apply -f mongodb-svc.yaml

# ============= DJANGO / BACKEND ================ #
cd ../djangoProject
kubectl apply -f django-deployment.yaml
kubectl apply -f django-svc.yaml

# ============ ANGULAR / FRONTEND =============== #
cd ../projFrontend
kubectl apply -f angular-deployment.yaml
kubectl apply -f angular-svc.yaml
