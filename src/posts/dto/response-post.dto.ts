import { Comment } from "../entities/comment.entity";

export class ResponsePostDto {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  comments?: Comment[];
}
