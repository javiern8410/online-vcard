import axios, { AxiosPromise } from 'axios';
// import { TaskOwnerEnum } from '../../../enums/taskOwner';

export enum TaskOwnerEnum {
	CORE = 'CORE',
	USER = 'USER',
	JUGGLER = 'JUGGLER',
	ADVANCED = 'ADVANCED',
	DEFAULT = 'DEFAULT'
}


export enum TaskType {
	TRANSACTION = 'TRANSACTION',
	ENROLLMENT = 'ENROLLMENT',
	BANK_DATA_VALIDATION = 'BANK_DATA_VALIDATION',
	VTEX = 'VTEX',
	KOIN = 'KOIN'
}

export const EmployeesClient = new (class Client {
	public addEmployee = (
		employee: any
	): AxiosPromise<any> =>
		axios.post(
			`/api/employees`,
            employee,
            {
                headers: { "Content-Type": "multipart/form-data" }
            }
		);

    public updateEmployee = (
        id: string,
		employee: any
	): AxiosPromise<any> =>
		axios.put(
			`/api/employees/${id}`,
            employee,
            {
                headers: { "Content-Type": "multipart/form-data" }
            }
		);

	public getEmployees = (): AxiosPromise<any> =>
		axios.get(`/api/employees`);
})();
