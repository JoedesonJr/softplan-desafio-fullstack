import React, {useState} from "react";

import {useHistory} from "react-router-dom";

import {NotificationManager} from "react-notifications";
import FontAwesome from "react-fontawesome";
import Swal from "sweetalert2";

import UserService from "../../services/user.service";

import UserList from "./user-list";
import Header from "../../components/Header";

export default function Users() {

    const history = useHistory();

    const [service] = useState(new UserService());
    const [usersLength, setUsersLength] = useState(0);

    const newUser = () => history.push('/users/new');

    const editUser = (id) => history.push('/users/edit/' + id);

    const deleteUser = (id, callback) => {
        Swal.fire({
            text: "Deseja realmente deletar este usuário ?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            confirmButtonColor: '#17a2b8'
        }).then((result) => {
            if (result.value) {
                service.deleteById(id).then(() => {
                    NotificationManager.success('Deletado com sucesso.', 'Ok');
                    callback();
                });
            }
        });
    };

    return (
        <main>
            <Header title="Gerenciar Usuários" icon="users"/>

            <div className="row align-items-center mb-3">
                <div className="col">
                    <button type="button" className="btn btn-info" onClick={newUser}>
                        <FontAwesome className="mr-1" name="plus"/> Novo Usuário
                    </button>
                </div>
                <div className="col-md-auto text-muted">
                    <FontAwesome className="mr-1" name="calculator"/> Total de {usersLength} usuário(s)
                </div>
            </div>

            <UserList editUser={editUser} deleteUser={deleteUser} length={setUsersLength}/>
        </main>
    );

}
