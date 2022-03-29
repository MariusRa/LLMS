import {AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated, useMsal} from "@azure/msal-react";

import {Navbar} from "react-bootstrap";

import {PageLayout} from "../ButtonsLayout/ButtonsLayout";
import {CordNav} from "./Coordinator";
import {StudTeachNav} from "./StudTeach";
import {RequestNav} from "./Requestor";
import {NavLink} from "react-router-dom";

export const NavigationBar = () => {

    const {accounts} = useMsal();
    let role = [];
    if ((accounts[0] && accounts[0].idTokenClaims["roles"]) === undefined){
        role.push('Guest');
    }
    else{
        role.push(accounts[0] && accounts[0].idTokenClaims["roles"]);
    }

    /**
     * Most applications will need to conditionally render certain components based on whether a user is signed in or not.
     * msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will
     * only render their children if a user is authenticated or unauthenticated, respectively.
     */

    if (role == "Coordinator"){
        return (
            <AuthenticatedTemplate>
                <CordNav />
            </AuthenticatedTemplate>

        )
    }else if (role == "Student"){
        return(
            <AuthenticatedTemplate>
                <StudTeachNav />
            </AuthenticatedTemplate>

        )

    }else if (role == "Teacher"){
      return (<AuthenticatedTemplate>
          <StudTeachNav />
      </AuthenticatedTemplate>)
    }else if (role == "Requestor"){
        return (<AuthenticatedTemplate>
            <RequestNav />
        </AuthenticatedTemplate>)
    } else{
        return(
            <UnauthenticatedTemplate>
                <>
                    <Navbar>
                        <PageLayout>
                            <div className="link-festo">
                                <NavLink id={"home"} className={"headerHome"} activeClassName={"active"} to="/home">Home</NavLink>
                            </div>
                        </PageLayout>
                    </Navbar>
                </>
            </UnauthenticatedTemplate>

        )
    }
}



