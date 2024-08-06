import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    HttpCode,
    HttpStatus,
    ParseIntPipe,
    NotFoundException,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
  import { PostsService } from './posts.service';
  import { UpdatePostDto } from './dto/update-post.dto';
  import { Post as PostEntity } from './entities/post.entity';
  import { AuthGuard } from '../auth/auth.guard';
  import { CreatePostDto } from './dto/create-post-dto';
  import { User } from '../user/user.decorator';
  
  @ApiTags('posts')
  @ApiBearerAuth('JWT-auth')
  @Controller('posts')
  export class PostsController {
    constructor(private readonly postsService: PostsService) {}
  
    @Post()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new post' })
    @ApiResponse({ status: 201, description: 'The post has been successfully created.', type: PostEntity })
    @ApiResponse({ status: 400, description: 'Bad Request. Validation errors.' })
    async create(
      @Body() createPostDto: CreatePostDto,
      @User() user: any,  // Adjust according to how your user info is structured
    ): Promise<PostEntity> {
      return this.postsService.create(createPostDto, user.id);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all posts' })
    @ApiResponse({ status: 200, description: 'List of posts', type: [PostEntity] })
    async findAll(): Promise<PostEntity[]> {
      return this.postsService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a single post by ID' })
    @ApiResponse({ status: 200, description: 'Post details', type: PostEntity })
    @ApiResponse({ status: 404, description: 'Post not found' })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
      const post = await this.postsService.findOne(id);
      if (!post) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      return post;
    }
  
    @Patch(':id')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Update a post' })
    @ApiResponse({ status: 200, description: 'The post has been successfully updated.', type: PostEntity })
    @ApiResponse({ status: 404, description: 'Post not found.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updatePostDto: UpdatePostDto,
      @User() user: any,  // Adjust according to how your user info is structured
    ): Promise<PostEntity> {
      const post = await this.postsService.findOne(id);
      if (!post) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      if (post.authorId !== user.id) {
        throw new NotFoundException(`You do not have permission to update this post`);
      }
      return this.postsService.update(id, updatePostDto);
    }
  
    @Delete(':id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a post' })
    @ApiResponse({ status: 204, description: 'The post has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Post not found.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async remove(
      @Param('id', ParseIntPipe) id: number,
      @User() user: any,  // Adjust according to how your user info is structured
    ): Promise<void> {
      const post = await this.postsService.findOne(id);
      if (!post) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      if (post.authorId !== user.id) {
        throw new NotFoundException(`You do not have permission to delete this post`);
      }
      return this.postsService.remove(id);
    }
  }
  