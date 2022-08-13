import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Cors } from 'aws-cdk-lib/aws-apigateway';

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
    })

    // const fn = new lambda.Function(this, "NestServerlessLambda", {
    //   functionName: "nest-serverless-lambda",
    //   runtime: lambda.Runtime.NODEJS_14_X,
    //   handler: "lambda.handler",
    //   code: lambda.Code.fromAsset(
    //     "../../dist/apps/my-nest-app/"
    //   ),
    // });

    new apigw.LambdaRestApi(this, "MyApi", {
      handler: fn,
    });
  }
}
