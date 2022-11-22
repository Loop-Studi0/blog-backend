import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPostModule } from './blog-post/blog-post.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB),
    BlogPostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
