#!/bin/bash
# Apply kubernetes manifests

# =================== REDIS =================== #
cd ./redis
kubectl apply -f redis-configmap.yaml 
kubectl apply -f redis-statefulset.yaml 
kubectl apply -f redis-svc.yaml
./activate-redis-cluster.sh

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

# ============ ANGULAR / FRONTEND =============== #
cd ../traefik
kubectl apply -f traefik-cluster-role.yaml
kubectl apply -f traefik-service-account.yaml
kubectl apply -f traefik-cluster-role-service-binding.yaml
kubectl apply -f traefik-deployment.yaml
kubectl apply -f traefik-services.yaml
kubectl apply -f traefik-ingress.yaml