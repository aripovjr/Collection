import React from "react";
import ButtonComponent from "./ButtonComponent";
import { FaRegUser, FaTrash } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

function ActionButtons({ deleteUsers }) {
  const handleDeleteUser = () => {
    deleteUsers();
  };

  // Tooltips
  const renderDeleteTooltip = (props) => (
    <Tooltip id="delete-tooltip" {...props}>
      Remove user completely
    </Tooltip>
  );
  const renderAdminTooltip = (props) => (
    <Tooltip id="admin-tooltip" {...props}>
      Give admin rights to user
    </Tooltip>
  );

  const renderRegularTooltip = (props) => (
    <Tooltip id="regular-tooltip" {...props}>
      Take admin rights from user
    </Tooltip>
  );
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "400px",
      }}
    >
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 200 }}
        overlay={renderDeleteTooltip}
      >
        <div>
          <ButtonComponent
            icon={<FaTrash className="button-icon" />}
            variant="danger"
            text="Delete"
            onClick={handleDeleteUser}
          />
        </div>
      </OverlayTrigger>

      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 200 }}
        overlay={renderAdminTooltip}
      >
        <div>
          <ButtonComponent
            icon={<GrUserAdmin />}
            variant="success"
            text="Make admin"
          />
        </div>
      </OverlayTrigger>
    </div>
  );
}

export default ActionButtons;
