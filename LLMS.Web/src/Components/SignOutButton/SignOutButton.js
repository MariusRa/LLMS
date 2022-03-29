import React from "react";
import { useMsal } from "@azure/msal-react";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function handleLogout(instance) {
    const redirectLogout = {
        mainWindowRedirectUri: "/",
        postLogoutRedirectUri: "/"
    }
    instance.logoutPopup(redirectLogout).catch(e => {
        console.error(e)
    });
}

/**
 * Renders a button which, when selected, will open a popup for logout
 */
export const SignOutButton = () => {
    const { instance} = useMsal();
    return (
                <a href="#" className="logIn" onClick={() => handleLogout(instance)}><FontAwesomeIcon con className="UserIcon" icon={faUser}> </FontAwesomeIcon> Log out </a>

    );
}
