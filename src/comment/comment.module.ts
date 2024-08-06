import { Module } from '@nestjs/common';
import { CommentsService } from './comment.service';
import { CommentsController } from './comment.controller';

@Module({
  providers: [CommentsService],
  controllers: [CommentsController]
})
export class CommentModule {}
