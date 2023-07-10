import React, { useState } from "react";
import NavBar from "../components/NavBar";
import DashboardForm from "../components/CollectionForm";
import { FaExclamationCircle } from "react-icons/fa";
import { Accordion, Alert } from "react-bootstrap";
import UsersManagementTable from "../components/UsersManagementTable";

function Dashboard() {
  const [dataFromChild, setDataFromChild] = useState({});

  const handlerDataFromChild = (users) => {
    setDataFromChild(users);
  };

  return (
    <div>
      <NavBar onData={handlerDataFromChild} />
      <Accordion className="m-5" defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>List of Users</Accordion.Header>
          <Accordion.Body>
            {dataFromChild.role === "admin" ? (
              <UsersManagementTable />
            ) : (
              <Alert variant="danger">
                <FaExclamationCircle /> You don't have access to users' table
              </Alert>
            )}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Create your Collection</Accordion.Header>
          <Accordion.Body>
            <DashboardForm />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default Dashboard;
