import {Context, APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import { DynamoDB } from 'aws-sdk';
const dynamoDB = new DynamoDB.DocumentClient();
const handler: APIGatewayProxyHandler = async (event : APIGatewayProxyEvent, context : Context) : Promise < APIGatewayProxyResult > => {   
    let response
	const params = {
		TableName: 'Tasks',
		Key: { id: 42 }
	}

	try {
        debugger
		let data  = await dynamoDB.get(params).promise();
        debugger
        response = data.Item;
        debugger
	} catch (e) {
		response = { error: 'task not found' }
	}  
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(response)
    };
};

export { handler };