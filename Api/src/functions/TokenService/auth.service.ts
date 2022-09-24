import {
    APIGatewayAuthorizerEvent,
    APIGatewayAuthorizerResult,
  } from "aws-lambda";
  
  export default class AuthService {
    private logger: any;
    private jwt: any;
    private jwksClient: any;
    constructor(logger: any, jwt: any, jwksClient: any) {
      this.logger = logger;
      this.jwt = jwt;
      this.jwksClient = jwksClient;
    }
  
    validate = async (event: APIGatewayAuthorizerEvent) => {
      this.logger.debug(
        "APIGatewayAuthorizerEvent? ${event}",
        JSON.stringify(event)
      );
  
      var { decoded, token }: { decoded: any; token: null } =
        this._extractJwt(event);
  
      let { client, kid, token_issuer } = this._setupClient(decoded);
  
      let key = await client.getSigningKey(kid);
  
      this.logger.debug("getSigningKey? ${key}", key);
  
      return await this._verifyJwt(key, token, token_issuer, event);
    };
  
    _getToken = (params: { type: string; authorizationToken: any }) => {
      if (!params.type || params.type !== "TOKEN") {
        throw new Error("Expected 'event.type' parameter to have value TOKEN");
      }
      var tokenString = params.authorizationToken;
      if (!tokenString) {
        throw new Error(
          "Expected 'event.authorizationToken' parameter to be set"
        );
      }
      var match = tokenString.match(/^Bearer (.*)$/);
      if (!match || match.length < 2) {
        throw new Error(
          "Invalid Authorization token - '" +
            tokenString +
            "' does not match 'Bearer .*'"
        );
      }
      return match[1];
    };
  
    _getTokenFromHeader = (params: any) => {
      var tokenString = params?.headers.authorization;
  
      if (!tokenString) tokenString = params?.headers.Authorization;
  
      if (!tokenString) {
        throw new Error(
          "Expected 'event.authorizationToken' parameter to be set"
        );
      }
      var match = tokenString.match(/^Bearer (.*)$/);
      if (!match || match.length < 2) {
        throw new Error(
          "Invalid Authorization token - '" +
            tokenString +
            "' does not match 'Bearer .*'"
        );
      }
      return match[1];
    };
  
    _verifyJwt = async (key: any, token: null, token_issuer: any, event: any) => {
      let signingKey = key.publicKey || key.rsaPublicKey;
  
      this.logger.debug(`verifyTokenAndReturnPolicy? ${signingKey}`);
  
      //verify token against issuer and signature
  
      let decoded = await this.jwt.verify(token, signingKey, {
        issuer: token_issuer,
      });
  
      this.logger.debug("decoded? ${decoded}", JSON.stringify(decoded));
  
      this.logger.debug(`getPolicy enter? ${signingKey}`);
  
      return this._getPolicy(decoded, event);
    };
  
    _setupClient = (decoded: any) => {
      var kid = decoded.header.kid;
      var jwks_uri = decoded.payload.iss + "/.well-known/jwks.json";
      var token_issuer = decoded.payload.iss;
  
      this.logger.debug(`setupClient? ${jwks_uri}`);
  
      var client = new this.jwksClient({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: jwks_uri,
      });
  
      this.logger.debug(`setupClient completed ? ${jwks_uri}`);
  
      return { client, kid, token_issuer };
    };
  
    _getPolicy = (
      decoded: { scope: any; sub: string; username: string },
      event: any
    ): APIGatewayAuthorizerResult => {
      var scope = decoded.scope;
      var username = "";
      var sub = "";
      if (decoded.sub) sub = decoded.sub;
  
      username = decoded.username ? decoded.username : sub;
      this.logger.debug(event["methodArn"]);
      this.logger.debug("scope:" + scope);
      const context = {
        scope: scope,
        username: username,
        sub,
      };
      return this._getPolicyReponse(
        decoded.sub,
        this._getPolicyDocument("Allow", "*"),
        context
      );
    };
  
    _getPolicyReponse = (principalId: any, policyDocument: any, context: any) => {
      const authResponse: any = {
        principalId,
        policyDocument,
        context,
      };
      return authResponse;
    };
  
    _getPolicyDocument = (effect: any, resource: any) => {
      var policyDocument: any = {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: effect,
            Resource: resource,
          },
        ],
      };
      return policyDocument;
    };
  
    _extractJwt = (event: APIGatewayAuthorizerEvent) => {
      let token: null = null;
  
      this.logger.debug("event.type ${type}", event.type);
  
      if (!event.type || event.type !== "REQUEST") {
        throw new Error("Expected 'event.type' parameter to have value REQUEST");
      }
  
      token =
        event.type != "REQUEST"
          ? this._getToken(event)
          : this._getTokenFromHeader(event);
  
      if (!token) {
        throw new Error("Expected 'unable to extract token");
      }
  
      var decoded = this.jwt.decode(token, { complete: true });
  
      this.logger.debug("decoded? ${decoded}", decoded);
  
      if (decoded == null)
        throw new Error("Invalid Authorization token - '" + decoded);
  
      if ( !['id','access'].includes( decoded.payload.token_use))
        throw new Error("Invalid token type - " + decoded);
      return { decoded, token };
    };
  }
  