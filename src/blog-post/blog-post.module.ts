import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPostController } from './controller/blog-post/blog-post.controller';
import { Blogs, BlogsSchema } from './schema/blog-post.schema';
import { BlogPostService } from './service/blog-post/blog-post.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Blogs.name,
        schema: BlogsSchema,
      },
    ]),
  ],
  controllers: [BlogPostController],
  providers: [BlogPostService],
})
export class BlogPostModule {}
