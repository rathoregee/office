import {
    Context,
    APIGatewayProxyHandler,
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
} from 'aws-lambda';
import { DatabaseContext } from '../lib/db/DatabaseContext';
const handler: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    debugger;
    const db = new DatabaseContext();
    const result = await db.GetUsers('001');
    console.log(event);
    console.log(context);
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(result),
    };
};

export { handler };
