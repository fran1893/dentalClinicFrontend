import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userService from "../../_services/userService";
import { DataListTable } from "../../components";

export default function Admin() {
  // HOOKS
  const [users, setUsers] = useState([]);
  const [usersPage, setUsersPage] = useState(1);
  const [usersCount, setUsersCount] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  const isAdmin = authState.userInfo.role == "admin";

  useEffect(() => {
    if (isAdmin) {
      getAllPatients(authState.userToken, usersPage);
    } else {
      navigate("/");
    }
  }, [usersPage]);

  // HANDLERS
  const handleUsersList = (e) => {
    const { page, userId } = e.currentTarget.dataset;

    handleUsersListPagination(page);
    handleSingleUser(userId);
  };

  const handleUsersListPagination = (page) => {
    switch (page) {
      case "next":
        return setUsersPage((page) => page + 1);
      case "prev":
        return setUsersPage((page) => page - 1);
      case "first":
        return setUsersPage(1);
      case "last":
        return setUsersPage(totalPages);
    }
  };

  const handleSingleUser = (id) => {
    console.log(id);
  };

  // FUNCTIONS
  const getAllPatients = async (token, page) => {
    try {
      const response = await userService.getAllPatients(token, page);

      setUsers(response.results);
      setUsersCount(response.info.total_results);
      setTotalPages(response.info.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  const newUsers = (users) =>
    users.map((user) => {
      user.nombre = user.Usuario.nombre
      user.apellidos = user.Usuario.apellidos 
      user.edad = user.Usuario.edad
      user.email = user.Usuario.email
      user.telefono = user.Usuario.telefono
      return user;
    });

  // RETURN
  return (
    <>
      {isAdmin && (
        <>
          <h1>Admin</h1>
          

          <br />

          <DataListTable
            data={newUsers(users)}
            title="Users"
            count={usersCount}
            headers={["ID", "Nombre", "Apellido", "Edad", "Email", "Teléfono"]}
            attributes={["id", "nombre", "apellidos", "edad", "email", "telefono"]}
            pagination={{
              page: usersPage,
              count: usersCount,
              totalPages: totalPages,
            }}
            onChange={handleUsersList}
          />
        </>
      )}
    </>
  );
}
