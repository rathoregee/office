import {Context, APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";

const handler: APIGatewayProxyHandler = async (event : APIGatewayProxyEvent, context : Context) : Promise < APIGatewayProxyResult > => {   
    await Promise.resolve('123');
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify('hello world')
    };
};

export { handler };