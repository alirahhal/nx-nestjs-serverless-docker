import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class CdkAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.createBackendNestServerlessLambda();
  }

  private createBackendNestServerlessLambda() {
    const fn = new lambda.DockerImageFunction(this, 'NestServerlessLambdaDocker', {
      functionName: 'nest-serverless-lambda-docker',
      code: lambda.DockerImageCode.fromImageAsset("../../", {
        file: "apps/my-nest-app/Dockerfile.Lambda",
        exclude: [
          'apps/cdk-app/cdk.out',
        ],
      })
    });

    new apigw.LambdaRestApi(this, "MyApi", {
      handler: fn,
    });
  }
}
