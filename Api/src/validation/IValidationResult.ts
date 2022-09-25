import { IFormData } from '../lib/IFormData';
import { APIGatewayProxyEvent } from 'aws-lambda';

export interface IValidationResult {
  /*eslint-disable */
  validateResult(event: APIGatewayProxyEvent): {
    isValid: boolean;
    validationResult: any;
    data: IFormData;
  };
}
