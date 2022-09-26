import { handler } from './createUser';
import 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { DynamoDB } from 'aws-sdk';
// import sinonChai from 'sinon-chai';
// import chaiAsPromised from 'chai-as-promised';
import { Context, APIGatewayProxyEvent } from 'aws-lambda';
// create a sinon sandbox
const sandbox = sinon.createSandbox()
describe("testing user api", ()=> {
	// const params = {
	// 	TableName: 'Tasks',
	// 	Key: { id: 42 }
	// }
    beforeEach(() => sandbox
    // Here I overwrite every call to #get()
    .stub(DynamoDB.DocumentClient.prototype, 'get')
    //.withArgs(params)
    // And define my own return
    .resolves({ Item: { id: 42 } }
    )
    )
// Runs after every test.  Undo our temporary
// overwrite so the next test starts clean
afterEach(() => sandbox.restore())

  it("checks http 200", async ()=> {
    const apiEvent = createApiEvent(true);
    const result: any = await handler(apiEvent, <Context>{}, () => { });
    const body = JSON.parse(result.body);
    console.log(body);
    expect(result.statusCode).to.eql(200);
    expect(body.error).contains("task not found");
  });


function createApiEvent(hasTenantId: boolean) : APIGatewayProxyEvent {
    let apiEvent : APIGatewayProxyEvent  = {
        "resource": "/groups",
        "path": "/platform-access-service-pkg/groups",
        "httpMethod": "GET",
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
            "authorization": "Bearer eyJraWQiOiJqWHhJbVdZVWxpQUp2eVFGNFh6MFNWNW1qbGlIRmQrdEVZbGJyK1NFemJNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2NGJkMzY0Yy1mZjk5LTRkMDAtOGE3My02NDY1OTEyZTkzMTAiLCJldmVudF9pZCI6IjYwOGI0YmEzLWQ2NWUtNDE2OS1hMmUzLTJhZDA5Nzk0NzcyMiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MTc4MDY2MTUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTIuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0yX0tCamNSdXVEdiIsImV4cCI6MTYxNzgxMDUyNCwiaWF0IjoxNjE3ODA2OTI0LCJqdGkiOiJjYzg5MDRmNS0zNmUyLTRhOTQtOGFiOS1kOTY1OGM4Y2MwZTIiLCJjbGllbnRfaWQiOiI0ZjRrOGswZXFjOGg0b2ZjMDIzc2FkZnRoZiIsInVzZXJuYW1lIjoiNjRiZDM2NGMtZmY5OS00ZDAwLThhNzMtNjQ2NTkxMmU5MzEwIn0.EQ4lxio0bSuGRlwXPiaGUEscse6Xt8j3m84qEuAEOxm5bZfCWXweUH-eDwDLQCuwTUCQRFshg-ykrSrX7WwsY1rX23ps6TiRwbmj3JtPDk-U2-wRQzjGEg4jkHA-4CxIH3fW4EpkHauRMyAV1g24srRP0P6iyhq2eQoXr25TugWwWX4h4aluL4HExSHo6aooK_4bPgNE19jNgC9QzzN_zxSvcUap2g9SS4f43mo3xJs5TcoWbpYjZ743O-tYlADTYJq03Z4tZ66zETaTnyEA-Ye26vut5res5fdOFfzn0CvWcAWTABgo3h5bT86uxd0m04P9TFzgzJxa7JQy1kd2Tg",
            "cloudfront-forwarded-proto": "https",
            "cloudfront-is-desktop-viewer": "true",
            "cloudfront-is-mobile-viewer": "false",
            "cloudfront-is-smarttv-viewer": "false",
            "cloudfront-is-tablet-viewer": "false",
            "cloudfront-viewer-country": "GB",
            "host": "api.ws-development.co.uk",
            "origin": "https://www.ws-development.co.uk",
            "platformtenantid": "8891a2cf-9496-444e-8e2b-203e9eabdc40",
            "referer": "https://www.sws-development.co.uk/",
            "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36",
            "via": "2.0 ff6f54aebf46d7ff38b7ea8840d96448.cloudfront.net (CloudFront)",
            "x-amz-cf-id": "q0uEQbtwnqcib0q8A1QeN9hxyK2Dk4TUR2PoNrev3LoCIwhXiWYbEQ==",
            "x-amzn-trace-id": "Root=1-606dc64f-04fb5feb5cafc41d322588e3",
            "x-api-key": "w47qAGIH3d27Bu2S01prc4jTojkR4Oy38CIPvMVR",
            "x-forwarded-for": "87.80.246.225, 64.252.166.97",
            "x-forwarded-port": "443",
            "x-forwarded-proto": "https"
        },
        "multiValueHeaders": {
            "Accept": [
                "application/json, text/plain, */*"
            ],
            "accept-encoding": [
                "gzip, deflate, br"
            ],
            "Accept-Language": [
                "en-GB,en-US;q=0.9,en;q=0.8"
            ],
            "Authorization": [
                "Bearer eyJraWQiOiJqWHhJbVdZVWxpQUp2eVFGNFh6MFNWNW1qbGlIRmQrdEVZbGJyK1NFemJNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2NGJkMzY0Yy1mZjk5LTRkMDAtOGE3My02NDY1OTEyZTkzMTAiLCJldmVudF9pZCI6IjYwOGI0YmEzLWQ2NWUtNDE2OS1hMmUzLTJhZDA5Nzk0NzcyMiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MTc4MDY2MTUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTIuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0yX0tCamNSdXVEdiIsImV4cCI6MTYxNzgxMDUyNCwiaWF0IjoxNjE3ODA2OTI0LCJqdGkiOiJjYzg5MDRmNS0zNmUyLTRhOTQtOGFiOS1kOTY1OGM4Y2MwZTIiLCJjbGllbnRfaWQiOiI0ZjRrOGswZXFjOGg0b2ZjMDIzc2FkZnRoZiIsInVzZXJuYW1lIjoiNjRiZDM2NGMtZmY5OS00ZDAwLThhNzMtNjQ2NTkxMmU5MzEwIn0.EQ4lxio0bSuGRlwXPiaGUEscse6Xt8j3m84qEuAEOxm5bZfCWXweUH-eDwDLQCuwTUCQRFshg-ykrSrX7WwsY1rX23ps6TiRwbmj3JtPDk-U2-wRQzjGEg4jkHA-4CxIH3fW4EpkHauRMyAV1g24srRP0P6iyhq2eQoXr25TugWwWX4h4aluL4HExSHo6aooK_4bPgNE19jNgC9QzzN_zxSvcUap2g9SS4f43mo3xJs5TcoWbpYjZ743O-tYlADTYJq03Z4tZ66zETaTnyEA-Ye26vut5res5fdOFfzn0CvWcAWTABgo3h5bT86uxd0m04P9TFzgzJxa7JQy1kd2Tg"
            ],
            "CloudFront-Forwarded-Proto": [
                "https"
            ],
            "CloudFront-Is-Desktop-Viewer": [
                "true"
            ],
            "CloudFront-Is-Mobile-Viewer": [
                "false"
            ],
            "CloudFront-Is-SmartTV-Viewer": [
                "false"
            ],
            "CloudFront-Is-Tablet-Viewer": [
                "false"
            ],
            "CloudFront-Viewer-Country": [
                "GB"
            ],
            "Host": [
                "api.irisws-development.co.uk"
            ],
            "origin": [
                "https://www.irisws-development.co.uk"
            ],
            "platformtenantid": [
                "8891a2cf-9496-444e-8e2b-203e9eabdc40"
            ],
            "Referer": [
                "https://www.irisws-development.co.uk/"
            ],
            "sec-ch-ua": [
                "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\""
            ],
            "sec-ch-ua-mobile": [
                "?0"
            ],
            "sec-fetch-dest": [
                "empty"
            ],
            "sec-fetch-mode": [
                "cors"
            ],
            "sec-fetch-site": [
                "same-site"
            ],
            "User-Agent": [
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36"
            ],
            "Via": [
                "2.0 ff6f54aebf46d7ff38b7ea8840d96448.cloudfront.net (CloudFront)"
            ],
            "X-Amz-Cf-Id": [
                "q0uEQbtwnqcib0q8A1QeN9hxyK2Dk4TUR2PoNrev3LoCIwhXiWYbEQ=="
            ],
            "X-Amzn-Trace-Id": [
                "Root=1-606dc64f-04fb5feb5cafc41d322588e3"
            ],
            "x-api-key": [
                "w47qAGIH3d27Bu2S01prc4jTojkR4Oy38CIPvMVR"
            ],
            "X-Forwarded-For": [
                "87.80.246.225, 64.252.166.97"
            ],
            "X-Forwarded-Port": [
                "443"
            ],
            "X-Forwarded-Proto": [
                "https"
            ]
        },
        "queryStringParameters": {
            "pageIndex": "0",
            "pageSize": "8"
        },
        "multiValueQueryStringParameters": {
            "pageIndex": [
                "0"
            ],
            "pageSize": [
                "8"
            ]
        },
        "pathParameters": null,
        "stageVariables": null,
        "requestContext": {
            "resourceId": "nelf0p",
            "authorizer": {
                "sub": "64bd364c-ff99-4d00-8a73-6465912e9310",
                "scope": "aws.cognito.signin.user.admin",
                "principalId": "64bd364c-ff99-4d00-8a73-6465912e9310",
                "integrationLatency": 161,
                "username": "64bd364c-ff99-4d00-8a73-6465912e9310"
            },
            "resourcePath": "/groups",
            "httpMethod": "GET",
            "extendedRequestId": "davsdGk0rPEFe0g=",
            "requestTime": "07/Apr/2021:14:48:47 +0000",
            "path": "/platform-access-service-pkg/groups",
            "accountId": "245633934812",
            "protocol": "HTTP/1.1",
            "stage": "v1",
            "domainPrefix": "api",
            "requestTimeEpoch": 1617806927679,
            "requestId": "349e2a34-1e43-4d1c-8d72-1ad762298b49",
            "identity": {
                "clientCert": null,
                "cognitoIdentityPoolId": null,
                "cognitoIdentityId": null,
                "apiKey": "w47qAGIH3d27Bu2S01prc4jTojkR4Oy38CIPvMVR",
                "principalOrgId": null,
                "cognitoAuthenticationType": null,
                "userArn": null,
                "apiKeyId": "18lquaich6",
                "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36",
                "accountId": null,
                "caller": null,
                "sourceIp": "87.80.246.225",
                "accessKey": null,
                "cognitoAuthenticationProvider": null,
                "user": null
            },
            "domainName": "api.irisws-development.co.uk",
            "apiId": "8qdthfbuce"
        },
        "body": JSON.stringify({
            "groupname": `test-group`,
            "groupdescription": `test-group`,
            "createdby": "test-group@gmail.com",
            "users": [
                "user1",
                "user2"
            ]
        }),
        "isBase64Encoded": false
    };

    if (hasTenantId) {
        apiEvent.headers['platformtenantid'] = 'test-create';
        apiEvent.multiValueHeaders['platformtenantid'] = ['test-create'];
    } 
    return apiEvent;
}

});