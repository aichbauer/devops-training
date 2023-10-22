<p align="center">
  <a href="https://devopscycle.com">
    <img target="_blank" height="100" src="http://devopscycle.com/wp-content/uploads/sites/4/2023/10/DevOps-Cycle-Logo-Long.png" />
  </a>
</p>

# Infrasturture on azure

How to use infrastructure as code for your apps

## Pre-Requesits

* azure cli
* terraform cli
* psql

## Local

```sh
# login to your azure account
$ az login
# opens website and you login in browser
# make sure to use correct subscription
$ az account set --subscription <subscriptionId>
```

## Github Actions

For CI/CD Pipeline we need a service principal.

```sh
# We need to register some Providers first otherwise we can not use them
$ az provider register --namespace Microsoft.ContainerService
$ az provider register --namespace Microsoft.Storage
$ az provider register --namespace Microsoft.DBforPostgreSQL
# Create Service Principal
# save the credentials
# we need to add them to our repository in the next step
$ az ad sp create-for-rbac --name devops-test-service-principal
# make the role assignement
# THIS IS AN EXAMPLE! IN PRODUCTION ONLY ASSIGN THE ROLE AND SCOPE NEEDED FOR THIS SERVICE PRINCIPAL!
# for this example we use a privleged role and scope
$ az role assignment create --assignee <appId> \
--role "Owner" \
--subscription <subscriptionId> \
--scope "/subscriptions/<subscriptionId>"
# you can see this in your portal under your subscription and then Access Controll IAM
```

### Create a GitHub Repo and add the credentials

[https://github.com/your-github-name/<your-repo-name>/settings/secrets/actions](https://github.com/<your-github-name>/<your-repo-name>/settings/secrets/actions)

* AZURE_CLIENT_ID – The appId from the service principal
* AZURE_CLIENT_SECRET – The Password from the service principal
* AZURE_TENANT_ID – The tenant ID from the service principal
* AZURE_SUBSCRIPTION_ID – Subscription ID where you want to deploy the infrastructure
* AZURE_RESOURCE_GROUP - name of resource group of the cluster - see ops/terraform/infra/main.tf -> azurerm_resource_group.name
* AZURE_CLUSTER_NAME - name of the k8s cluster - see ops/terraform/infra/main.tf -> azurerm_kubernetes_cluster.name
* DB_PASS - database password (in production you may use a secret management tool like Hashicorp Vault, AWS Secrets Manager, Azure KeyVault, ...) - to create a randomstring `openssl rand -base64 24`
* DB_HOST - devops-test-postgres-server.postgres.database.azure.com
* DB_USER - devopstestpostgresuser@devops-test-postgres-server (no hyphens allowed in the name)
* DB_PORT - 5432
* DB_NAME - devops-test-postgres-database
* DOCKERHUB_USERNAME - the username of your docker hub account
* DOCKERHUB_TOKEN - the api token created for this repository
* JWT_SECRET - should be a 256 bit secret - in production use RS256 with public and private keys instead of one secret, so you can verify but not create the tokens with a public key on other servers as well without exposing the private key. in this example we use HS256 with a secret, so everybody with the secret can create and verify the tokens.

## Create

We will use them in our CI/CD Pipeline

> `NOTE: Storage Accounts need to have unique names over all tenants on azure not just your subscription or your account` We use the output of terraform apply from the backend folder to put into backend storage account name of the infra folder

```sh
# first cd in the correct directory
# if you have not created a storage for the terraform state
# move in the backend directory
$ cd ops/terraform/backend
# 1. Init Terraform
$ terraform init -upgrade
# 2. create a terraform execution plan
$ terraform plan -out main.tfplan
# 3. apply execution plan
$ terraform apply main.tfplan
# move in the infra directory
# later we will learn to automate
# in a ci/cd pipline (github actions)
$ cd ops/terraform/infra
# 1. Init Terraform
$ terraform init -upgrade
# 2. create a terraform execution plan
$ terraform plan -out main.tfplan
# 3. apply execution plan
$ terraform apply main.tfplan
```

## Destroy
```sh
# 2. create a destroy plan
$ terraform plan -destroy -out maindestroy.tfplan
# 1. destory
$ terraform apply -destroy maindestroy.tfplan
```

## Verify results

```sh
# download the kubernetes credentilas locally
# will store them ~/.kube/config
$ az aks get-credentials --resource-group devops-test-resource-group --name devops-test-cluster
$ kubectl config use-context devops-test-cluster
# get all nodes - should be 1 default - see variables.tf node_count
# -A stands for All otherwise it displays only resources in the default namespace
# or you can specify a namespace like: -n <your-namespace>
$ kubectl get nodes -A
# get all pods - there should be at least a few dozen system pods running right now
# our application is yet not running
$ kubectl get pods -A
# get all services - some cluster IPs (how pods communicate inside the cluster)
$ kubectl get services -A
# connect to db
$ psql -U devopstestpostgresuser@devops-test-postgres-server --host devops-test-postgres-server.postgres.database.azure.com --db devops-test-postgres-database
```

## Common Errors

### Warning: No outputs found

If you get this error when you are trying to access a output variable from terraform you are likely in the wrong directory.

```sh
# switch into this directory if you need a output variable from the infra code
cd ./ops/terraform/infra
# switch into this directory if you need a output variable from the backend
cd ./ops/terraform/backend
```

## LICENSE

MIT @ Lukas Aichbauer
