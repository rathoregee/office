import {
    APIGatewayProxyHandler,
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
} from 'aws-lambda';
import { LoggerConfiguration, ConsoleSink } from 'serilogger';
import { myContainer } from '../di/inversify.config';
import { TYPES } from '../di/types';
import { IFormData } from '../lib/IFormData';
import { IEmail } from '../lib/IEmail';
import { IValidationResult } from '../validation/IValidationResult';
import { transporter } from './transporter';

const logger = new LoggerConfiguration().writeTo(new ConsoleSink()).create();
const handler: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    let reponseCode = 200;
    let reposneMessage = 'the email was sent successfully';
    /*eslint-disable */
    let responseErrors: any = {};
    logger.info(`full httprequest data :${JSON.stringify(event)}`);
    try {
        ({ reponseCode, reposneMessage, responseErrors } = await processRequest(
            event,
            reponseCode,
            reposneMessage,
            responseErrors
        ));
    } catch (ex) {
        if (ex instanceof Error) {
            logger.error(ex, 'email service exception');
            responseErrors = ex.message;
        } else {
            console.log(ex);
            responseErrors = ex;
        }
        reponseCode = 400;
        reposneMessage = 'failed to send email';
    }
    return {
        statusCode: reponseCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            message: reposneMessage,
            errors: responseErrors,
        }),
    };
};

export { handler };

const processRequest = async (
    event: APIGatewayProxyEvent,
    reponseCode: number,
    reposneMessage: string,
    /*eslint-disable */

    responseErrors: any
) => {
    const service: IEmail = myContainer.get<IEmail>(TYPES.IEmail);
    const validation: IValidationResult = myContainer.get<IValidationResult>(
        TYPES.IValidationResult
    );

    const {
        isValid,
        validationResult,
        data,
    }: {
        isValid: boolean;
        /*eslint-disable */
        validationResult: any;
        data: IFormData;
    } = validation.validateResult(event);

    if (!isValid) {
        reponseCode = 400;
        reposneMessage = 'validation errors';
        responseErrors = validationResult;
    } else {
        logger.info(
            `request correlationId :${JSON.stringify(data.correlationId)}`
        );

        const response = await service.send(logger, transporter, data);

        if (!response) {
            reponseCode = 400;
            reposneMessage = 'failed to send email';
            responseErrors = response;
        }
    }
    return { reponseCode, reposneMessage, responseErrors };
};
