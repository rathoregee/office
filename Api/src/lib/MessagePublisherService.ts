// import { SQS } from 'aws-sdk';
// import pino from 'pino';

// export class MessagePublisherService {
//     logger: pino.Logger;

//     constructor(logger: pino.Logger) {
//         this.logger = logger;
//     }

//     public async sendMessage(entity: string, queueUrl: string): Promise<void> {
//         const sqs = new SQS({ apiVersion: '2012-11-05' });
//         const sqsPayload = {
//             MessageBody: entity,
//             QueueUrl: queueUrl
//         };

//         this.logger.debug(`Sending Message to SQS QueueUrl: ${queueUrl}`);
//         await sqs.sendMessage(sqsPayload).promise();
//         this.logger.info(`Sent Message to SQS QueueUrl: ${queueUrl}`);
//     }
// }
