import {Navbar} from "react-bootstrap";
import {PageLayout} from "../ButtonsLayout/ButtonsLayout";
import {AuthenticatedTemplate} from "@azure/msal-react";
import {NavLink} from "react-router-dom";

export const RequestNav = () =>{
    return (
        <>
            <Navbar>
                <PageLayout>
                    <div className="link-festo">
                        <NavLink className={"headerHome"} id={"home"} activeClassName={"active"} to="/home">Home</NavLink>
                    </div>
                    <AuthenticatedTemplate>
                        <div className="link-festo">
                            <NavLink to="/NewRequest" className="headerHome" id={"newReq"} activeClassName='active'>New requests</NavLink>
                            <NavLink to="/LearningHistory" id={"learnHis"} className="headerHome" activeClassName='active'>Learning History</NavLink>
                            <NavLink to="/help" className="headerHome" id={"help"} activeClassName='active'>Help</NavLink>
                        </div>
                    </AuthenticatedTemplate>
                </PageLayout>
            </Navbar>
        </>

    )
}