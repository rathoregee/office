import {
    Context,
    APIGatewayProxyHandler,
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
} from 'aws-lambda';
import { DatabaseContext } from '../db/DatabaseContext';
const handler: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    const dbcontext = new DatabaseContext();
    const result = await dbcontext.GetComapnies();
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
