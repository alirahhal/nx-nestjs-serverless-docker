## NX-NESTJS-SERVERLESS-DOCKER

This project demostrates how to use Nestjs SERVERLESS with Nx workspace. Along with deploying code to lambda via container images.

## Getting Started

Serve locally:

```Make
nx serve my-nest-app
```

Build and run docker image locally:

```Make
docker build: docker build -t nest-project:latest -f .\apps\my-nest-app\Dockerfile .

docker run: docker run -p 3333:3333 nest-project:latest
```

Deploy to lambda:

```Make
nx deploy cdk-app --require-approval never --all --profile <profile-name>
```

## Additional References

- [Nestjs Serverless](https://docs.nestjs.com/faq/serverless)
- [NestJS + Serverless + Lambda](https://nishabe.medium.com/nestjs-serverless-lambda-aws-in-shortest-steps-e914300faed5)
- [Deploy transpiled TypeScript code in Lambda with container images](https://docs.aws.amazon.com/lambda/latest/dg/typescript-image.html)