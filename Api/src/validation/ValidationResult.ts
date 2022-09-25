import { injectable } from 'inversify';
import { IFormData } from '../lib/IFormData';
import { ValidationFactory } from '../validation/ValidationFactory';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { IValidationResult } from './IValidationResult';
/*eslint-disable */
const multipart = require('aws-lambda-multipart-parser');
@injectable()
export class ValidationResult implements IValidationResult {
    validateResult(event: APIGatewayProxyEvent): {
        isValid: boolean;
        validationResult: any;
        data: IFormData;
    } {
        const validator = ValidationFactory.create();
        const data = this._mapFileds(multipart.parse(event, false));
        const validationResult = validator.validate(data);
        const isValid = Object.keys(validationResult).length === 0;
        return { isValid, validationResult, data };
    }

    _mapFileds(parsed: any): IFormData {
        return {
            correlationId: parsed.correlationId,
            client: parsed.client,
            from: parsed.from,
            to:
                !!parsed.to && parsed.to.trim().length > 0
                    ? parsed.to.split(',')
                    : [],
            cc:
                !!parsed.cc && parsed.cc.trim().length > 0
                    ? parsed.cc.split(',')
                    : [],
            bcc:
                !!parsed.bcc && parsed.bcc.trim().length > 0
                    ? parsed.bcc.split(',')
                    : [],
            subject: parsed.subject,
            body: parsed.body,
            isHtmlBody: parsed.isHtmlBody ? parsed.isHtmlBody : false,
            priority: parsed.priority ? parsed.priority : 'normal',
            templateId: parsed.templateId,
            attachment: parsed.attachment,
        } as IFormData;
    }
}
