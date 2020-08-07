import React, {useEffect, useState} from "react";

import FontAwesome from "react-fontawesome";
import Loading from "../../components/Loading";

import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";

export default function UserList(props) {

    const authService = new AuthService();

    const [service] = useState(new UserService());
    const [currentUser] = useState(authService.getLoggedUser());
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(null);

    const getUsers = () => {
        setLoading(true);
        service.findAll().then((response) => {
            setUsers(formatter(response.data));
        }).finally(() => {
            setLoading(false);
        });
    };

    const formatter = (users) => {
        users.forEach(user => {
            user.role = user.role.replace("ROLE_", "");
            user.createdDate = new Date(user.createdDate).toLocaleDateString();
        });
        return users;
    };

    const setUsersLength = () => props.length(users.length);

    useEffect(getUsers, [service]);

    useEffect(setUsersLength, [users]);

    return (
        <main>
            {loading ? <Loading/> :
                <div>
                    <table className="table table-hover table-sm mb-0">
                        <thead>
                            <tr className="table-active">
                                <th className="pt-2 pb-2 text-center">#</th>
                                <th className="pt-2 pb-2">Nome</th>
                                <th className="pt-2 pb-2">Login</th>
                                <th className="pt-2 pb-2">Perfil</th>
                                <th className="pt-2 pb-2">Criado em</th>
                                <th className="pt-2 pb-2 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ?
                                (users.map((user, i) => (
                                    <tr key={user.id}>
                                        <td width="10%" className="align-middle text-center">{i + 1}</td>
                                        <td width="35%" className="align-middle text-uppercase">{user.name}</td>
                                        <td width="20%" className="align-middle">{user.username}</td>
                                        <td width="15%" className="align-middle">
                                            <span className="badge badge-secondary">{user.role}</span>
                                        </td>
                                        <td className="align-middle">{user.createdDate}</td>
                                        <td width="20%" className="text-center">
                                            <button type="button" className="btn btn-outline-success mr-2" placeholder="Editar Usuário"
                                                    onClick={() => props.editUser(user.id)}>
                                                <FontAwesome name="pencil"/>
                                            </button>
                                            {user.id != currentUser.id ? (
                                                <button type="button" className="btn btn-outline-danger" placeholder="Excluir Usuário"
                                                        onClick={() => props.deleteUser(user.id, getUsers)} disabled={user.id == currentUser.id}>
                                                    <FontAwesome name="trash"/>
                                                </button>
                                            ) : ('')}
                                        </td>
                                    </tr>
                                ))) : (
                                    <tr>
                                        <td colSpan={6}>
                                            <h5 className="text-center text-muted m-3">Não há usuários cadastrados</h5>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <hr className="mt-0"/>
                </div>
            }
        </main>
    );

}
