export const callApiWithToken = async(accessToken, apiEndpoint) => {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;


    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(apiEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));

    // const options = {
    //     authProvider,
    // };
    //
    // const client = Client.init(options);
    //
    // const appRoleAssignment = {
    //     principalId: 'cde330e5-2150-4c11-9c5b-14bfdc948c79',
    //     resourceId: '8e881353-1735-45af-af21-ee1344582a4d',
    //     appRoleId: '00000000-0000-0000-0000-000000000000'
    // };
    //
    // await client.api('/users/cde330e5-2150-4c11-9c5b-14bfdc948c79/appRoleAssignments')
    //     .post(appRoleAssignment);


}
