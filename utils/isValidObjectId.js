import { ObjectId } from 'mongodb';

const isValidObjectId = (id) => {
    return ObjectId.isValid(id);
}
export default isValidObjectId;