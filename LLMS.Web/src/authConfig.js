/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";


/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig = {
    auth: {
        clientId: "e6bd4d2e-eda0-4d5c-8163-390ee6487bb7", // This is the ONLY mandatory field that you need to supply.
        authority: "https://login.microsoftonline.com/88b327fb-b21c-4266-9a6c-c37db67c518e", // Defaults to "https://login.microsoftonline.com/common"
        redirectUri: "/", // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
        postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
        mainWindowRedirectUri: "/",
        navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
        cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: []
};

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {
    graphMe: {
        endpoint:  "https://graph.microsoft.com/v1.0/users?$count=true&ConsistencyLevel=eventual&$filter=endswith(mail,%27@kitm.lt%27) or endswith(mail,'@stud.kitm.lt')&$top=999", // gauni userius is KITM AD
        //endpoint: "https://graph.microsoft.com/beta/users/a7faa43c-0917-4deb-a6a9-b78e568ab2fd/appRoleAssignments?$filter=resourceId eq 070c38b3-d8cd-4aae-97b7-e49d01a98507",
        scopes: ["AppRoleAssignment.ReadWrite.All"],
    },
    apiHello: {
        endpoint: "https://localhost:44345/WeatherForecast",
        scopes: ["api://e6bd4d2e-eda0-4d5c-8163-390ee6487bb7/access_as_user"], // e.g. api://xxxxxx/access_as_user
    },
    appUsers:{
        endpoint: "https://graph.microsoft.com/v1.0/servicePrincipals/070c38b3-d8cd-4aae-97b7-e49d01a98507/appRoleAssignedTo?$top=999", // duoda visus app userius
        scopes: ["AppRoleAssignment.ReadWrite.All"]
    }
}
