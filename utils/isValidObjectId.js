import { ObjectId } from 'mongodb'

export const isValidObjectId = (id) => {
    return ObjectId.isValid(id)
}