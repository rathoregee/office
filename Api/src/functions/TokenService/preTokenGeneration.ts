exports.handler = async (event: any, context: any, callback: any) => {
    event.response = {
      claimsOverrideDetails: {
        claimsToAddOrOverride: {
          clientid: "MOHAP99",
          clientname: "MOHE",
        },
      },
    };
  
    // Return to Amazon Cognito
    callback(null, event);
  };
  