import { ArgumentMetadata, ConflictException, Injectable, PipeTransform } from "@nestjs/common";
import { isValidObjectId } from "mongoose";

@Injectable()
export class ValidateMongoId implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata) {
        if (!isValidObjectId(value)) {
            throw new ConflictException('Not a valid mongo id')
        }
        return value
    }
}