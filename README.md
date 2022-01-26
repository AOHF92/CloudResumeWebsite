# Cloud Resume Website Challenge
 Here you will find my solution to the Azure Cloud Resume Challenge.

 View my website [here](https://www.aohfcloudtech.com).


## Prerequisites
- [GitHub Account](https://github.com/join)
- [Azure Account](https://azure.microsoft.com/en-us/free)
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)


## Front End

In the FrontEnd folder you will find the resources (HTML,CSS,JavaScript) of the website. The website is static and has a visitor Counter. The Visitor Counter fetches the data via an API call to an Azure Function.

- I am not a designer at all so I used this [template](https://www.themezy.com/free-website-templates/151-ceevee-free-responsive-website-template) to create my site.
- I'm also not a Javascript dev, however I used this [article](https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data) as reference in making a simple API call.
- I used the following powershell scripts: [BuildAzResources.ps1](BuildAzResources.ps1) and [NewAzCdnProfileandEndpoint.ps1](NewAzCdnProfileandEndpoint.ps1) to deploy Azure Resources needed to host the website.

## Back End

The BackEnd consists of an [HTTP trigger using Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhook-trigger?tabs=csharp) with Cosmos DB input and output binding. When the function is triggered, it retrieved the item stored in the DB, add 1 to the item, saves it and returns the value to the caller.

- [Create a Cosmos DB account via the command line](https://docs.microsoft.com/en-us/azure/cosmos-db/sql/cli-samples) or [from the portal](https://docs.microsoft.com/en-us/azure/cosmos-db/sql/create-cosmosdb-resources-portal).
- For the Azure Function, I executed [these commands](CreateAzFunctionResource.txt) to deploy the resource through Azure CLI. As for the defining the functions, I used the Azure portal. You can find the function files [here](./BackEnd/VisitorCounter).
