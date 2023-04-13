#!/bin/bash
# Find ClusterIPs of Redis nodes
export REDIS_NODES=$(kubectl get pods  -l app=redis-cluster -n gic-group-6 -o json | jq -r '.items | map(.status.podIP) | join(":6379 ")'):6379
# Activate the Redis cluster
kubectl exec -it redis-cluster-0 -n gic-group-6 -- redis-cli --cluster create --cluster-replicas 1 ${REDIS_NODES}
# Check if all went well
for x in $(seq 0 5); do echo "redis-cluster-$x"; kubectl exec redis-cluster-$x -n gic-group-6 -- redis-cli role; echo; done