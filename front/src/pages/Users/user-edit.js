import React, {useEffect, useState} from "react";

import {useHistory, useParams} from "react-router-dom";

import {NotificationManager} from "react-notifications";
import Swal from "sweetalert2";

import UserService from "../../services/user.service";

import Header from "../../components/Header";
import Loading from "../../components/Loading";
import UserForm from "./user-form";

export default function UserEdit() {

    const {id} = useParams();
    const history = useHistory();

    const [service] = useState(new UserService());
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(null);

    const getUser = () => {
        setLoading(true);
        service.findById(id).then((response) => {
            if (response.data && response.data.id) {
                setUser(response.data);
            } else {
                setTimeout(() => history.push('/users'), 2000);
            }
        }).finally(() => {
            setLoading(false);
        });
    };

    useEffect(getUser, [service]);

    const editUser = (user) => {
        service.editUser(user).then(() => {
            NotificationManager.success('Salvo com sucesso.', 'Ok');
            history.push('/users');
        }).catch((err) => {
            Swal.fire("Atenção", err.response.data.message, "error");
        });
    };

    return (
        <main>
            <Header title="Editar Usuário" icon="pencil"/>

            {loading ? <Loading/> : (
                <div>
                    {user && user.id ?
                        <UserForm user={user} handleSubmit={editUser}/> :
                        <h3 className="text-muted text-center">Usuário não encontrado</h3>
                    }
                </div>
            )}
        </main>
    );

}
