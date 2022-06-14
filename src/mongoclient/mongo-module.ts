import { Module } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DATABASE_NAME, MONGO_CLIENT } from '../constants';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      inject: [ConfigService],
      provide: MONGO_CLIENT,
      useFactory: async (configService: ConfigService): Promise<Db> => {
        try {
          const databaseName = configService.get<string>(DATABASE_NAME);
          const client = await MongoClient.connect(
            'mongodb://root:password@localhost:28017?authSource=admin',
          );
          return client.db(databaseName);
        } catch (e) {
          throw e;
        }
      },
    },
  ],
  exports: [MONGO_CLIENT],
})
export class MongoModule {}
