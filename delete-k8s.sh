#!/bin/bash
# Delete kubernetes

# ============ ANGULAR / FRONTEND =============== #
cd ./projFrontend
kubectl delete -f angular-deployment.yaml
kubectl delete -f angular-svc.yaml

# ============= DJANGO / BACKEND ================ #
cd ../djangoProject
kubectl delete -f django-deployment.yaml
kubectl delete -f django-svc.yaml

# =================== MONGODB =================== #
cd ../mongo
kubectl delete -f mongodb-statefulset-master.yaml
kubectl delete -f mongodb-statefulset-replicas.yaml
kubectl delete -f mongodb-svc.yaml


# =================== REDIS =================== #
cd ../redis
kubectl delete -f redis-configmap.yaml
kubectl delete -f redis-statefulset.yaml
kubectl delete -f redis-svc.yaml

# ============ ANGULAR / FRONTEND =============== #
cd ../traefik
kubectl delete -f traefik-cluster-role.yaml
kubectl delete -f traefik-service-account.yaml
kubectl delete -f traefik-cluster-role-service-binding.yaml
kubectl delete -f traefik-deployment.yaml
kubectl delete -f traefik-services.yaml
kubectl delete -f traefik-ingress.yaml