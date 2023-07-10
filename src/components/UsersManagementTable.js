import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Container,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { RiAdminLine } from "react-icons/ri";

function UsersManagementTable() {
  const [users, setUsers] = useState([]);
  const [currentAdminId, setCurrentAdminId] = useState(""); // State to store the ID of the current admin

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    try {
      axios.get("http://localhost:5001/users").then((response) => {
        setUsers(response.data);
      });
    } catch (error) {
      console.log("Error while fetching data from backend");
    }
  };

  useEffect(() => {
    // Fetch the current admin's ID
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5001/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const user = response.data.user;
          setCurrentAdminId(user.id); // Set the current admin's ID
        })
        .catch((error) => {
          console.log("Error fetching user data:", error);
        });
    }
  }, []);

  const handleDelete = (userId) => {
    axios
      .delete(`http://localhost:5001/users/${userId}`)
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.log("Error while deleting user", error);
      });
  };

  const handleMakeAdmin = (userId) => {
    axios
      .put(`http://localhost:5001/users/${userId}`, { role: "admin" })
      .then(() => {
        const updatedUsers = users.map((user) => {
          if (user.id === userId) {
            return { ...user, role: "admin" };
          }
          return user;
        });

        setUsers(updatedUsers);
      })
      .catch((error) => console.log("Error while updating user role", error));
  };

  const handleMakeUser = (userId) => {
    axios
      .put(`http://localhost:5001/users/${userId}`, { role: "regular" })
      .then(() => {
        const updatedUsers = users.map((user) => {
          if (user.id === userId) {
            return { ...user, role: "regular" };
          }
          return user;
        });
        setUsers(updatedUsers);
      })
      .catch((error) => console.log("Error while updating user role", error));
  };

  const renderDeleteTooltip = (props) => (
    <Tooltip id="delete-tooltip" {...props}>
      Remove user completely
    </Tooltip>
  );

  const renderRegularTooltip = (props) => (
    <Tooltip id="regular-tooltip" {...props}>
      Make regular user
    </Tooltip>
  );

  const renderAdminTooltip = (props) => (
    <Tooltip id="admin-tooltip" {...props}>
      Give admin rights to user
    </Tooltip>
  );

  return (
    <React.Fragment>
      <Container className="w-80">
        <Table
          className="mt-4 user-select-none"
          responsive
          striped
          bordered
          hover
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="col-5">{user.name}</td>
                <td className="col-4">{user.email}</td>
                <td className="col-1">{user.role}</td>
                <td className="col-12 d-flex justify-content-around">
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 200 }}
                    overlay={renderDeleteTooltip}
                  >
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(user.id)}
                      disabled={
                        user.role === "admin" && user.id === currentAdminId
                      }
                    >
                      <FaTrash />
                    </Button>
                  </OverlayTrigger>
                  {user.role === "admin" ? (
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 200 }}
                      overlay={renderRegularTooltip}
                    >
                      <Button
                        variant="outline-warning"
                        onClick={() => handleMakeUser(user.id)}
                        disabled={
                          user.role === "admin" && user.id === currentAdminId
                        }
                      >
                        <RiAdminLine />
                      </Button>
                    </OverlayTrigger>
                  ) : (
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 200 }}
                      overlay={renderAdminTooltip}
                    >
                      <Button
                        variant="outline-success"
                        onClick={() => handleMakeAdmin(user.id)}
                      >
                        <GrUserAdmin />
                      </Button>
                    </OverlayTrigger>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </React.Fragment>
  );
}

export default UsersManagementTable;
