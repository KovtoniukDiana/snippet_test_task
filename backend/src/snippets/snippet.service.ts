import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Snippet } from './snippet.schema';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';

@Injectable()
export class SnippetService {

  constructor(@InjectModel(Snippet.name) private snippetModel: Model<Snippet>) {}

  async create(createSnippetDto: CreateSnippetDto) {
    return new this.snippetModel(createSnippetDto).save();
  }

  async findAll(query: {q?:  string, title?: string, tag?: string; page?: number; limit?: number}) {
    
    const { q, tag, page = 1, limit = 10 } = query;
    const filter: any = {};

    if (q) {
      filter.$text = { $search: q };
    }
    if (tag) {
      filter.tags = tag;
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.snippetModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
      this.snippetModel.countDocuments(filter)
    ]);

    return { items, total, page, pages: Math.ceil(total / limit) };
  }

  async findOne(id: string) {
    const snippet = await this.snippetModel.findById(id).exec();

    if (!snippet) throw new NotFoundException('Сніпет не знайдено');
    return snippet;
  }

  async update(id: string, updateSnippetDto: UpdateSnippetDto) {
    const updated = await this.snippetModel.findByIdAndUpdate(id, updateSnippetDto, { new: true }).exec();

    if (!updated) throw new NotFoundException('Сніпет не знайдено');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.snippetModel.findByIdAndDelete(id).exec();

    if (!deleted) throw new NotFoundException('Сніпет не знайдено');
    return { success: true };
  }
}
