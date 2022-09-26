import {
    Context,
    APIGatewayProxyHandler,
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
} from 'aws-lambda';
import Test from '../lib/db/Test';
const handler: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    debugger;
    const db = new Test();
    const result = await db.get();
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
