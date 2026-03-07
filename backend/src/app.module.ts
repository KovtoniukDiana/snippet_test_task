import { Module } from '@nestjs/common';
import { SnippetModule } from './snippets/snippet.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    SnippetModule,
    MongooseModule.forRoot(
      'mongodb://admin:password@127.0.0.1:27017/snippets?authSource=admin'
    ),
  ],
})
export class AppModule {}
