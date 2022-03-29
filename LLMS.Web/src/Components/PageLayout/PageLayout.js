import {useIsAuthenticated, useMsal} from "@azure/msal-react";
import "../../sass/Custom.scss"
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import {Denied} from "../../Pages/Denied";

export const PageLayout = () => {
    const isAuthenticated = useIsAuthenticated();
    const {accounts} = useMsal();
    let role = [];
    if ((accounts[0] && accounts[0].idTokenClaims["roles"]) === undefined){
        role.push('Guest');
    }
    else{
        role.push(accounts[0] && accounts[0].idTokenClaims["roles"][0]);
    }

    console.log(role);


    if (isAuthenticated) {
        if ( role == 'Guest'){
            return(
                <div className="container-fluid">
                    <Header />
                     <Denied />
                    <Footer />
                </div>
            )
        }
        else {
            return (
                <div className="container-fluid">
                    <Header/>
                    <Main/>
                    <Footer/>
                </div>
            )}}
    else{
        return (
            <div className="container-fluid">
                <Header/>
                <Main/>
                <Footer/>
            </div>
        )
    }
}