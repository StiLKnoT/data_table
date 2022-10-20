import React from "react";

const Form = (props) => {
  return (
    <>
      <div className="formBody">
        <div className="AddForm">
          <span className="editText">{props.userManipulation}</span>

          <form onSubmit={props.getPostUser}>
            <input
              className="input"
              type="text"
              placeholder="User *"
              value={props.valueName}
              onChange={props.getUser}
              required
            />
            <input
              className="input"
              type="text"
              placeholder="Email *"
              value={props.valueEmail}
              onChange={props.getEmail}
              required
            />
            <input
              className="input"
              type="text"
              placeholder="Role *"
              value={props.valueRole}
              onChange={props.getRole}
              required
            />
            <input
              className="input"
              type="text"
              placeholder="Plane *"
              value={props.valuePlane}
              onChange={props.getPlane}
              required
            />
            <input
              className="input"
              type="text"
              placeholder="Status *"
              value={props.valueStatus}
              onChange={props.getStatus}
              required
            />
            <div className="formButtons">
              <button
                className="btn btn_add btnClearAdd"
                type="button"
                style={{ backgroundColor: "red" }}
                onClick={props.getSetAddUsers}
              >
                {props.CLose}
              </button>
              <button className="btn btn_add btnAdd" id="addBtn" type="submit">
                {props.formSend}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
