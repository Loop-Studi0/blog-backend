import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { blogsDto } from 'src/blog-post/dto/blog-post.dto';
import { FilterBlogDto } from 'src/blog-post/dto/filter-blog.dto';
import { Blogs, blogsDocument } from 'src/blog-post/schema/blog-post.schema';

@Injectable()
export class BlogPostService {
  constructor(
    @InjectModel(Blogs.name) private blogsModel: Model<blogsDocument>,
  ) {}
  async createblog(blogDetails: blogsDto) {
    const findBlog = await this.blogsModel.findOne({
      title: blogDetails.title,
    });
    if (!findBlog) {
      const blogToSave = new this.blogsModel(blogDetails);
      return blogToSave.save();
    }
  }
  async getFilterOrder(filterOrderDTO: FilterBlogDto): Promise<Blogs[]> {
    const { author, search } = filterOrderDTO;
    let blogs = await this.getBlogs();

    if (search) {
      blogs = blogs.filter(
        (blog) =>
          blog.title.includes(search) || blog.description.includes(search),
      );
    }
    if (author) {
      blogs = blogs.filter((blog) => blog.author === author);
    }
    return blogs;
  }
  async getBlogs() {
    return await this.blogsModel.find({});
  }
  async getBlogById(id: number): Promise<Blogs> {
    return await this.blogsModel.findOne({ _id: id });
  }
  async DeleteBlog(id: number) {
    const deleteBlog = await this.blogsModel.findById({ _id: id });
    if (!deleteBlog)
      return new HttpException(
        'Blog with id have being trash',
        HttpStatus.NOT_FOUND,
      );
    return this.blogsModel.deleteOne({ _id: id });
  }
}
