import React, { useEffect, useMemo, useState, useCallback } from "react";
import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import { getUsers } from "../../helpers/getUsers";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const initFormValues = {
  firstName: "",
  lastName: "",
  email: "",
};

export const TableComponent = () => {
  const [data, setData] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = useState("");
  const [filterValues, setFilterValues] = useState({ desde: "", hasta: "" });
  const [formValues, setFormValues] = useState(initFormValues);
  const { firstName, lastName, email } = formValues;
  const { desde, hasta } = filterValues;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (firstName.trim().length < 2) {
      alert("El nombre debe tener al menos 3 caracteres");
      return;
    }
    setFilteredItems([
      { first_name: firstName, last_name: lastName, email: email },
      ...filteredItems,
    ]);
    closeModal();
    setTimeout(() => {
      alert("Registro guardado");
    }, 100);
  };

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
    setFilterValues({
      ...filterValues,
      [target.name]: target.value,
    });
  };

  const removeItem = (array, item) => {
    const newArray = array.slice();
    newArray.splice(
      newArray.findIndex((a) => a === item),
      1
    );

    return newArray;
  };

  const handlePageChange = (page) => {
    fetchUsers(page);
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    fetchUsers(page, newPerPage);
    setPerPage(newPerPage);
  };

  const handleDelete = useCallback(
    (row) => async () => {
      Swal.fire({
        title: "¿Eliminar regstro?",
        showCancelButton: true,
        icon: "question",
        confirmButtonText: "Si, eliminar",
        cancelButtonText: `No, cancelar`,
        confirmButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          setFilteredItems(removeItem(data, row));
          setTotalRows(totalRows - 1);
          Swal.fire("Eliminado", "", "success");
        }
      });
    },
    [totalRows, data]
  );

  const handleEdit = useCallback(
    (row) => async () => {
      setFormValues({
        firstName: row.first_name,
        lastName: row.last_name,
        email: row.email,
      });
      openModal();
    },
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    let rand = Math.random();
    rand = Math.floor(rand * 2 - 1);
    rand = rand + 2;

    fetchUsers(rand);
  };

  const handleReset = (e) => {
    setFilterValues({ desde: "", hasta: "" });
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setFormValues({ firstName: "", lastName: "", email: "" });
  }

  const fetchUsers = useCallback(
    async (page, size = perPage) => {
      setLoading(true);

      const data = await getUsers(page, size);
      setData(data.data);
      setFilteredItems(data.data);
      setTotalRows(data.total);
      setLoading(false);
    },
    [perPage]
  );

  useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  const columns = useMemo(
    () => [
      {
        name: "First Name",
        selector: (row) => row.first_name,
        sortable: true,
      },
      {
        name: "Last Name",
        selector: (row) => row.last_name,
        sortable: true,
      },
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
      },

      {
        name: "Acciones",
        cell: (row) => (
          <div className="justify-content-center">
            <button className="btn btn-danger " onClick={handleDelete(row)}>
              <FontAwesomeIcon icon="fa-solid fa-trash" />
            </button>
            <button className="btn btn-warning ms-1" onClick={handleEdit(row)}>
              <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
            </button>
          </div>
        ),
      },
    ],
    [handleDelete, handleEdit]
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setFilteredItems(data);
        setFilterText("");
      }
    };

    const handleInput = (e) => {
      setFilterText(e.target.value);

      const filter = data.filter(
        (item) =>
          (item.first_name &&
            item.first_name
              .toLowerCase()
              .includes(e.target.value.toLowerCase())) ||
          (item.last_name &&
            item.last_name.toLowerCase().includes(e.target.value.toLowerCase()))
      );

      setFilteredItems(filter);
    };

    return (
      <FilterComponent
        onFilter={handleInput}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, setFilteredItems, data]);

  return (
    <>
      <div className="col-sm-12">
        <div className="card">
          {/* <div className="card-header">
            <h5>Lista de usuarios</h5>
            <span>
              Los datos son proveidos desde el API.{" "}
              <code>https://reqres.in/api/users</code>{" "}
            </span>
          </div> */}
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row ">
                <div className="col-sm-3">
                  <button
                    className="ms-1 btn btn-success"
                    type="button"
                    onClick={openModal}
                  >
                    Nuevo registro
                  </button>
                </div>
                <div className="col-sm-3">
                  <div className="input-group">
                    <span className="input-group-text">Desde</span>
                    <input
                      className="form-control"
                      type="date"
                      name="desde"
                      placeholder="dd/mm/aaa"
                      onChange={handleInputChange}
                      value={desde}
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="input-group">
                    <span className="input-group-text">Hasta</span>
                    <input
                      className="form-control"
                      type="date"
                      name="hasta"
                      placeholder="dd/mm/aaa"
                      onChange={handleInputChange}
                      value={hasta}
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-3">
                  <button className="btn btn-primary" type="submit">
                    Filtrar
                  </button>
                  <button
                    className="ms-1 btn btn-info"
                    onClick={handleReset}
                    type="button"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </form>

            <div className="table-responsive">
              <DataTable
                columns={columns}
                data={filteredItems}
                progressPending={loading}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                paginationDefaultPage={currentPage}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                striped
                selectableRows
                onSelectedRowsChange={({ selectedRows }) =>
                  console.log(selectedRows)
                }
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
              />
              <div>
                <Modal
                  isOpen={modalIsOpen}
                  // onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <h5> Nuevo registro </h5>
                  <hr />
                  <form className="container" onSubmit={handleSubmitForm}>
                    <div className="form-group">
                      <label>Nombre</label>
                      <input
                        type="text"
                        className={`form-control`}
                        placeholder="Nombre del ususario"
                        name="firstName"
                        value={firstName}
                        onChange={handleInputChange}
                        autoComplete="off"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Apellido</label>
                      <input
                        type="text"
                        className={`form-control`}
                        placeholder="Apellido del usuario"
                        name="lastName"
                        value={lastName}
                        onChange={handleInputChange}
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className={`form-control`}
                        placeholder="ejemplo@ejemplo.com"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        autoComplete="off"
                        required
                      />
                    </div>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="btn btn-outline-danger me-5"
                    >
                      <i className="fa fa-times"></i>
                      <span> Cancelar</span>
                    </button>

                    <button
                      type="submit"
                      className="btn btn-outline-primary btn-block"
                    >
                      <i className="fa fa-save"></i>
                      <span> Guardar</span>
                    </button>
                  </form>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
