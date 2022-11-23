import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { blogsDto } from 'src/blog-post/dto/blog-post.dto';
import { FilterBlogDto } from 'src/blog-post/dto/filter-blog.dto';
import { BlogPostService } from 'src/blog-post/service/blog-post/blog-post.service';

@Controller('blog-post')
export class BlogPostController {
  constructor(private blogService: BlogPostService) {}
  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(@Body() blogData: blogsDto) {
    const newBlog = await this.blogService.createblog(blogData);
    if (newBlog) return { msg: 'Post Created' };
    return new HttpException('post already exit', HttpStatus.BAD_REQUEST);
  }
  @Get()
  async getAllBlogs(@Query() filterBlogDTO: FilterBlogDto) {
    if (Object.keys(filterBlogDTO).length) {
      const filterBlog = await this.blogService.getFilterBlog(filterBlogDTO);
      return filterBlog;
    } else {
      const allBlogs = await this.blogService.getBlogs();
      return allBlogs;
    }
  }
  @Get(':id')
  async getBlogById(@Param('id') id: number) {
    const getOneBlog = await this.blogService.getBlogById(id);
    if (!getOneBlog)
      throw new HttpException('Post does not exit', HttpStatus.NOT_FOUND);
    return getOneBlog;
  }
  @Delete(':id')
  deleteBlog(@Param('id') id: number) {
    return this.blogService.DeleteBlog(id);
  }
  @Put('/update/:id')
  async updatePost(@Param('id') id: number, @Body() blogDto: blogsDto) {
    const updatedBlog = await this.blogService.updateBlog(id, blogDto);
    if (!updatedBlog)
      throw new HttpException('Post does not exit', HttpStatus.BAD_REQUEST);
    return updatedBlog;
  }
}
