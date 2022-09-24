// import 'mocha';
// import sinon from 'sinon';
// import * as chai from 'chai';
// import sinonChai from 'sinon-chai';

// chai.use(sinonChai);
// const expect = chai.expect;

// import * as AWSMock from 'aws-sdk-mock';
// import AWS from 'aws-sdk';
// AWSMock.setSDKInstance(AWS);

// const sendMessageSpy = sinon.spy((params, callback) => {
//     callback(null, { MessageId: 'spyId' });
// });
// AWSMock.mock('SQS', 'sendMessage', sendMessageSpy);

// import { MessagePublisherService } from './MessagePublisherService';
// import pino from 'pino';

// describe('Message Publisher Service', () => {
//     const testQueueUrl = 'testQueue';

//     const logger = pino({ level: 'warn' });

//     beforeEach(async () => {
//         const messagePublisherService = new MessagePublisherService(logger);
//         await messagePublisherService.sendMessage(JSON.stringify('hello world'), testQueueUrl);
//     });

//     describe('SQS sendMessage', () => {
//         it('should be called once', () => {
//             expect(sendMessageSpy).to.be.calledOnce;
//         });

//         it('should be called with the correct parameters', () => {
//             const sqsPayload = {
//                 MessageBody: JSON.stringify('hello world'),
//                 QueueUrl: testQueueUrl
//             };

//             expect(sendMessageSpy.calledWith(sqsPayload)).to.be.true;
//         });
//     });
// });
