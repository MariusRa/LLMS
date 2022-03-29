import {Navbar, NavDropdown} from "react-bootstrap";
import {PageLayout} from "../ButtonsLayout/ButtonsLayout";
import {AuthenticatedTemplate} from "@azure/msal-react";
import {NavLink} from "react-router-dom";


export const CordNav = () =>{

    return (
        <>
            <Navbar>
                <PageLayout>
                    <div className="link-festo d-flex flex-row align-items-center">
                        <NavLink className={"headerHome"} id={"home"} activeClassName={"active"} to="/home">Home</NavLink>
                    </div>
                    <AuthenticatedTemplate>

                        <div className="link-festo d-flex flex-row align-items-center">

                            <NavLink to="/NewRequest" id={"newReq"} className="headerHome" activeClassName='active'>New requests</NavLink>

                            <NavDropdown title="Classroom Management" id="nav-dropdown" activeClassName='active' className="headerHome drop">
                                <NavDropdown.Item href={"/role"} className="dropped"><NavLink to="/role" id={"roleManage"} activeClassName='active'>Set Role</NavLink></NavDropdown.Item>
                                <NavDropdown.Item href={"/class"} className="dropped"><NavLink to="/class" activeClassName='active' id={"classMan"}>Classrooms</NavLink></NavDropdown.Item>
                                <NavDropdown.Item href={"/ReqApprove"} className="dropped"><NavLink to="/ReqApprove" id={"ReqApp"} activeClassName='active'>Request Approval</NavLink></NavDropdown.Item>
                            </NavDropdown>

                            <NavLink to="/LearningHistory" id={"learnHis"} className="headerHome" activeClassName='active'>Learning History</NavLink>
                            <NavLink to="/help" className="headerHome" id={"help"} activeClassName='active'>Help</NavLink>
                        </div>



                    </AuthenticatedTemplate>
                </PageLayout>
            </Navbar>
        </>

    )
}