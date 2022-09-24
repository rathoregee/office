// import { S3Handler, S3Event, Context } from 'aws-lambda';
// import pino from 'pino';
// import { LandingZoneService } from '../lib/LandingZoneService';
// import { EntityRouteMappingService } from '../lib/EntityRouteMappingService';
// import { MessagePublisherService } from '../lib/MessagePublisherService';
// import { EntityChangeRecord } from '../lib/DataTypes';


// const logDest = pino.destination({ sync: false });

// const baseLogger = pino({
//     base: {
//         memorySize: process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE,
//         region: process.env.AWS_REGION,
//         runtime: process.env.AWS_EXECUTION_ENV
//     },
//     name: process.env.AWS_LAMBDA_FUNCTION_NAME,
//     level: process.env.LOG_LEVEL || 'info'
//     // useLevelLabels: true,
// }, logDest);

// const handler: S3Handler = async (event: S3Event, context: Context) => {
//     console.log('EVENTS RECORDS DATA', JSON.stringify(event.Records));
//     for (const message of event.Records) {
//         console.log('MESSAGE DATA', JSON.stringify(message));
//         let logger = baseLogger.child({
//             awsRequestId: context.awsRequestId,
//             bucketName: message.s3.bucket.name,
//             objectKey: message.s3.object.key,
//             objectEtag: message.s3.object.eTag
//         });

//         logger.info({
//             eventName: message.eventName,
//             eventSource: message.eventSource,
//             eventTime: message.eventTime,
//             bucketArn: message.s3.bucket.arn,
//             objectSize: message.s3.object.size
//         },
//         'Processing s3 event %s for %s',
//         message.eventName,
//         message.s3.object.key);

//         if (message.eventName != 'ObjectCreated:Put') {
//             continue;
//         }
//         try {
//             const landingZoneService = new LandingZoneService(logger);
//             const Bucket = message.s3.bucket.name;
//             const Key = message.s3.object.key;

//             const { body, tenantId, nodeAppId, correlationId } = await landingZoneService.readFile(Bucket, Key);

//             logger = logger.child({
//                 tenantId: tenantId,
//                 correlationId: correlationId
//             });

//             const entityRouteMappingService = new EntityRouteMappingService(logger);
//             const messagePublisherService = new MessagePublisherService(logger);
//             const entityChangeRecords = getEntityChangeRecords(body, logger);
//             console.log('ENTITY CHANGE RECORDS', JSON.stringify(entityChangeRecords));
//             for (const entityRecord of entityChangeRecords) {
//                 const entityType = getFileEntityType(entityRecord);
//                 console.log('ENTITY TYPE', JSON.stringify(entityType));
//                 console.log('ENTITY TYPE LENGTH', JSON.stringify(entityType.length));
//                 console.log('MAIN RECORD DATA', JSON.stringify(entityRecord));
//                 const routeMapping = await entityRouteMappingService.lookupRouteFromEntityType(entityType);
//                 console.log('ROUTE MAPPING DATA', JSON.stringify(routeMapping));
//                 const messagePayload = new ElementsMessage(
//                     entityRecord,
//                     new ElementsMessageMeta({
//                         correlationId: correlationId,
//                         version: '1',
//                         type: `sync.${entityType}.upload`,
//                         tenantId: tenantId,
//                         nodeAppId: nodeAppId,
//                         source: 'sync-router-func'
//                     })
//                 );

//                 await messagePublisherService.sendMessage(JSON.stringify(messagePayload), routeMapping.queueUrl);
//                 logger.debug(`Sent sync.${entityType}.upload message - ${JSON.stringify(messagePayload)}, to queue - ${routeMapping.queueUrl}`);
//             }
//         }
//         catch (e) {
//             logger.error({ error: {
//                 ...e,
//                 name: e.name,
//                 message: e.message
//             } }, `error: ${e}`);
//             logger.flush();
//             logDest.flushSync();
//             return Promise.reject(JSON.stringify({
//                 status: 500,
//                 body: 'Error'
//             }));
//         }
//         logger.flush();
//     }
//     logDest.flushSync();
//     return;
// };

// const getEntityChangeRecords = function(file: string, logger: pino.Logger): EntityChangeRecord[] {
//     logger.debug('Validating upload file');
//     const uploadFileJson = JSON.parse(file);
//     if (!uploadFileJson.Payload) {
//         throw new Error('Upload file missing payload');
//     }

//     const entityChangeRecords: EntityChangeRecord[] = uploadFileJson.Payload.EntityChangeRecords as EntityChangeRecord[];
//     if (entityChangeRecords == null)
//     {
//         throw new Error('Upload file missing entity change records');
//     }

//     logger.debug(`Payload version ${uploadFileJson.Payload.Version}`);
//     logger.debug(`Found ${entityChangeRecords.length} entity change records`);

//     return entityChangeRecords;
// };

// const getFileEntityType = function (entityRecord: EntityChangeRecord) {
//     if (!entityRecord.EntityType) {
//         throw new Error('EntityType field not found in file');
//     }
//     return entityRecord.EntityType;
// };

// export { handler };
