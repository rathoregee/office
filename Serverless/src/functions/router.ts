import {Context, APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';

const handler: APIGatewayProxyHandler = async (event : APIGatewayProxyEvent, context : Context) : Promise < APIGatewayProxyResult > => {   
    debugger
    await Promise.resolve('123');
    console.log(event);
    console.log(context);
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify('hello world')
    };
};

export { handler };