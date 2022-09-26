// import { handler } from './router';
// import { Context, S3Event, S3EventRecord } from 'aws-lambda';
// import 'mocha';
// import chai from 'chai';
// import sinon from 'sinon';
// import sinonChai from 'sinon-chai';
// import chaiAsPromised from 'chai-as-promised';
// import { LandingZoneService } from '../lib/LandingZoneService';
// import { MessagePublisherService } from '../lib/MessagePublisherService';

// chai.use(sinonChai).use(chaiAsPromised);
// const expect = chai.expect;

// function createS3Event(eventName: string) {
//     return <S3Event>{
//         Records: <S3EventRecord[]>[
//             <S3EventRecord>{
//                 eventName,
//                 s3: {
//                     bucket: {
//                         name: 'bucket'
//                     },
//                     object: {
//                         key: 'abc'
//                     }
//                 }
//             }
//         ]
//     };
// }

// describe('handler', () => {
//     const sandbox = sinon.createSandbox();
//     const context = {} as Context;
//     let callback: sinon.SinonStub;
//     let readFile: sinon.SinonStub;
//     let sendMessage: sinon.SinonStub;

//     beforeEach(async () => {
//         process.env.UPLOAD_ADDRESS_QUEUE_URL = 'sync_upload_address_queue';
//         callback = sandbox.stub();
//         readFile = sandbox.stub(LandingZoneService.prototype, 'readFile')
//             .resolves({
//                 tenantId: '',
//                 nodeAppId: '',
//                 correlationId: '',
//                 body: JSON.stringify({ Payload: { Version: '1.00', EntityChangeRecords: [{ EntityType: 'Address' }]}})
//             });
//         sendMessage = sandbox.stub(MessagePublisherService.prototype, 'sendMessage');
//     });

//     afterEach(() => {
//         sandbox.restore();
//     });

//     for (const testData of [
//         { eventName: 'ObjectCreated:Put', expectedResult: true }
//     ]) {
//         it(`should accept ${testData.eventName} events: ${testData.expectedResult}`, async () => {
//             const s3Event = createS3Event(testData.eventName);
//             await handler(s3Event, context, callback);
//             expect(true).to.be.true;
//             expect(callback).to.not.have.been.called;
//         });
//     }

//     it('should ignore unknown events', async () =>{
//         const s3Event = createS3Event('unknown');
//         await handler(s3Event, context, callback);
//         expect(callback).to.not.have.been.called;
//     });

//     it('should reject if errors thrown by sendMessage', async () => {
//         sendMessage.throws('Test error');
//         const s3Event = createS3Event('ObjectCreated:Put');
//         const promise = handler(s3Event, context, callback);
//         expect(promise).to.eventually.be.rejected;
//         expect(callback).to.not.have.been.called;
//     });

//     it('should reject upload file with missing payload', async () => {
//         readFile.resolves({
//             tenantId: '',
//             nodeAppId: '',
//             correlationId: '',
//             body: '{}'
//         });
//         const s3Event = createS3Event('ObjectCreated:Put');
//         const promise = handler(s3Event, context, callback);
//         expect(promise).to.eventually.be.rejected;
//         expect(callback).to.not.have.been.called;
//     });

//     it('should reject upload file with missing entity change records', async () => {
//         readFile.resolves({
//             tenantId: '',
//             nodeAppId: '',
//             correlationId: '',
//             body: JSON.stringify({ Payload: { Version: '1.00' }})
//         });
//         const s3Event = createS3Event('ObjectCreated:Put');
//         const promise = handler(s3Event, context, callback);
//         expect(promise).to.eventually.be.rejected;
//         expect(callback).to.not.have.been.called;
//     });

//     it('should reject upload file with missing entity type', async () => {
//         readFile.resolves({
//             tenantId: '',
//             nodeAppId: '',
//             correlationId: '',
//             body: JSON.stringify({ Payload: { Version: '1.00', EntityChangeRecords: [{ }]}})
//         });
//         const s3Event = createS3Event('ObjectCreated:Put');
//         const promise = handler(s3Event, context, callback);
//         expect(promise).to.eventually.be.rejected;
//         expect(callback).to.not.have.been.called;
//     });
// });
