import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { GqlConfigService } from './gql-config.service';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
  ],
})
export class GqlModule {}
