import "react-bootstrap"
import {useEffect, useState} from "react";
import Request from "../Components/Output/Request";
import {loginRequest} from "../authConfig";
import {useMsal} from "@azure/msal-react";

export const ReqApprove = () => {
    const { instance, accounts} = useMsal();
    const [accessToken, setAccessToken] = useState(null);

    const [requestList, setRequest] = useState([])

    const bearer =`Bearer ${accessToken}`;
    const apiEndpoint = `https://localhost:44345/api/request/requests`;

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

    useEffect(()=>{
        fetch(apiEndpoint, optionsGet)
            .then(response => response.json())
            .then(data => setRequest(data))
            .catch(error => console.log(error));
    }, [accessToken])




    const staticRequest = (requestList.map(
        req => <Request id={req.requestId}
                        person={req.studentName}
                        personId={req.studentId}
                        personEmail={req.studentEmail}
                        language={req.language}
                        cost={req.costCenter}
                        target={req.target}
                        sem={req.semester}
                        com={req.comments}
                        approve={req.approval}
        />))

    //console.log(staticRequest);
    return (
        <div className={"container"}>
            <div className="cTableHeader">
                <h4 className="hText"> New Request Approval</h4>
            </div>
            <table className="table table-bordered table-striped square border">
                <thead className="text-center">
                <tr className={"reqStudentRow"}>
                    <th width="15%">Person</th>
                    <th width="5%">Language</th>
                    <th width="8%">Cost Centre</th>
                    <th width="5%">Target</th>
                    <th width="10%">Semester</th>
                    <th width="20%">Comments</th>
                    <th width="5%">Actions</th>
                </tr>
                </thead>
                <tbody className="align-middle">
                {staticRequest}
                </tbody>
            </table>
        </div>)

}
