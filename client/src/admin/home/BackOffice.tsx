import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBox from '../../components/search-box/SearchBox';
import NavBar from '../../components/navbar/NavBar';
import { Pagination, Button, Input, Icon, Confirm } from 'semantic-ui-react';
import { SkeletonRow } from '../../common/skeletons';
import './backoffice.scss';
import { EmployeesClient } from '../../clients/employeeClient';

export interface Employee {
    company: String;
    email: String;
    firstName: String;
    id: String;
    lastName: String;
    mobile: String;
    position: String;
    telephone: String;
    photo: any;
}

const initialEmployee = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    telephone: "",
    photo: "",
    company: "",
    position: "",
}

const initialEditMode = {
    id: "", 
    editing: false
};

const BackOffice: FunctionComponent = () => {
    const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [searchWord, setSearchWord] = useState("");
    
	const [employee, setEmployee] = useState<Employee>(initialEmployee);

    const [loadingList, setLoadingList] = useState(false);
	const [errorList, setErrorList] = useState(false);
    const [employeeList, setEmployeeList] = useState<Employee[]>([]);
	const pageSize = 5;
	const [page, setPage] = useState(1);

    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [idToDetele, setIdToDetele] = useState("");
    const [editMode, setEditMode] = useState(initialEditMode);

    const handleInput = (event) => {
        const {name, value} = event.target;

        setEmployee({
            ...employee,
            [name]: value
        });
    }

    const formRef = useRef(null);
    const photoInput = useRef(null);
    
    const fileDialogOpen = () => {
        photoInput.current.click()
    }

    const handlePic = (e) => {
        handleInput(e)
        console.log(e)
    }

    const getEmployees = async () => {
        try {
            setLoadingList(true);
            setErrorList(false);
            const response: Employee[]  = (await EmployeesClient.getEmployees()).data;
            setEmployeeList(response)
            setLoadingList(false);
            setPage(1);
        } catch (e) {
            setLoadingList(false);
            setErrorList(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.nativeEvent.preventDefault();
        setLoading(true);
        setError(false);
        
        const formData : any = new FormData();
        let imagefile = photoInput.current;

        Object.keys(employee).forEach(key => {
            formData.append(key, employee[key]);
        });

        if(imagefile?.files?.length > 0) {
            formData.append("picture", imagefile.files[0], imagefile.files[0].name);
        }

        try {
            let response;

           /*  if(editMode.editing) {
                response = (await axios.put(`api/employees/${editMode.id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                })).data;
            } else{
                response = (await axios.post(`api/employees`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                })).data;
            } */

            if(editMode.editing) {
                response = (await EmployeesClient.updateEmployee(editMode.id, formData)).data;
            } else{
                response = (await axios.post(`api/employees`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                })).data;
            }

            setEmployee(initialEmployee);
            setEditMode(initialEditMode)
            getEmployees();
            setLoading(false);
        } catch (err) {
            console.log(err.message);
            setLoading(false);
            setError(true);
        }
    }

    const editEmploye = (employee: Employee) => {
        setEditMode({
            id: employee.id,
            editing: true
        });
        setEmployee(employee);
    };

    const deleteEmployee = async (id:string) => {
        try {
            setLoadingList(true);
            setErrorList(false);
            const response = await axios.delete(`api/employees/${id}`);
            if(response.status === 204) {
                setEmployee(initialEmployee);
                setEditMode(initialEditMode);
                getEmployees();
                /* const tempList = employeeList.filter(employee => employee.id != id);
                setEmployeeList(tempList); */
            }
            setLoadingList(false);
        } catch (e) {
            setLoadingList(false);
            setErrorList(true);
        }
    };

    const handlePaginationChange = (event, data) => setPage(data.activePage);

    const viewEmployee = (id: string) => {
        return window.open(`/employees/${id}`, '_blank')
    }

    const handleDelete = (id:string) => {
        setIdToDetele(id);
        setShowConfirmDialog(true);
    };

    const closeConfirmDialog = () => {
        setShowConfirmDialog(false);
    };

    const confirmDelete = () => {
        closeConfirmDialog();
        deleteEmployee(idToDetele);
    };

    const tableSearch = employee => {
        if(searchWord) {
            const eName = employee.firstName.toLowerCase();
            const eEmail = employee.email.split("@")[0].toLowerCase();
            const text = searchWord.toLowerCase();
            return eName.indexOf(text) != -1 || eEmail.indexOf(text) != -1;
        }
        return true
    }

    useEffect(() => {
        getEmployees()
    }, []);

    return (
        <>
            <NavBar />
            <div className="header">
                <div className="section-header">
                    <h1>Employee Manager</h1>
                </div>
            </div>
            <div className="container">
                <div className="form-container">
                    <form action="" method="POST" encType="multipart/form-data" ref={formRef} onSubmit={handleSubmit}>
                        <div className="main-content">
                            <div className="employee-form">
                                <div>
                                    <Icon name="user" size="big" color="blue" />
                                </div>
                                <div>
                                    <Input 
                                        name="firstName" 
                                        aria-label="Enter a employee name" 
                                        autoComplete="off" 
                                        placeholder='First Name' 
                                        value={employee.firstName}
                                        onChange={handleInput} 
                                        required
                                    />
                                    <Input 
                                        name="lastName" 
                                        aria-label="Enter a employee last name" 
                                        autoComplete="off" 
                                        placeholder='Last Name' 
                                        value={employee.lastName}
                                        onChange={handleInput} 
                                        required
                                    />
                                </div>
                                <div>
                                    <Icon name='picture' size='big' color='blue' />
                                </div>
                                <div>
                                    <Input icon placeholder='Upload employee photo...'>
                                        <input onClick={fileDialogOpen} value={employee.photo} />
                                        <input 
                                            style={{display: 'none'}}
                                            name="photo" 
                                            type="file"
                                            ref={photoInput}
                                            accept="image/*" 
                                            multiple={false}
                                            onChange={handlePic} 
                                        />
                                        <Icon name='attach' />
                                    </Input>
                                </div>
                                <div>
                                    <Icon name='paper plane' size='big' color='blue' />
                                </div>
                                <div>
                                    <Input iconPosition='left' placeholder='Email'>
                                        <Icon name='at' />
                                        <input 
                                            name="email" 
                                            type="email"
                                            aria-label="Enter a employee email" 
                                            autoComplete="off" 
                                            placeholder='Email' 
                                            value={employee.email}
                                            required
                                            onChange={handleInput} 
                                        />
                                    </Input>
                                </div>
                                <div>
                                    <Icon name='phone square' size='big' color='blue' />
                                </div>
                                <div>
                                    <Input 
                                        name="mobile" 
                                        aria-label="Enter a employee cellphone" 
                                        type="tel"
                                        autoComplete="off" 
                                        placeholder='Mobile number' 
                                        value={employee.mobile}
                                        onChange={handleInput} 
                                        required
                                    />
                                </div>
                                <div>
                                    <Icon name='text telephone' size='big' color='blue' />
                                </div>
                                <div>
                                    <Input 
                                        name="telephone" 
                                        aria-label="Enter a employee Telephone" 
                                        type="tel"
                                        autoComplete="off" 
                                        placeholder='Telephone number' 
                                        value={employee.telephone}
                                        onChange={handleInput} 
                                    />
                                </div>
                                <div>
                                    <Icon name='building' size='big' color='blue' />
                                </div>
                                <div>
                                    <Input 
                                        name="company" 
                                        aria-label="company" 
                                        type="text"
                                        autoComplete="off" 
                                        placeholder='Company' 
                                        value={employee.company}
                                        onChange={handleInput} 
                                        required
                                    />
                                </div>
                                <div>
                                    <Icon name='suitcase' size='big' color='blue' />
                                </div>
                                <div>
                                    <Input 
                                        name="position" 
                                        aria-label="position" 
                                        type="text"
                                        autoComplete="off" 
                                        placeholder='Position' 
                                        value={employee.position}
                                        onChange={handleInput} 
                                        required
                                    />
                                </div>
                                <div style={{gridColumn: '1/3', textAlign: 'center'}}>
                                    <Button.Group>
                                        <Button type="reset" onClick={() => setEmployee(initialEmployee)} size='large'>Cancel</Button>
                                        <Button.Or />
                                        <Button type="submit" loading={loading ? true : false}  disabled={loading ? true : false} primary size='large'>Save</Button>
                                    </Button.Group>
                                </div>
                                {error && (
                                    <div style={{gridColumn: '1/3', textAlign: 'center'}}>
                                        <h2>Error on save data, try again!</h2>
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
                <div className="employee-list">
                    <div className="search-box">
                        <SearchBox 
                            searchWord={searchWord}
                            setSearchWord={setSearchWord} 
                        />
                    </div>
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th className="email-column">Email</th>
                                <th>Options</th>
                            </tr>
                            </thead>
                        <tbody>
                            {loadingList && (
                                <tr>
                                    <td colSpan={3}>
                                        <SkeletonRow />
                                    </td>
                                </tr>
                            )}
                            {errorList && (
                                <tr>
                                    <td colSpan={3}>
                                        Error getting employees data, try in few minutes!
                                    </td>
                                </tr>
                            )}
                            {!loadingList && employeeList.length > 0 && employeeList.filter(tableSearch).slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize).map(employee => (
                                    <tr key={employee.id}>
                                        <td className="cell tl" style={{with: '275px'}}>{`${employee.firstName} ${employee.lastName}`}</td>
                                        <td className="cell tl email-column">{employee.email}</td>
                                        <td className="cell tr" style={{with: '100px'}}>
                                            <Icon link name="eye" onClick={() => viewEmployee(employee.id)} /> {' '} 
                                            <Icon link name="pencil alternate" title="Edit employee" onClick={() => editEmploye(employee)} /> {' '} 
                                            <Icon link name="delete" title="Delete employee" onClick={() => handleDelete(employee.id)} />    
                                        </td>
                                    </tr>
                                )
                            )}
                            {!loadingList && !errorList && (employeeList.length === 0 || employeeList.filter(tableSearch).length === 0) && (
                                <tr>
                                    <td colSpan={3}>
                                        Employee list is empty!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Pagination
                        boundaryRange={0}
                        defaultActivePage={page}
                        ellipsisItem={'...'}
                        firstItem={null}
                        lastItem={null}
                        siblingRange={1}
                        onPageChange={handlePaginationChange}
                        totalPages={Math.ceil(employeeList.length / pageSize)}
                    />
                </div>
            </div>
            <Confirm
                open={showConfirmDialog}
                content='Are you sure delete this employee?'
                onCancel={closeConfirmDialog}
                onConfirm={confirmDelete}
            />
        </>
    )
};

export default BackOffice;
