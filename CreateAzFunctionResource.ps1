az functionapp create --name GetCounter `
    --resource-group CRWrg `
    --storage-account crstorage92 `
    --consumption-plan-location westus2 `
    --os-type windows `
    --runtime powershell `
    --runtime-version 7.0 `
    --functions-version 3 `
    --disable-app-insights true