import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): ApolloDriverConfig {
    return {
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    };
  }
}
