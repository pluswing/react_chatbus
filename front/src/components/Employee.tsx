import React, { useEffect, useState } from "react";
import { getEmployee } from "../rest";

interface Props {
  id: number;
}

const Employee: React.FC<Props> = ({ id }: Props) => {
  const [name, setName] = useState<string>("");
  // call REST API
  useEffect(() => {
    getEmployee(id)
      .then((employee) => {
        console.log(employee);
        setName(employee.name);
      })
      .catch((error) => {
        alert(error);
      });
  }, [id]);

  return <div>{name}</div>;
};

export default Employee;
