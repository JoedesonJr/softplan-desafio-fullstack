import React from "react";

import {useHistory} from "react-router-dom";

import Swal from 'sweetalert2'

import UserService from "../../services/user.service";

import Header from "../../components/Header";
import UserForm from "./user-form";

export default function UserNew() {

    const history = useHistory();
    const service = new UserService();

    const initUser = {id: null, name: '', username: '', password: '', role: ''};

    const saveUser = (user, saveAgain) => {
        service.saveUser(user).then(() => {
            successCallback(saveAgain)
        }).catch((err) => {
            Swal.fire("Atenção", err.response.data.message, "error");
        });
    };

    const successCallback = (saveAgain) => {
        Swal.fire({
            title: 'OK',
            text: "Deseja cadastrar um novo usuário ?",
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            confirmButtonColor: '#17a2b8'
        }).then((result) => {
            result.value ? saveAgain() : history.push('/users');
        })
    };

    return (
        <main>
            <Header title="Novo Usuário" icon="user-plus"/>
            <UserForm user={initUser} handleSubmit={saveUser}/>
        </main>
    );

}
