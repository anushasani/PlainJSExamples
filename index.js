(async function () {
  let data = await fetch("./data.json");
  let result = await data.json();

  let employees = result;

  let selectedEmployeeId = employees[0].id;
  let selectedEmployee = employees[0];

  const empoyeeList = document.querySelector(".employListDetails");
  const employeeSingle = document.querySelector(".employeeSingleForm");

  const createEmployee = document.querySelector(".createEmployee");
  const addEmployeeModal = document.querySelector(".addEmployee");
  const closeButton = document.querySelector(".formClose");
  const addEmployeeForm = document.querySelector(".addEmployee_create");

  createEmployee.addEventListener("click", () => {
    addEmployeeModal.style.display = "flex";
  });
  closeButton.addEventListener("click", (e) => {
    addEmployeeModal.style.display = "none";
  });

  empoyeeList.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id) {
      selectedEmployeeId = e.target.id;
      renderEmployee();
      renderSingleEmployee();
    }
  });

  const dobInput = document.querySelector(".addEmployee_create--dob");
  dobInput.max = `${new Date().getFullYear() - 18}-${new Date()
    .toISOString()
    .slice(5, 10)}`;

  addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(addEmployeeForm);
    const values = [...formData.entries()];
    let empData = {};
    values.forEach((val) => {
      empData[val[0]] = val[1];
    });
    empData.id = employees[employees.length - 1].id + 1;
    empData.age =
      new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
    empData.imageUrl =
      empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
    employees.push(empData);
    renderEmployees();
    addEmployeeForm.reset();
    addEmployeeModal.style.display = "none";
  });

  const renderEmployee = () => {
    empoyeeList.innerHTML = "";
    employees.forEach((emp) => {
      const employee = document.createElement("span");
      employee.classList.add("employeeNameItems");

      if (parseInt(selectedEmployeeId, 10) === emp.id) {
        employee.classList.add("selected");
        selectedEmployee = emp;
      }
      employee.setAttribute("id", emp.id);
      employee.innerHTML = `${emp.firstName} <i class="employeeDelete">❌</i>`;
      empoyeeList.append(employee);
    });
  };

  const renderSingleEmployee = () => {
    if (selectedEmployee === -1) {
      employeeSingle.innerHTML = "";
      return;
    }

    employeeSingle.innerHTML = ` <img src="${selectedEmployee.imageUrl}" />
      <span class="employees__single--heading">
      ${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})
      </span>
      <span>Location - ${selectedEmployee.address}</span>
      <span>${selectedEmployee.email}</span>
      <span>Mobile - ${selectedEmployee.contactNumber}</span>
      <span>DOB - ${selectedEmployee.dob}</span>`;
  };

  renderEmployee();
  renderSingleEmployee();
})();
