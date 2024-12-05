<p align="center">
  <a href="https://devopscycle.com">
    <img target="_blank" height="100" src="http://devopscycle.com/wp-content/uploads/sites/4/2023/10/DevOps-Cycle-Logo-Long.png" />
  </a>
</p>

# K8s

How to orchestrate apps on k8s

## Pre-Requesits

* kubectl
* helm

## Ingress Controller

```sh
# flow of traffic from the public internet to our cluster
# loadbalancer (single public ip) -> ingress-conroller -> ingress (which needs an ingress class) -> service -> pods
# install an nginx ingress controller via helm
# with an ingress we can route traffic to multiple services/pods
# within an cluster
# with an loadbalancer you can router trafic to one service
$ helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
$ helm repo update
# make sure to add create namespace as this namespace is currently not available
# make sure to set externalTrafficPolicy=Local
# https://github.com/kubernetes/ingress-nginx/issues/8501#issuecomment-1108428615
# https://github.com/MicrosoftDocs/azure-docs/issues/92179#issuecomment-1169809165
$ helm install ingress-controller ingress-nginx/ingress-nginx -n devops-test --create-namespace --set controller.service.externalTrafficPolicy=Local
# verify installation
$ kubectl get pods -n devops-test
$ kubectl get ingressclass -A
```

## Install Cert-Manager

If we want to handle certificates for our domains wich points to our loadbalancer we need to install a cert-manager. You need to configure this once per cluster.

```sh
# add new repository, we use the cert manager from jetstack
# Jetstack helps businesses to build and operate modern cloud native infrastructure with Kubernetes.
$ helm repo add jetstack https://charts.jetstack.io
$ helm repo update
# install the cert manager
$ helm upgrade cert-manager jetstack/cert-manager \
    --install \
    --create-namespace \
    --wait \
    --namespace cert-manager \
    --set installCRDs=true
# view installed ressources, just to learn and verify
$ kubectl -n cert-manager get all
$ kubectl explain Certificate
$ kubectl explain CertificateRequest
$ kubectl explain Issuer
```

## Install Cluster Issuer

You need to install a cluster issuer, which is the resource that handles the certificates for your cluster. Needs to be installed once per cluster

```sh
k apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-production
spec:
  acme:
    # You must replace this email address with your own.
    # Let's Encrypt will use this to contact you about expiring
    # certificates, and issues related to your account.
    email: l.aichbauer@gmail.com
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      # Secret resource that will be used to store the account's private key.
      name: cluser-issuer-lets-encrypt-production
    # Add a single challenge solver, HTTP01 using nginx
    solvers:
    - http01:
        ingress:
          ingressClassName: nginx
EOF
```

Verify your installation

```sh
# should display one resource named letsencrypt-production
$ k get clusterissuer -A
```

## Helm Package for own application

> Note: Two deployments. One for FE and one for BE. Each with multiple pods. See templates folder.

First get the external IP of your load-balancer.

```sh
# copy the external IP
# in production you could use terraform to handle the DNS settings
$ kubectl get service -n devops-test
```

Set up your dns settings. In my case I use test.devopscycle.com to point to my cluster by creating a A Record

```sh
# create a helm package
$ helm package --app-version=1 <path-to-k8s-directory-with-chart.yaml>
# upgrade a new package on k8s current context
$ helm upgrade -i devops-test ./devops-test-0.0.0.tgz -n devops-test --timeout 15m0s
```

## Set up Grafana (Monitoring)

> Note: This is only a really small example

```sh
helm repo add grafana https://grafana.github.io/helm-charts &&
  helm repo update &&
  helm upgrade --install grafana-k8s-monitoring grafana/k8s-monitoring \
    --namespace "devops-test" --create-namespace --values - <<EOF
cluster:
  name: devops-test-cluster
externalServices:
  prometheus:
    host: https://prometheus-prod-24-prod-eu-west-2.grafana.net
    basicAuth:
      username: "1246554"
      password: <<our-grafana-cloud-token>
  loki:
    host: https://logs-prod-012.grafana.net
    basicAuth:
      username: "722328"
      password: <<our-grafana-cloud-token>
opencost:
  opencost:
    exporter:
      defaultClusterId: devops-test-cluster
    prometheus:
      external:
        url: https://prometheus-prod-24-prod-eu-west-2.grafana.net/api/prom
EOF
```

## Common Erros

### Debugging k8s

```sh
# get all pods from namespace devops-test
$ kubectl get pods -n devops-test
# describe a spefic pod from namespace devops-test
$ kubectl describe pod <pod-name> -n devops-test
# get logs from a container running on a pod
$ kubectl logs <pod-name> -n devops-test
# get logs from a specific container running on a pod
# e.g. the init container or the normal running container
$ kubectl logs <pod-name> -n devops-test -c <container-name>
# get an interactive shell (like ssh into a server)
$ kubectl --stdin --tty <pod-name> -n devops-test -- sh
```

### UPGRADE FAILED: another operation (install/upgrade/rollback) is in progress


```sh
# get all releases regardless of the status
$ helm ls -a -n devops-test
$ helm uninstall devops-test-backend -n devops-test
# now you can upgrade, reinstall the release
```

## LICENSE

MIT @ Lukas Aichbauer