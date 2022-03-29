import {Button, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useMsal} from "@azure/msal-react";
import {loginRequest} from "../../authConfig";


const Class = (props) => {
    const { instance, accounts} = useMsal();
    const [accessToken, setAccessToken] = useState(null);
    const [postInfo, setPostInfo] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [active, setActive] = useState({
        isActive: false
    })
    const bearer =`Bearer ${accessToken}`;
    const apiEndpointPut = `https://localhost:44345/api/classroom/${props.id}`;

    const optionsPut = {
        method: "PUT",
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(active)
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



    const deleteHandler =()=>{
        setShow(false);
        fetch(apiEndpointPut, optionsPut)
            .then(response => response.json())
            .then(data=>setPostInfo(data))
            .catch(error => console.log(error))
            .then(window.location.reload(false))

    };

    const editHandler = () => {
        window.location.href=`editClass/${props.id}`
    };

    let student = [];
    for (let x =0; x < props.users.length; x++){
        if(props.users[x].userRole === "Student"){
            student.push(props.users[x].userName);
        }
    }

    let teacher = [];
    for (let x =0; x < props.users.length; x++){
        if(props.users[x].userRole === "Teacher"){
            teacher.push(props.users[x].userName);
        }
    }

    let actions;
    if(props.isActive === true){
        actions =
            <td className="btn-group w-100">
                <button className="btn btn-primary" onClick={editHandler}>Edit</button>
                <button className="btn btn-outline-secondary" onClick={handleShow}>Delete</button>
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
            </td>
    }
    else if (props.isActive === false){
        actions =
            <td className="btn-group w-100">
                <button className="btn btn-outline-secondary disabled" >Edit</button>
                <button className="btn btn-outline-secondary disabled" onClick={handleShow}>Delete</button>
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
            </td>
    }

    return(
        <tr>
            <td>{props.lang}</td>
            <td className="text-center">{student.length}</td>
            <td>{teacher}</td>
            <td className="text-center">{props.level}</td>
            {actions}
        </tr>
    )
}

export default Class