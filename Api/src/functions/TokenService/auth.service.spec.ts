import { JwksClient } from "jwks-rsa";
let jwt = require("jsonwebtoken");
import AuthService from "./auth.service";
import Logger from "./logger";
import Event from "./event";
//import { LoggerConfiguration, ConsoleSink } from "serilogger";
import "mocha";
import { expect } from "chai";
import sinon from "sinon";

describe("Authorizer", () => {
  //let logger = new LoggerConfiguration().writeTo(new ConsoleSink()).create();
  const logger = new Logger();
  let sut: AuthService;
  beforeEach(() => {
    sut = new AuthService(logger, jwt, JwksClient);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("when token type is not valid", async () => {
    //given
    var event = Event();
    event.type = "TOKEN";
    //when
    try {
      await sut.validate(event);
    } catch (ex : any) {
      //then
      expect(ex.message).to.eql(
        "Expected 'event.type' parameter to have value REQUEST"
      );
    }
  });

  it("when token is not valid and unable to decode", async () => {
    //given
    sinon.stub(jwt, "verify").callsFake(() => {
      return Promise.resolve(null);
    });
    //when
    try {
      await sut.validate(Event());
    } catch (ex : any) {
      //then
      expect(ex.message).contains(
        "Cannot read"
      );
    }
  });

  it("when token is valid should return aws policy", async () => {
    //given
    const decoded = {
      sub: "64bd364c-ff99-4d00-8a73-6465912e9310",
      scope: "aws.cognito.signin.user.admin",
      principalId: "64bd364c-ff99-4d00-8a73-6465912e9310",
      integrationLatency: 161,
      username: "64bd364c-ff99-4d00-8a73-6465912e9310",
    };
    sinon.stub(jwt, "verify").callsFake(() => {
      return Promise.resolve(decoded);
    });
    //when
    const result = await sut.validate(Event());
    //then
    expect(result.policyDocument.Version).to.eql("2012-10-17");
  });


  
  it("when id-token is valid should return aws policy", async () => {
    //given
    let event = Event() as any;
    event.headers.Authorization='Bearer eyJraWQiOiJZK2xOUmJzK1FRRUU0S2Y2bW94VmlIdytZeldsKzJpVkhrUmdIWWhsY0pzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5MjU0NjU5Ni1kMjc0LTQ5YTctYjJiNS1kYWVlZTBiMWVlZGMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfbUd2MjlaMmZ5IiwiY29nbml0bzp1c2VybmFtZSI6Im11aGFtZWQuc3VsZW1hbiIsIm9yaWdpbl9qdGkiOiJmZWNlMGEyYy00MWY1LTQ5ZjQtYWMxNy1lYTQxMmEwY2U2YTkiLCJhdWQiOiI0ZTM5ZnFlaHZsazFuNG1pMjRndHBhMHRsOCIsImV2ZW50X2lkIjoiNDI1YjMxMjYtZWU2Ny00YWQwLTgwZmEtNjQxOTJkMmI4MGEyIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NTg0MjE1NTYsImV4cCI6MTY1ODQyNTE1NiwiaWF0IjoxNjU4NDIxNTU2LCJqdGkiOiI0ZTQyYWM2ZC04MTU5LTRhY2MtYTYwYy0wMDA1NDBiMzA5YmMiLCJlbWFpbCI6Im11aGFtZWQuc3VsZW1hbkBkYXRhZmxvd2dyb3VwLmNvbSJ9.qOQlvWYzx9OefeSFPHNUQ4elFxsWXkpXsc8tFuWc-LS5nhmQFhE1GZ80wQItQ5JYeS2sR54QxtL_aDTN-mALxVU9Rj-SdYMEyUCyrs41qcbxDvWhHcScodfPCGdn_KRqlrOeOZqvU-6HeYrVrbB2vO8mIt517JQ5rONPFRUu7JtqyQvrvjAstqbYo76uTURoUyORZo_6rthlEOe3SQsqWuG0TsabcCcOK5DeXHqTlglUyVdFvkAXEJL-UnGBi3BOteD4cyGGFQpa22IOF_j_WWThbZuP9Ik4igIaVSVbQlrVVH9NCUteivEitfyTTYx4uDiuxK46WCEDYPaO-3N0qw';
    const decoded = {
      sub: "64bd364c-ff99-4d00-8a73-6465912e9310",
      scope: "aws.cognito.signin.user.admin",
      principalId: "64bd364c-ff99-4d00-8a73-6465912e9310",
      integrationLatency: 161,
      username: "64bd364c-ff99-4d00-8a73-6465912e9310",
    };
    sinon.stub(jwt, "verify").callsFake(() => {
      return Promise.resolve(decoded);
    });
    //when
    
    const result = await sut.validate(event);
    //then
    expect(result.policyDocument.Version).to.eql("2012-10-17");
  });
});
