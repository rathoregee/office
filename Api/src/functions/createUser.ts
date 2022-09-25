import {
    APIGatewayProxyHandler,   
    APIGatewayProxyResult,
} from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
const dynamoDB = new DynamoDB.DocumentClient();
const handler: APIGatewayProxyHandler = async (
    
): Promise<APIGatewayProxyResult> => {
    let response;
    const params = {
        TableName: 'Tasks',
        Key: { id: 42 },
    };

    try {
        const data = await dynamoDB.get(params).promise();

        response = data.Item;
    } catch (e) {
        response = { error: 'task not found' };
    }
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(response),
    };
};

export { handler };
