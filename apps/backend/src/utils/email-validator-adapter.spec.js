"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const email_validator_adapter_1 = require("./email-validator-adapter");
const validator_1 = __importDefault(require("validator"));
jest.mock("validator", () => ({
    isEmail() {
        return true;
    },
}));
const makeSut = () => {
    return new email_validator_adapter_1.EmailValidatorAdapter();
};
describe("EmailValidator Adapter", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    test("should return false if validator returns false", () => {
        jest.spyOn(validator_1.default, "isEmail").mockReturnValueOnce(false);
        const sut = makeSut();
        const isValidEmail = sut.isValid("invalid_email@mail.com");
        expect(isValidEmail).toBe(false);
    });
    test("should return true if validator returns true", () => {
        const sut = makeSut();
        const isValidEmail = sut.isValid("valid_email@mail.com");
        expect(isValidEmail).toBe(true);
    });
    test("should call validator with correct email", () => {
        const isEmailSpy = jest.spyOn(validator_1.default, "isEmail");
        const sut = makeSut();
        sut.isValid("any_email@mail.com");
        expect(isEmailSpy).toHaveBeenCalledWith("any_email@mail.com");
    });
});
