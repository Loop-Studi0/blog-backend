import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPostModule } from './blog-post/blog-post.module';
import { AuthMiddleware } from './users/Authmiddleware';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB),
    BlogPostModule,
    UsersModule,
    // UsersMiddleware,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
