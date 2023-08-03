import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';
@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: Repository<CommentEntity>) {}

  async create(createCommentDto: CreateCommentDto): Promise<CommentEntity> {
    return await this.commentRepository.save(createCommentDto);
  }

  async findAll(): Promise<CommentEntity[]> {
    return await this.commentRepository.find();
  }

  async findOne(id: number): Promise<CommentEntity> {
    return await this.commentRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<CommentEntity> {
    const comment = await this.findOne(id);
    comment.state = updateCommentDto.state;
    comment.content = updateCommentDto.content;
    return await this.commentRepository.save(comment);
  }

  async remove(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
