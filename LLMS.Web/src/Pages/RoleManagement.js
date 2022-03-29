import React, {useEffect, useState} from "react";
import {Profile} from "./Profile";
import {ListAppUsers, ListAppUsersR} from "./ListAppUsers";
import {useMsal} from "@azure/msal-react";
import {loginRequest} from "../authConfig";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

const RoleManagement = () => {

    const { instance, accounts} = useMsal();
    const [accessTokenA, setAccessTokenA] = useState(null);
    const [accessTokenB, setAccessTokenB] = useState(null);
    const [postInfo, setPostInfo] = useState(null);
    const [searchTerm, setSearchTerm] = useState("")


    const [newUserTeacher, setNewUserTeacher] = useState({
        UserId: '',
        UserName: '',
        UserEmail: '',
        UserRole: 'Teacher',
    });

    const [newUserRequestor, setNewUserRequestor] = useState({
        UserId: '',
        UserName: '',
        UserEmail: '',
        UserRole: 'Requestor',
    });

    const [userRoleTeacher, setUserRoleTeacher] = useState({
        principalId: '',
        resourceId: '070c38b3-d8cd-4aae-97b7-e49d01a98507',
        appRoleId: '05fb4daa-e373-46d8-82f6-16e8d1e93bfa'
    });

    const [userRoleRequestor, setUserRoleRequestor] = useState({
        principalId: '',
        resourceId: '070c38b3-d8cd-4aae-97b7-e49d01a98507',
        appRoleId: '4d608750-8c60-4ee1-885c-f184562fdb8e'
    });

    const [delUser, setDelUser] = useState({
        delPrincipalID:'',
    })

    let searchHandler = (e) => {
        let lowerCase = e.target.value.toLowerCase();
        setSearchTerm(lowerCase);

    };



    const userHandler = (event) => {
        setUserRoleTeacher(prevState => {
            return {...prevState, principalId: event.target.value}
        })
        setUserRoleRequestor(prevState => {
            return {...prevState, principalId: event.target.value}
        })
        setNewUserTeacher(prevState => {
            return {...prevState, UserId: event.target.value,
                UserName: event.target[event.target.selectedIndex].id,
                UserEmail: event.target[event.target.selectedIndex].label}
        })
        setNewUserRequestor(prevState => {
            return {...prevState, UserId: event.target.value,
                UserName: event.target[event.target.selectedIndex].id,
                UserEmail: event.target[event.target.selectedIndex].label}
        })
    };



    const delHandler = (event) => {
        setDelUser(prevState => {
            return {...prevState, delPrincipalID: event.target.value, roleAsigId: event.target[event.target.selectedIndex].id}
        })
    }

    const apiEndpointUser = 'https://localhost:44345/api/user/adduser';
    const apiEndpointUserDel = `https://localhost:44345/api/user/${delUser.delPrincipalID}`;
    const apiEndpointTeacher = `https://graph.microsoft.com/beta/users/${userRoleTeacher.principalId}/appRoleAssignments`;
    const apiEndpointRequestor = `https://graph.microsoft.com/beta/users/${userRoleRequestor.principalId}/appRoleAssignments`;
    const apiEndpointDel = `https://graph.microsoft.com/beta/users/${delUser.delPrincipalID}/appRoleAssignments/${delUser.roleAsigId}`;

    const bearerA =`Bearer ${accessTokenA}`;
    const bearerB =`Bearer ${accessTokenB}`;

    const optionsUserTeacher = {
        method: "POST",
        headers: {
            'Authorization': bearerB,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserTeacher)
    };

    const optionsUserRequestor = {
        method: "POST",
        headers: {
            'Authorization': bearerB,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserRequestor)
    };

    const optionsTeacher = {
        method: "POST",
        headers: {
            'Authorization': bearerA,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userRoleTeacher)
    };
    const optionsRequestor = {
        method: "POST",
        headers: {
            'Authorization': bearerA,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userRoleRequestor)
    };

    const optionsDelA = {
        method: "DELETE",
        headers: {
            'Authorization': bearerA,
        },
    };

    const optionsDelB = {
        method: "DELETE",
        headers: {
            'Authorization': bearerB,
        },
    };

    const requestA = {
        ...loginRequest,
        account: accounts[0]
    };

    const requestB = {
        ...loginRequest,
        account: accounts[0],
        scopes: ["api://e6bd4d2e-eda0-4d5c-8163-390ee6487bb7/access_as_user"]
    };


    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    useEffect (()=>{
        instance.acquireTokenSilent(requestA).then((response) => {
            setAccessTokenA(response.accessToken);
        }).catch((e) => {
            instance.acquireTokenPopup(requestA).then((response) => {
                setAccessTokenA(response.accessToken);
            });
        })
        instance.acquireTokenSilent(requestB).then((response) => {
            setAccessTokenB(response.accessToken);
        }).catch((e) => {
            instance.acquireTokenPopup(requestB).then((response) => {
                setAccessTokenB(response.accessToken);
            });
        })
    }, []);


    const roleHandlerTeacher = () => {
        fetch(apiEndpointTeacher, optionsTeacher)
            .then(response => response.json())
            .then(data=>setPostInfo(data))
            .catch(error => console.log(error))
            .then(response => fetch(apiEndpointUser, optionsUserTeacher)
                .then(response => response.json())
                .then(data=>setPostInfo(data))
                .catch(error => console.log(error))
                .then(window.location.reload())
            )
    };

    const roleHandlerRequestor = () => {
        fetch(apiEndpointRequestor, optionsRequestor)
            .then(response => response.json())
            .then(data=>setPostInfo(data))
            .catch(error => console.log(error))
            .then(response => fetch(apiEndpointUser, optionsUserRequestor)
                .then(response => response.json())
                .then(data=>setPostInfo(data))
                .catch(error => console.log(error))
                .then(window.location.reload())
            )
    };

    const delRoleHandler =  () => {
        fetch(apiEndpointDel, optionsDelA)
            .then(response => response.json())
            .then(data=>setPostInfo(data))
            .catch(error => console.log(error))
            .then(response =>fetch(apiEndpointUserDel, optionsDelB)
                .then(response => response.json())
                .then(data=>setPostInfo(data))
                .catch(error => console.log(error))
                .then(response => window.location.reload())
            )
    };

    //----------------------------------------------------------

    const select = document.querySelector("#gone")
    const seleDiv = document.querySelector("#seleDiv")

    // showing loading
    if (select === null){

    }else{
        const selectLength = select.length
        if (selectLength === 0){
            seleDiv.classList.add("loading")
            seleDiv.classList.add("display");
            select.classList.remove("display")
            // to stop loading after some time
            setTimeout(() => {
                seleDiv.classList.remove("loading");
                select.classList.add("display")
            }, 2000);

        }
    }


    return(
        <div className={"container"}>
            <div className="cTableHeader">
                <h4 className="hText"> Role Management</h4>
            </div>
            <div className="form-group search">
                <input type="text" className="form-control" id={"ser"} placeholder="Search people" value={searchTerm} onChange={searchHandler}/>
            </div>

            <div className="row">
                <div  className="col-sm">
                    <div id={"seleDiv"} className="form-group">
                        <label className="hLabel"/>
                        <select id={"gone"} size={2} className="form-control formU" onChange={userHandler}>
                            <Profile input={searchTerm}/>
                        </select>
                    </div>
                </div>
                <div className="col-sm d-flex flex-column">
                    <div className="btn-group-vertical align-self-center">
                        <button type="button" id={"Teacher"} className="btn btn-primary" value={"05fb4daa-e373-46d8-82f6-16e8d1e93bfa"} onClick={roleHandlerTeacher}><FontAwesomeIcon icon={faArrowRight} /></button>
                        <button type="button" className="btn btn-outline-secondary" id={"TeacherDel"} onClick={delRoleHandler}><FontAwesomeIcon icon={faArrowLeft} /></button>
                    </div>

                    <div className="btn-group-vertical align-self-center">
                        <button type="button" id={"Requestor"} className="btn btn-primary" value={'4d608750-8c60-4ee1-885c-f184562fdb8e'} onClick={roleHandlerRequestor}><FontAwesomeIcon icon={faArrowRight} /></button>
                        <button type="button" className="btn btn-outline-secondary" id={"RequestorDel"} onClick={delRoleHandler}><FontAwesomeIcon icon={faArrowLeft} /></button>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="form-group">
                        <label className="hLabel">Teachers</label>
                        <select size={2} className="form-control formR" id={"teach"} onChange={delHandler}>
                            <ListAppUsers/>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="hLabel">Requestors</label>
                        <select size={2} className="form-control formR" id={"req"} onChange={delHandler}>
                            <ListAppUsersR/>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoleManagement;