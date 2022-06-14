import { Module } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';

@Module({
  providers: [
    {
      provide: 'MONGO_CLIENT',
      useFactory: async (): Promise<Db> => {
        try {
          const client = await MongoClient.connect(
            'mongodb://root:password@localhost:28017?authSource=admin',
          );
          return client.db('nest-tutorial');
        } catch (e) {
          throw e;
        }
      },
    },
  ],
  exports: ['MONGO_CLIENT'],
})
export class MongoModule {}
