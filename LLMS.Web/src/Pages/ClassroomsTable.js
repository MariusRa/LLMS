import {useEffect, useState} from "react";
import Class from "../Components/Output/Class";
import {useMsal} from "@azure/msal-react";
import {loginRequest} from "../authConfig";

export const ClassroomsTable = () => {
    const { instance, accounts} = useMsal();
    const [accessToken, setAccessToken] = useState(null);

    const [classList, setClassList] = useState([]);

    const bearer =`Bearer ${accessToken}`;
    const apiEndpoint = `https://localhost:44345/api/classroom/`;

    const optionsGet = {
        method: "GET",
        headers: {
            'Authorization': bearer}
    };

    const request = {
        ...loginRequest,
        account: accounts[0],
        scopes: ["api://e6bd4d2e-eda0-4d5c-8163-390ee6487bb7/access_as_user"]
    };

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    useEffect (()=>{
        instance.acquireTokenSilent(request).then((response) => {
            setAccessToken(response.accessToken);
        }).catch((e) => {
            instance.acquireTokenPopup(request).then((response) => {
                setAccessToken(response.accessToken);
            });
        })
    }, []);

    useEffect(() =>{
        fetch(apiEndpoint, optionsGet)
            .then(response => response.json())
            .then(data => setClassList(data))
            .catch(error => console.log(error));
    }, [accessToken])




    const staticClass = classList.map(room => <Class
        id={room.classroomId}
        lang={room.language}
        users={room.users}
        level={room.languageLevel}
        isActive={room.isActive}
    />)


    return (
        <div className={"container"}>
            <div className="cTableHeader d-flex flex-row justify-content-between align-items-center">
                <div>
                    <h4 className="hText"> Classroom creation</h4>
                </div>
                <div>
                    <a href="newClass" className="newClassBtn btn btn-primary">New</a>
                </div>
            </div>
            <table className="table table-bordered table-striped square border">
                <thead className="text-center">
                <tr className={"classTableHead"}>
                    <th width="20%">Language</th>
                    <th width="10%">Student Count</th>
                    <th width="20%">Teacher</th>
                    <th width="5%">Level</th>
                    <th width="10%">Actions</th>
                </tr>
                </thead>
                <tbody className="align-middle">
                {staticClass}
                </tbody>
            </table>
        </div>)
}