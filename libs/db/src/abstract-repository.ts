import { AbstractDocument } from '@app/db/abstract-document';
import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, SaveOptions, Types, UpdateQuery } from 'mongoose';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
    protected abstract readonly logger: Logger;

    protected constructor(protected readonly model: Model<TDocument>) {}

    async create(document: Omit<TDocument, '_id'>, options?: SaveOptions): Promise<TDocument> {
        const createdDocument = new this.model({
            ...document,
            _id: new Types.ObjectId(),
        });
        return (await createdDocument.save(options)).toJSON() as unknown as TDocument;
    }

    async deleteOne(filterQuery: FilterQuery<TDocument>): Promise<{ status: number; message: string }> {
        try {
            this.model.deleteOne(filterQuery);
        } catch (e: unknown) {
            return { status: 500, message: 'Internal server error.' };
        }

        return { status: 200, message: 'Successfully deleted document.' };
    }

    async findOne(filterQuery: FilterQuery<TDocument>, strict: boolean = false): Promise<TDocument> {
        const document = await this.model.findOne(filterQuery, {}, { lean: true });

        if (strict && !document) {
            this.logger.warn('Document not found with filterQuery', filterQuery);
            throw new NotFoundException('Document not found.');
        }

        return document as TDocument;
    }

    async findMultiple(filterQuery?: FilterQuery<TDocument>, projection?: Record<string, number>) {
        return (await this.model.find(filterQuery || {}, projection || {}, { lean: true })) as Array<TDocument>;
    }

    async findOneAndUpdate(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>) {
        const document = await this.model.findOneAndUpdate(filterQuery, update, {
            lean: true,
            new: true,
        });

        if (!document) {
            this.logger.warn(`Document not found with filterQuery:`, filterQuery);
            throw new NotFoundException('Document not found.');
        }

        return document;
    }

    async upsert(filterQuery: FilterQuery<TDocument>, document: Partial<TDocument>) {
        return this.model.findOneAndUpdate(filterQuery, document, {
            lean: true,
            upsert: true,
            new: true,
        });
    }

    async exists(filterQuery: FilterQuery<TDocument>) {
        return await this.model.exists(filterQuery);
    }
}
