import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import './index.scss';
import App from './components/app';
import ClientDetail from './components/pages/clients/client_details/client_details';
import ClientInvoices from './components/pages/clients/clients_invoices/client_invoices';
import Employess from './components/pages/employees/employees';
import Bills from './components/pages/expenses/bills/bills';
import Earnings from './components/pages/expenses/earnings/earnings';
import Taxes from './components/pages/expenses/taxes/taxes';
import OurServices from './components/pages/our_service/our_services';
import GenerateSlips from './components/pages/salary/generate_salary_slip/generate_slip';
import SalaryReport from './components/pages/salary/salary_report/salary_report';
import UpdateSlip from './components/pages/salary/updateSlip/updateSlip';
import Settings from './components/pages/settings/settings';
import Admin from './components/pages/admin/admin';
import AddEmployee from './components/pages/employees/add_employee';
import Projects from './components/pages/projects/projects';
import CompleteProjects from './components/pages/projects/completeProject';
import RuningProjects from './components/pages/projects/runingProjects';
import updateProject from './components/pages/projects/updateProject/updateProject';
import ClientProfile from './components/pages/clients/client_details/clientProfile/clientProfile';
import UpdateClient from './components/pages/clients/client_details/update_clients';
import UpdateEmployee from './components/pages/employees/updateEmployees';
import EmployeeSalary from './components/pages/salary/employeeSalary/employeeSalary';
import ClientSlip from './components/pages/clients/clients_invoices/client_slip';
import Invoices from './components/pages/clients/clients_invoices/invoices';
import UpdateClientInvoice from './components/pages/clients/clients_invoices/update_invoice';
import UpdateBills from './components/pages/expenses/bills/update_bill';
import UpdateTaxes from './components/pages/expenses/taxes/update_taxes';
import ClientHistory from './components/pages/clients/client_details/client_history';
import EmployeeHistory from './components/pages/employees/employee_history';
import ProjectHistory from './components/pages/projects/project_history';
import SalaryHistory from './components/pages/salary/salary_history';
import BillHistory from './components/pages/expenses/bills/bill_history';
import TaxHistory from './components/pages/expenses/taxes/tax_history';
import SignUp from './components/pages/signUp/signUp';
import Home from './components/pages/home/home';
import AdminProfile from './components/pages/admin/adminProfile/adminProfile';
import UpdateAdmin from './components/pages/admin/update_admin';
import AdminHistory from './components/pages/admin/adminProfile/admin-history';
import MyAccount from './components/pages/myaccount/myaccount';

export default class Root extends React.Component {

    render() {
        return (
            <BrowserRouter>
                {/* <ScrollContext> */}
                <Switch>
                    <App>
                        <Route exact path='/' component={Home} />
                        <Route path={`${process.env.PUBLIC_URL}/dashboard/signup`} component={SignUp} />
                        <Route path={`${process.env.PUBLIC_URL}/dashboard/client-detail`} component={ClientDetail} />
                        <Route path={`${process.env.PUBLIC_URL}/dashboard/client-invoice`} component={ClientInvoices} />
                        <Route path={`${process.env.PUBLIC_URL}/dashboard/employees`} component={Employess} />
                        <Route path={`${process.env.PUBLIC_URL}/dashboard/bills`} component={Bills} />
                        <Route path={`${process.env.PUBLIC_URL}/dashboard/earnings`} component={Earnings} />
                        <Route path={`${process.env.PUBLIC_URL}/dashboard/taxes`} component={Taxes} />
                        <Route path={`${process.env.PUBLIC_URL}/dashboard/our-service`} component={OurServices} />
                        <Route path={`${process.env.PUBLIC_URL}/dashboard/generate-slip`} component={GenerateSlips} />
                        <Route path={`${process.env.PUBLIC_URL}/dashboard/salary-report`} component={SalaryReport} />
                        <Route path={`${process.env.PUBLIC_URL}/dashboard/settings`} component={Settings} />
                        <Route path={`${process.env.PUBLIC_URL}/dashboard/admin`} component={Admin} />
                        <Route path='/dashboard/update-slip' component={UpdateSlip} />
                        <Route path='/dashboard/employees/add-employee' component={AddEmployee} />
                        <Route path='/dashboard/projects' component={Projects} />
                        <Route path='/dashboard/completeProjects' component={CompleteProjects} />
                        <Route path='/dashboard/runingProjects' component={RuningProjects} />
                        <Route path='/dashboard/updateProject' component={updateProject} />
                        <Route path='/dashboard/profile' component={ClientProfile} />
                        <Route path='/dashboard/update-client' component={UpdateClient} />
                        <Route path='/dashboard/update-employee' component={UpdateEmployee} />
                        <Route path='/dashboard/employee-salary' component={EmployeeSalary} />
                        <Route path='/dashboard/client-slip' component={ClientSlip} />
                        <Route path='/dashboard/invoices' component={Invoices} />
                        <Route path='/dashboard/update-invoice' component={UpdateClientInvoice} />
                        <Route path='/dashboard/update-bill' component={UpdateBills} />
                        <Route path='/dashboard/update-tax' component={UpdateTaxes} />
                        <Route path='/dashboard/client-history' component={ClientHistory} />
                        <Route path='/dashboard/employee-history' component={EmployeeHistory} />
                        <Route path='/dashboard/project-history' component={ProjectHistory} />
                        <Route path='/dashboard/salary-history' component={SalaryHistory} />
                        <Route path='/dashboard/bill-history' component={BillHistory} />
                        <Route path='/dashboard/tax-history' component={TaxHistory} />
                        <Route path='/dashboard/admin-profile' component={AdminProfile} />
                        <Route path='/dashboard/update-admin' component={UpdateAdmin} />
                        <Route path='/dashboard/admin-history' component={AdminHistory} />
                        <Route path='/dashboard/my-account' component={MyAccount} />
                    </App>
                </Switch>
                {/* </ScrollContext> */}
            </BrowserRouter>
        )
    }
}
ReactDOM.render(<Root />, document.getElementById('root'));


