using namespace System.Net

# Input bindings are passed in via param block.
param($Request, $TriggerMetadata, $CosmosGet)

# Write to the Azure Functions log stream.
Write-Host "PowerShell HTTP trigger function processed a request."

if(-not $CosmosGet){
    $body = 'VisitorCounter item not found'
    Write-Host $body

    Push-OutputBinding -Name Response -Value ([HttpResponseContext]@{
        StatusCode = [HttpStatusCode]::NotFound
        Body = $body
    })
}
else {
    $visitorCount = $CosmosGet.VisitorCount
    Write-Host "Found VisitorCounter item, current visitorCount: $visitorCount"

    $visitorCount++
    Write-Host "New visitorCount: $visitorCount"

    $responseObject = @{
        VisitorCount = $visitorCount
    }

    $responseJson = ConvertTo-Json -InputObject $responseObject

    Push-OutputBinding -Name CosmosPost -Value @{
        id = $CosmosGet.id
        VisitorCount = $visitorCount
    }

    Push-OutputBinding -Name Response -Value ([HttpResponseContext]@{
        StatusCode = [HttpStatusCode]::OK
        Body = $responseJson
    })
}

