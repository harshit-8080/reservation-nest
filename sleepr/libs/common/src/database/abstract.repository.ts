import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    const result = (
      await createDocument.save()
    ).toJSON() as unknown as TDocument;

    return result;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<any> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('docuement not found with filter query');
      throw new NotFoundException('Document not found');
    }
    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<any> {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn('docuement not found with filter query');
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async findAll(filterQuery: FilterQuery<TDocument>): Promise<any[]> {
    return await this.model.find(filterQuery, {}, { lean: true });
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>): Promise<any> {
    return await this.model.findOneAndDelete(filterQuery, { lean: true });
  }
}
