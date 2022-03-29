import {Profile} from "./Profile";
import React, {useEffect, useState} from "react";
import SemData from "../Data/semData";
import TargetData from "../Data/targetData";
import {Button, Modal} from "react-bootstrap";
import {useMsal} from "@azure/msal-react";
import {loginRequest} from "../authConfig";
import LangData from "../Data/languageData";
import alertify from 'alertifyjs/build/alertify.min'
import {useNavigate} from "react-router-dom";

export const NewRequest = (props) => {

    const navigate = useNavigate()
    const { instance, accounts} = useMsal();
    const [accessToken, setAccessToken] = useState(null);
    const [postInfo, setPostInfo] = useState("");
    const [searchTerm, setSearchTerm] = useState("")
    const [langList, setLang] = useState(LangData);
    const [targetList, setTarget] = useState(TargetData);
    const [semList, setSem] = useState(SemData);
    const [newResponse, setNewResponse] = useState("")

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [newRequest, setNewRequest] = useState({
        StudentName:'',
        StudentId:'',
        Language:'',
        CostCenter:'',
        Target:'',
        Semester:'',
        Comments:'',
        Approval: 'pending'
    });

    const bearer =`Bearer ${accessToken}`;
    const apiEndpoint = `https://localhost:44345/api/request/newrequest`;
    const options = {
        method: "POST",
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRequest)
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


    const staticTarget = targetList.map((we) => {return (<option value={we.target} label={we.target}/>)})
    const staticLang = langList.map((we) => {return (<option value={we.language} label={we.language}/>)})
    const staticSem = semList.map((we) => {return (<option value={we.semester} label={we.semester}/>)})

    const studHandler = (event) => {
        setNewRequest(prevState => {
            return {...prevState, StudentId: event.target.value, StudentName: event.target[event.target.selectedIndex].id, StudentEmail:
                event.target[event.target.selectedIndex].label}
        })
    };

    const langHandler = (event) => {
        setNewRequest(prevState => {
            return {...prevState, Language: event.target.value}
        })
    };

    const costHandler = (event) => {
        setNewRequest(prevState => {
            return {...prevState, CostCenter: event.target.value}
        })
    };

    const targetHandler = (event) => {
        setNewRequest(prevState => {
            return {...prevState, Target: event.target.value}
        })
    };

    const semesterHandler = (event) => {
        setNewRequest(prevState => {
            return {...prevState, Semester: event.target.value}
        })
    };

    const comHandler = (event) => {
        setNewRequest(prevState => {
            return {...prevState, Comments: event.target.value}
        })
    };

    const clearInputs =()=> {
        setNewRequest(()=>{
            return {
                StudentName: '',
                StudentEmail: '',
                StudentId: '',
                Language: '',
                CostCenter:'',
                Target: '',
                Semester: '',
                Comments:'',
                Approval: 'pending'
            }
        })
        clearOptions()
    };

    const clearOptions = () =>{
        let elements = document.getElementById("gone").options
        for(let i = 0; i < elements.length; i++){
            elements[i].selected = false;
        }
    }

    const submitHandler = (event)=>{
        event.preventDefault();

       fetch(apiEndpoint, options)
            .then(response => response.json())
            .then(data => {
                    if (data?.status === 404)
                    {
                        alertify.warning('Request exists')
                        clearOptions()
                    }else{
                        alertify.success('Request Created')
                        clearInputs()
                    }
            })
            .catch(error => console.log(error))
    };

    console.log(newRequest)

    const deleteHandler =()=>{
        setShow(false);
        clearInputs()
    };

    let searchHandler = (e) => {
        let lowerCase = e.target.value.toLowerCase();
        setSearchTerm(lowerCase);

    };

    //---------------------------------------------------------

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
                <h4 className="hText"> New Request</h4>
            </div>
            <div className="form-group search">
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search people" value={searchTerm} onChange={searchHandler}/>
            </div>
            <form onSubmit={submitHandler}>
                <div className="form-group row">
                    <div className="col-sm">
                        <div id={"seleDiv"} className="form-group">
                            <label className="hLabel" />
                            <select id={"gone"} size={2} required className="form-control formU" onChange={studHandler}>
                                <Profile reqInput={searchTerm}/>
                            </select>
                        </div>
                    </div>
                    <div className="selectDiv col-sm ">
                        <div id={"loading"}/>
                        <div className="nRDiv form-group d-flex flex-row align-items-center">
                            <label className="col-4">Language</label>
                            <select className="form-select w-50" id={"lang"} required value={newRequest.Language} onChange={langHandler}>
                                <option value="">Select language</option>
                                {staticLang}
                            </select>
                        </div>
                        <div className="nRDiv form-group d-flex flex-row align-items-center">
                            <label className="col-4">Cost Center</label>
                            <div className="col-4 w-50">
                                <input type="number" min="0" max="9999999999" required className="form-control" id="inputList" value={newRequest.CostCenter} onChange={costHandler}/>
                            </div>
                        </div>
                        <div className="nRDiv form-group d-flex flex-row align-items-center">
                            <label className="col-4">Target</label>
                            <select className="form-select w-50" value={newRequest.Target} id={"targ"} required onChange={targetHandler}>
                                <option value="">Select target</option>
                                {staticTarget}
                            </select>
                        </div>
                        <div className="nRDiv form-group d-flex flex-row align-items-center">
                            <label className="col-4">Semester</label>
                            <select className="form-select w-50" required value={newRequest.Semester} id={"sem"} onChange={semesterHandler}>
                                <option value="">Select semester</option>
                                {staticSem}
                            </select>
                        </div>
                    </div>
                    <div className="col-sm buttonDiv">
                        <div className="nRCDiv form-group align-items-center">
                            <label className="hLabel">Comments</label>
                            <textarea type="text" className="form-control commentForm" maxLength="100" id={"com"} value={newRequest.Comments} onChange={comHandler}/>
                        </div>
                        <div className="form-group">
                            <div className="nRCBDiv form-check">
                                <input className="form-check-input" type="checkbox" value=""/>
                                <label className="form-check-label" htmlFor="defaultCheck1">
                                    Would like to get notifications
                                </label>
                            </div>
                            <div className="nRBDiv btn-group align-self-center w-100">
                                <button type="submit" className="btn btn-primary" id={"sav"} >Save</button>
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
            </form>



            <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css"/>
            <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css"/>
        </div>
    )
}