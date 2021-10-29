# Infrastructure
To deploy this application into a ECS service, you need to create network dependencies and service.
You can follow these steps to create ECS service

## First create network infrastructure

```
aws cloudformation create-stack \
  --stack-name user-api-network \
  --template-body file://network.yml \
  --capabilities CAPABILITY_IAM
```

## After that create ECS service
```
aws cloudformation create-stack \
  --stack-name user-api-service \
  --template-body file://service.yml \
  --parameters \
      ParameterKey=StackName,ParameterValue=user-api-network \
      ParameterKey=ServiceName,ParameterValue=user-api \
      ParameterKey=ImageUrl,ParameterValue=docker.io/fyelci/user-api:latest \
      ParameterKey=ContainerPort,ParameterValue=8000 \
      ParameterKey=HealthCheckPath,ParameterValue=/ \
      ParameterKey=HealthCheckIntervalSeconds,ParameterValue=90
```
