import { Module } from '@nestjs/common';
import { SnippetModule } from './snippets/snippet.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    SnippetModule, 
    MongooseModule.forRoot('mongodb://localhost:27017/snippets')
  ],
})
export class AppModule {}
