"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogMongoRepository = void 0;
//import { MongoHelper } from "../helpers/mongo-helper";
class LogMongoRepository {
    async logError(stack) {
        // const errorCollection = await MongoHelper.getCollection("errors");
        // await errorCollection.insertOne({
        //   stack,
        //   data: new Date(),
        // });
    }
}
exports.LogMongoRepository = LogMongoRepository;
