import { FormValidator } from "./FormValidator";
export class ValidationFactory {
  public static create(): FormValidator {
    return new FormValidator();
  }
}