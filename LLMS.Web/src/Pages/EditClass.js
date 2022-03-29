import React, {useEffect, useState} from "react";

import {Button, Modal} from "react-bootstrap";
import LangData from "../Data/languageData";
import languageLevelData from "../Data/languageLevelData";
import {useMsal} from "@azure/msal-react";
import {loginRequest} from "../authConfig";
import {useNavigate, useParams} from "react-router-dom";

const EditClass = (props) => {
    const { instance, accounts} = useMsal();
    const [accessToken, setAccessToken] = useState(null);
    const [postInfo, setPostInfo] = useState(null);

    const [langList, setLang] = useState(LangData);
    const [levelList, setLevel] = useState(languageLevelData);


    const [requestList, setRequest] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [classroom, setClassroom] = useState({

    });

    const {id} = useParams()

    const bearer =`Bearer ${accessToken}`;
    const apiEndpoint = `https://localhost:44345/api/user/getusers`;
    const apiEndpointPost = 'https://localhost:44345/api/classroom/newclassroom';
    const apiEndpointGet = `https://localhost:44345/api/classroom/${id}`;
    const apiEndpointDelete = `https://localhost:44345/api/classroom/${id}`;


    const optionsGet = {
        method: "GET",
        headers: {
            'Authorization': bearer}
    };

    const optionsPost = {
        method: "POST",
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(classroom)
    };

    const optionsDel = {
        method: "DELETE",
        headers: {
            'Authorization': bearer,
        },
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
        fetch(apiEndpointGet, optionsGet)
            .then(response => response.json())
            .then(data => setClassroom(data))
            .catch(error => console.log(error));
    }, [accessToken])

    const staticLang = langList.map((we) => {return (<option value={we.language} label={we.language}/>)})
    const staticLevel = levelList.map((we) => {return (<option value={we.level} label={we.level}/>)})
    const staticRequest = requestList.filter((we) => {
        if(searchTerm == "" || searchTerm.length <= 2){
            return we
        } else if (we.userName.toLowerCase().includes(searchTerm.toLowerCase())){
            return we
        }
    }).map((we) => {return (<option id={we.userRole} value={we.userId}> {we.userName} ({we.userRole}) </option>)})



    const deleteHandler = () => {
        setShow(false);
        navigate("/class")
    };

    let searchHandler = (event) => {
        setSearchTerm(event.target.value);
    };


    const langHandler = (event) => {
        setClassroom(prevState => {
            return {...prevState, language: event.target.value}
        })
    };

    const levelHandler = (event) => {
        setClassroom(prevState => {
            return {...prevState, languageLevel: event.target.value}
        })
    };

    const userHandler = (event) => {
        const userId = event.target.value
        const userName = event.target[event.target.selectedIndex].label
        const userRole = event.target[event.target.selectedIndex].id
        setClassroom(prevState => {
            return{...prevState, users: [...prevState.users, {userId, userName, userRole}]}
        })
    }

    const delUserHandler = (event) => {
        const userId = event.target.value
        console.log(userId)
        setClassroom({...classroom, users: classroom.users.filter((x => x.userId !== userId))})
    }

    const clearOptions = () =>{
        let elements = document.getElementById("pep").options
        for(let i = 0; i < elements.length; i++){
            elements[i].selected = false;
        }
    }

    let student = [];
    let teacher = [];
    for (let x =0; x < classroom?.users?.length; x++){
        if(classroom.users[x].userRole === "Student"){
            student.push(<option id={classroom.users[x].userRole} value={classroom.users[x].userId} label={classroom.users[x].userName}/>);
            clearOptions()
        }
        else if (classroom.users[x].userRole === "Teacher"){
            teacher.push(<option id={classroom.users[x].userRole} value={classroom.users[x].userId} label={classroom.users[x].userName}/>);
        }
    }

    const navigate = useNavigate()


    const saveHandler = () => {
        fetch(apiEndpointDelete, optionsDel)
            .then(response => response.json())
            .then(data=>setPostInfo(data))
            .catch(error => console.log(error))
            .then(response => fetch(apiEndpointPost, optionsPost)
                .then(response => response.json())
                .then(data=>setPostInfo(data))
                .catch(error => console.log(error)))
            .then(response => navigate("/class"));
    };

    return (
        <div className={"container"}>
            <div className="cTableHeader">
                <h4 className="hText"> Edit Classroom</h4>
            </div>
                <div className="row">
                    <div className="col-sm ">
                        <div className="classSDiv form-group  align-items-center">
                            <label className="hLabel col-8">Language</label>
                            <select className="form-select w-75" value={classroom.Language} id={"lang"} onChange={langHandler}>
                                <option value="">{classroom.language}</option>
                                {staticLang}
                            </select>
                        </div>
                        <div className="form-group  align-items-center">
                            <label className="hLabel col-8">Language level</label>
                            <select className="form-select w-50" value={classroom.LanguageLevel} id={"langLev"} onChange={levelHandler}>
                                <option value="">{classroom.languageLevel}</option>
                                {staticLevel}
                            </select>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="form-group">
                            <input type="text" className="form-control " placeholder="Search people" id={"ser"} value={searchTerm} onChange={searchHandler}/>
                        </div>
                        <div className="form-group">
                            <label className="hLabel"></label>
                            <select multiple className="form-control formU" id={"pep"} onChange={userHandler}>
                                {staticRequest}
                            </select>
                        </div>
                    </div>
                    <div className="col-sm d-flex flex-column">
                    </div>
                    <div className="col-sm">
                        <div className="form-group classForm">
                            <label className="hLabel">Students</label>
                            <select size={2} className="form-control formR" id={"stud"} onChange={delUserHandler}>
                                {student}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="hLabel">Teachers</label>
                            <select size={2} className="form-control formR" id={"teach"} onChange={delUserHandler}>
                                {teacher}
                            </select>
                        </div>
                        <div className="nRBDiv btn-group align-self-center w-100">
                            <button type="submit" className="btn btn-primary" id={"sac"} onClick={saveHandler}>Save</button>
                            <button type="button" className="btn btn-outline-secondary" id={"canc"} onClick={handleShow}>Cancel</button>
                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Alert</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Do you really want to delete this element?
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        No
                                    </Button>
                                    <Button variant="primary" onClick={deleteHandler}>Yes</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default EditClass
