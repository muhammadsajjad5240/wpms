export const MENUITEMS = [
    {
        title: 'Salary', icon: 'blackboard', type: 'sub', active: false, children: [
            // { path: '/dashboard/generate-slip', title: 'Generate Slip', icon: 'blackboard', type: 'link' },
            { path: '/dashboard/employee-salary', title: 'Employee Salary', icon: 'blackboard', type: 'link' },
            { path: '/dashboard/salary-report', title: 'Salary Report', icon: 'blackboard', type: 'link' },
        ]
    },
    {
        title: 'Employees', icon: 'blackboard', type: 'sub', active: false, children: [
            { path: '/dashboard/employees', title: 'All Employees', icon: 'blackboard', type: 'link' },
            // { path: '/dashboard/salary-report', title: 'Salary Report', icon: 'blackboard', type: 'link' },
        ]
    },
    {
        title: 'Clients', icon: 'blackboard', type: 'sub', active: false, children: [
            { path: '/dashboard/client-detail', title: 'Client Details', type: 'link' },
            { path: '/dashboard/client-invoice', title: 'Client Invoices', type: 'link' },
            { path: '/dashboard/invoices', title: 'Invoices', type: 'link' },
        ]
    },
    {
        title: 'Projects', icon: 'blackboard', type: 'sub', active: false, children: [
            { path: '/dashboard/projects', title: 'All Projects', type: 'link' },
            { path: '/dashboard/runingProjects', title: 'Runing Projects', type: 'link' },
            { path: '/dashboard/completeProjects', title: 'Complete Projects', type: 'link' },
        ]
    },
    {
        title: 'Expenses', icon: 'blackboard', type: 'sub', active: false, children: [
            { path: '/dashboard/bills', title: 'Bills', type: 'link' },
            { path: '/dashboard/taxes', title: 'Taxes', type: 'link' },
            { path: '/dashboard/earnings', title: 'Earnings', type: 'link' },
        ]
    },
    {
        title: 'History', icon: 'blackboard', type: 'sub', active: false, children: [
            { path: '/dashboard/client-history', title: 'Client History', type: 'link' },
            { path: '/dashboard/employee-history', title: 'Employee History', type: 'link' },
            { path: '/dashboard/project-history', title: 'Project History', type: 'link' },
            { path: '/dashboard/salary-history', title: 'Salary History', type: 'link' },
            // { path: '/dashboard/invoice-history', title: 'Invoice History', type: 'link' },
            { path: '/dashboard/admin-history', title: 'Admin History', type: 'link' },
            { path: '/dashboard/bill-history', title: 'Bill History', type: 'link' },
            { path: '/dashboard/tax-history', title: 'Tax History', type: 'link' },
        ]
    },
    { path: '/dashboard/our-service', title: 'Services', icon: 'blackboard', type: 'link' },
    { path: '/dashboard/admin', title: 'Admin', icon: 'blackboard', type: 'link' },
    { path: '/dashboard/signup', title: 'Sign Up', icon: 'blackboard', type: 'link' },
    // {
    //     title: 'Widgets', icon: 'blackboard', type: 'sub', active: false, children: [
    //         { path: '/general-widget', title: 'General widget', type: 'link' }
    //     ]
    // },
    // {
    //     path: '/dashboard/settings', title: 'Settings', icon: 'settings', type: 'link'
    // }
]
