import { IFormData } from "../lib/IFormData";
import { APIGatewayProxyEvent } from "aws-lambda";

export interface IValidationResult {
  validateResult(event: APIGatewayProxyEvent): {
    isValid: boolean;
    validationResult: any;
    data: IFormData;
  };
}
