import {
    APIGatewayAuthorizerEvent,
    APIGatewayAuthorizerResult,
} from 'aws-lambda';

export default class AuthService {
    /*eslint-disable */
    private logger: any;
    /*eslint-disable */
    private jwt: any;
    /*eslint-disable */
    private jwksClient: any;
    /*eslint-disable */
    constructor(logger: any, jwt: any, jwksClient: any) {
        this.logger = logger;
        this.jwt = jwt;
        this.jwksClient = jwksClient;
    }

    validate = async (event: APIGatewayAuthorizerEvent) => {
        this.logger.debug(
            'APIGatewayAuthorizerEvent? ${event}',
            JSON.stringify(event)
        );
        /*eslint-disable */
        const { decoded, token }: { decoded: any; token: null } =
            this._extractJwt(event);

        const { client, kid, token_issuer } = this._setupClient(decoded);

        const key = await client.getSigningKey(kid);

        this.logger.debug('getSigningKey? ${key}', key);

        return await this._verifyJwt(key, token, token_issuer, event);
    };
    /*eslint-disable */
    _getToken = (params: { type: string; authorizationToken: any }) => {
        if (!params.type || params.type !== 'TOKEN') {
            throw new Error(
                "Expected 'event.type' parameter to have value TOKEN"
            );
        }
        const tokenString = params.authorizationToken;
        if (!tokenString) {
            throw new Error(
                "Expected 'event.authorizationToken' parameter to be set"
            );
        }
        const match = tokenString.match(/^Bearer (.*)$/);
        if (!match || match.length < 2) {
            throw new Error(
                "Invalid Authorization token - '" +
                    tokenString +
                    "' does not match 'Bearer .*'"
            );
        }
        return match[1];
    };
    /*eslint-disable */
    _getTokenFromHeader = (params: any) => {
        let tokenString = params?.headers.authorization;

        if (!tokenString) tokenString = params?.headers.Authorization;

        if (!tokenString) {
            throw new Error(
                "Expected 'event.authorizationToken' parameter to be set"
            );
        }
        const match = tokenString.match(/^Bearer (.*)$/);
        if (!match || match.length < 2) {
            throw new Error(
                "Invalid Authorization token - '" +
                    tokenString +
                    "' does not match 'Bearer .*'"
            );
        }
        return match[1];
    };

    _verifyJwt = async (
        /*eslint-disable */
        key: any,
        token: null,
        /*eslint-disable */
        token_issuer: any,
        /*eslint-disable */
        event: any
    ) => {
        const signingKey = key.publicKey || key.rsaPublicKey;

        this.logger.debug(`verifyTokenAndReturnPolicy? ${signingKey}`);

        //verify token against issuer and signature

        const decoded = await this.jwt.verify(token, signingKey, {
            issuer: token_issuer,
        });

        this.logger.debug('decoded? ${decoded}', JSON.stringify(decoded));

        this.logger.debug(`getPolicy enter? ${signingKey}`);

        return this._getPolicy(decoded, event);
    };
    /*eslint-disable */
    _setupClient = (decoded: any) => {
        const kid = decoded.header.kid;
        const jwks_uri = decoded.payload.iss + '/.well-known/jwks.json';
        const token_issuer = decoded.payload.iss;

        this.logger.debug(`setupClient? ${jwks_uri}`);

        const client = new this.jwksClient({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 10,
            jwksUri: jwks_uri,
        });

        this.logger.debug(`setupClient completed ? ${jwks_uri}`);

        return { client, kid, token_issuer };
    };

    _getPolicy = (
        /*eslint-disable */
        decoded: { scope: any; sub: string; username: string },
        /*eslint-disable */
        event: any
    ): APIGatewayAuthorizerResult => {
        const scope = decoded.scope;
        let username = '';
        let sub = '';
        if (decoded.sub) sub = decoded.sub;

        username = decoded.username ? decoded.username : sub;
        this.logger.debug(event['methodArn']);
        this.logger.debug('scope:' + scope);
        const context = {
            scope: scope,
            username: username,
            sub,
        };
        return this._getPolicyReponse(
            decoded.sub,
            this._getPolicyDocument('Allow', '*'),
            context
        );
    };

    _getPolicyReponse = (
        /*eslint-disable */
        principalId: any,
        /*eslint-disable */
        policyDocument: any,
        /*eslint-disable */
        context: any
    ) => {
        /*eslint-disable */
        const authResponse: any = {
            principalId,
            policyDocument,
            context,
        };
        return authResponse;
    };
    /*eslint-disable */
    _getPolicyDocument = (effect: any, resource: any) => {
        /*eslint-disable */
        const policyDocument: any = {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource,
                },
            ],
        };
        return policyDocument;
    };

    _extractJwt = (event: APIGatewayAuthorizerEvent) => {
        let token = null;

        this.logger.debug('event.type ${type}', event.type);

        if (!event.type || event.type !== 'REQUEST') {
            throw new Error(
                "Expected 'event.type' parameter to have value REQUEST"
            );
        }

        token =
            event.type != 'REQUEST'
                ? this._getToken(event)
                : this._getTokenFromHeader(event);

        if (!token) {
            throw new Error("Expected 'unable to extract token");
        }

        const decoded = this.jwt.decode(token, { complete: true });

        this.logger.debug('decoded? ${decoded}', decoded);

        if (decoded == null)
            throw new Error("Invalid Authorization token - '" + decoded);

        if (!['id', 'access'].includes(decoded.payload.token_use))
            throw new Error('Invalid token type - ' + decoded);
        return { decoded, token };
    };
}
