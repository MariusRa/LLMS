import React from "react";

export const ProfileData = (props) => {
    let names = [];
    let tableRows = [];
    for (let x = 0; x < props.graphData.value.length; x++) {
        if (props.graphData.value[x].mail === null){

        }else{
            names = props.graphData.value[x].mail
        }
        if (props.reqInput?.length >= 2 || props.input?.length >= 2){
            if(names.includes(props.input) || names.includes(props.reqInput)){
                tableRows.push(<option id={props.graphData.value[x].displayName} value={props.graphData.value[x].id}>{props.graphData.value[x].mail}</option>)
            }
        }else{
            tableRows.push(<option id={props.graphData.value[x].displayName} value={props.graphData.value[x].id}>{props.graphData.value[x].mail}</option>)
        }

    }

    return (
        <>
            {tableRows}
        </>
    );
}


export const ListAppUsersData = (props) => {
    let roleId = [];
    let tableRows = [];
    for (let x = 0; x < props.appData.value.length; x++) {
        roleId = props.appData.value[x].appRoleId;

        if (roleId == "05fb4daa-e373-46d8-82f6-16e8d1e93bfa"){
            tableRows.push(<option id={props.appData.value[x].id} value={props.appData.value[x].principalId} label={props.appData.value[x].principalDisplayName}/>)
        }};


    return (
        <>
            {tableRows}
        </>
    )
}

export const ListAppUsersRData = (props) => {
    let roleId = [];
    let tableRows = [];
    for (let x = 0; x < props.appData.value.length; x++) {
        roleId = props.appData.value[x].appRoleId;
        if (roleId == "4d608750-8c60-4ee1-885c-f184562fdb8e"){
            tableRows.push(<option id={props.appData.value[x].id} value={props.appData.value[x].principalId} label={props.appData.value[x].principalDisplayName}/>)
        }}
    return (
        <>
            {tableRows}
        </>
    )
}