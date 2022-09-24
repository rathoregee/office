
import { Container } from "inversify";
import "reflect-metadata";
import { TYPES } from "./types";
import { IEmail } from "../lib/IEmail";
import { EmailService } from "../lib/EmailService";
import { IValidationResult } from "../validation/IValidationResult";
import { ValidationResult } from "../validation/ValidationResult";

const myContainer = new Container();
myContainer.bind<IEmail>(TYPES.IEmail).to(EmailService);
myContainer.bind<IValidationResult>(TYPES.IValidationResult).to(ValidationResult);

export { myContainer };
