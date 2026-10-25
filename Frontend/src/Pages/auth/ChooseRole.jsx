import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const ChooseRole = () => {

    const navigate = useNavigate();

    const { roles, setActiveRole } = useContext(AuthContext);

    function RoleUpdate(role) {

        setActiveRole(role);

        localStorage.setItem("activeRole", role);

        navigate(`/${role.toLowerCase()}`);
    }

    return (
        <div>
            {roles.map((role) => (
                <div
                    key={role}
                    onClick={() => RoleUpdate(role)}
                >
                    {role}
                </div>
            ))}
        </div>
    );
};

export default ChooseRole;