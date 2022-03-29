import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Profile } from "../../Pages/Profile";
import "../../sass/Custom.scss"
import {Home} from "../../Pages/Home";
import {Start} from "../../Pages/Start";
import {useMsal} from "@azure/msal-react";
import {Help} from "../../Pages/Help";
import {NewRequest} from "../../Pages/NewRequest";
import {LearningHistory} from "../../Pages/LearningHistory";
import {ReqApprove} from "../../Pages/ReqApprove";
import RoleManagement from "../../Pages/RoleManagement";
import {ListAppUsers} from "../../Pages/ListAppUsers";
import {ClassroomsTable} from "../../Pages/ClassroomsTable";
import EditClass from "../../Pages/EditClass";
import NewClass from "../../Pages/NewClass";

const Pages = () => {

    const {accounts} = useMsal();

    let role = [];
    if ((accounts[0] && accounts[0].idTokenClaims["roles"]) === undefined){
        role.push('Guest');
    }
    else{
        role.push(accounts[0] && accounts[0].idTokenClaims["roles"]);
    }

    if (role == "Coordinator"){

        return (

            <Routes>
                <Route path="/home" element={<Home />}/>
                <Route path="/NewRequest" element={<NewRequest />}/>
                <Route path="/LearningHistory" element={<LearningHistory />}/>
                <Route path="/help" element={<Help />}/>
                <Route path="/" element={<Start />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/ReqApprove" element={ <ReqApprove />}/>
                <Route path="/ListAppUsers" element={ <ListAppUsers />}/>
                <Route path="/role" element={<RoleManagement/>}/>
                <Route path="/class" element={<ClassroomsTable/>}/>
                <Route path="/newClass" element={<NewClass/>}/>
                <Route path="/editClass/:id" element={<EditClass/>}/>
            </Routes>

        )}else if(role == "Requestor"){
        return  (<Routes>
            <Route path="/home" element={<Home />}/>
            <Route path="/NewRequest" element={<NewRequest />}/>
            <Route path="/LearningHistory" element={<LearningHistory />}/>
            <Route path="/help" element={<Help />}/>
            <Route path="/" element={<Start />}/>
        </Routes>)
    }else if (role == "Student") {
        return (<Routes>
            <Route path="/home" element={<Home />}/>
            <Route path="/LearningHistory" element={<LearningHistory />}/>
            <Route path="/help" element={<Help />}/>
            <Route path="/" element={<Start />}/>
        </Routes>)

    }else if (role == "Teacher"){
        return (<Routes>
            <Route path="/home" element={<Home />}/>
            <Route path="/LearningHistory" element={<LearningHistory />}/>
            <Route path="/help" element={<Help />}/>
            <Route path="/" element={<Start />}/>
        </Routes>)
    }else{
        return (<Routes>
            <Route path="/home" element={<Home />}/>
            <Route path="/" element={<Start />}/>
        </Routes>)
    }

}

const Main = () =>{
    return(<main className="mainPage d-flex flex-column min-vh-100">
            <Pages/>
        </main>
    )

}
export default Main