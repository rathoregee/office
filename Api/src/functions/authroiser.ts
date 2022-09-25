import {
    APIGatewayAuthorizerResult,
    APIGatewayAuthorizerEvent,
} from 'aws-lambda';
import { JwksClient } from 'jwks-rsa';
import { LoggerConfiguration, ConsoleSink } from 'serilogger';
import AuthService from './TokenService/auth.service';
/*eslint-disable */
const jwt = require('jsonwebtoken');
const logger = new LoggerConfiguration().writeTo(new ConsoleSink()).create();

/**
 * @description The controller to validate JWT token.
 */
export async function handler(
    event: APIGatewayAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> {
    try {
        logger.info('request started');
        const service = new AuthService(logger, jwt, JwksClient);
        const policy = await service.validate(event);
        logger.debug('policy {policy}', policy);
        logger.info('request completed');
        return policy;
    } catch (ex) {
        if (ex instanceof Error) {
            logger.error(ex, 'authorizer exception');
        }
        throw Error('Unauthorized');
    }
}
