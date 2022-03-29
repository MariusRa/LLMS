import { useEffect, useState } from "react";

import { MsalAuthenticationTemplate, useMsal, useAccount } from "@azure/msal-react";
import { InteractionRequiredAuthError, InteractionType } from "@azure/msal-browser";

import { loginRequest, protectedResources } from "../authConfig";
import { callApiWithToken } from "../fetch";
import {ListAppUsersData, ListAppUsersRData} from "../Components/DataDisplay/DataDisplay";

const ListAppUsersContent = () => {

    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [appData, setAppData] = useState(null);

    useEffect(() => {
        if (account && inProgress === "none" && !appData) {
            instance.acquireTokenSilent({
                scopes: protectedResources.appUsers.scopes,
                account: account
            }).then((response) => {
                callApiWithToken(response.accessToken, protectedResources.appUsers.endpoint)
                    .then(response => setAppData(response));
            }).catch((error) => {
                // in case if silent token acquisition fails, fallback to an interactive method
                if (error instanceof InteractionRequiredAuthError) {
                    if (account && inProgress === "none") {
                        instance.acquireTokenPopup({
                            scopes: protectedResources.appUsers.scopes,
                        }).then((response) => {
                            callApiWithToken(response.accessToken, protectedResources.appUsers.endpoint)
                                .then(response => setAppData(response));
                        }).catch(error => console.log(error));
                    }
                }
            });
        }
    }, [account, inProgress, instance]);

    return (
        <>
            { appData ? <ListAppUsersData appData={appData} /> : null }
        </>
    );
};

export const ListAppUsers = () => {
    const authRequest = {
        ...loginRequest
    };

    return (
        <MsalAuthenticationTemplate
            interactionType={InteractionType.Redirect}
            authenticationRequest={authRequest}
        >
            <ListAppUsersContent />
        </MsalAuthenticationTemplate>
    )
};

const ListAppUsersReq = () => {

    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [appData, setAppData] = useState(null);

    useEffect(() => {
        if (account && inProgress === "none" && !appData) {
            instance.acquireTokenSilent({
                scopes: protectedResources.appUsers.scopes,
                account: account
            }).then((response) => {
                callApiWithToken(response.accessToken, protectedResources.appUsers.endpoint)
                    .then(response => setAppData(response));
            }).catch((error) => {
                // in case if silent token acquisition fails, fallback to an interactive method
                if (error instanceof InteractionRequiredAuthError) {
                    if (account && inProgress === "none") {
                        instance.acquireTokenPopup({
                            scopes: protectedResources.appUsers.scopes,
                        }).then((response) => {
                            callApiWithToken(response.accessToken, protectedResources.appUsers.endpoint)
                                .then(response => setAppData(response));
                        }).catch(error => console.log(error));
                    }
                }
            });
        }
    }, [account, inProgress, instance]);

    return (
        <>
            { appData ? <ListAppUsersRData appData={appData} /> : null }
        </>
    );
};

export const ListAppUsersR = () => {
    const authRequest = {
        ...loginRequest
    };

    return (
        <MsalAuthenticationTemplate
            interactionType={InteractionType.Redirect}
            authenticationRequest={authRequest}
        >
            <ListAppUsersReq />
        </MsalAuthenticationTemplate>
    )
};
