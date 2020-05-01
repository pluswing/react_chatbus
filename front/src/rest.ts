interface Employee {
  id: string;
  name: string;
  salary: string;
  age: string;
  profileImage: string;
}

interface GetEmployeeResult {
  status: "success" | "failed";
  data?: any;
  message?: string;
}

export const getEmployee = async (id: number): Promise<Employee> => {
  const res = await fetch("http://dummy.restapiexample.com/api/v1/employees");

  const data = (await res.json()) as GetEmployeeResult;
  if (data.status !== "success") {
    throw new Error(data.message);
  }

  const es = data.data.filter((d: any) => d.id === `${id}`);
  if (!es.length) {
    throw new Error("Employee not found");
  }
  const e = es[0];

  return {
    id: e.id,
    name: e.employee_name,
    salary: e.employee_salary,
    age: e.employee_age,
    profileImage: e.profile_image,
  };
};
