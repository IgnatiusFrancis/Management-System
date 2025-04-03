"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogControllerDecorator = void 0;
class LogControllerDecorator {
    constructor(controller, logErrorRepository) {
        this.controller = controller;
        this.logErrorRepository = logErrorRepository;
    }
    async handle(httpRequest) {
        const httpResponse = await this.controller.handle(httpRequest);
        // Check if there was an error
        if (httpResponse.statusCode >= 400) {
            // Log the error but don't modify the response
            await this.logErrorRepository.logError(httpResponse.body instanceof Error
                ? httpResponse.body.stack
                : JSON.stringify(httpResponse.body));
        }
        // Always return the original response
        return httpResponse;
    }
}
exports.LogControllerDecorator = LogControllerDecorator;
