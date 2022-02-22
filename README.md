# Cloud Resume Website Challenge
 Here is my approach to the Azure Cloud Resume Challenge.

 View my website [here](https://www.aohfcloudtech.com).

## Cloud Resume Website Challange Diagram 

![Diagram](images/Diagram.png)

## Front End

In the FrontEnd folder you will find the resources (HTML,CSS,JavaScript) of the website. The website is static and has a visitor Counter. The Visitor Counter fetches the data via an API call to an Azure Function.

## Back End

The BackEnd consists of an [HTTP trigger using Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhook-trigger?tabs=csharp) with Cosmos DB input and output binding. When the function is triggered, it retrieved the item stored in the DB, add 1 to the item, saves it and returns the value to the caller.

- [Create a Cosmos DB account via the command line](https://docs.microsoft.com/en-us/azure/cosmos-db/sql/cli-samples) or [from the portal](https://docs.microsoft.com/en-us/azure/cosmos-db/sql/create-cosmosdb-resources-portal).
- For the Azure Function, I executed [these commands](CreateAzFunctionResource.txt) to deploy the resource through Azure CLI. As for the defining the functions, I used the Azure portal. You can find the function files [here](./BackEnd/VisitorCounter).
- [How to retrieve a Cosmos DB Item with Functions Binding](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-cosmosdb-v2-input?tabs=powershell#http-trigger-id-query-string-ps).
- [How to write to a Cosmos DB item with Functions Binding](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-cosmosdb-v2-output?tabs=powershell).
- I enabled [Cross-Origin Resource Sharing (CORS)](https://docs.microsoft.com/en-us/azure/azure-functions/functions-how-to-use-azure-function-app-settings?tabs=portal#cors) for the Azure functions to allow the website to make an API Call. 
