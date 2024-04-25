export const handlePagination = (table) => {
	let pageCount = table.getPageCount()
	let pageIndex = table.getState().pagination.pageIndex
    const rows = []
    if(Number(pageCount) <= 5){
		for(let i = 0; i < Number(pageCount); i++){
			rows.push(<a href="#" key={`page-${i}`} className={`relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex ${pageIndex == i ? 'bg-slate-600 text-white' : ''}`}>{i + 1}</a>)
		}
    }
    else{
		pageIndex = pageIndex + 1
		let pageArray = [1,pageCount ]
		 rows.push(<div>
			<a href="#" key='firstPage' onClick={() => table.firstPage()} className={`relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex ${pageIndex == 1 ? 'bg-slate-600 text-white' : ''}`}>1</a>
			<a href="#" key='2page' className={`relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex`}>...</a>
			<a href="#" key='currentPage' onClick={() => table.setPageIndex(Math.round(pageCount / 2))}className={`relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex ${pageArray.includes(pageIndex) ? "" : 'bg-slate-600 text-white'}`}>{pageArray.includes(pageIndex) ? Math.round(pageCount / 2) : pageIndex}</a>
			<a href="#" key='4page' className={`relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex`}>...</a>
			<a href="#" key='lastPage' onClick={() => table.lastPage()} className={`relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex ${pageIndex == pageCount ? 'bg-slate-600 text-white' : ''}`}>{pageCount}</a>
		</div>)
    }
	
    return rows
}
export const jobsCol = [
    {
        accessorFn: row => row.position,
        id: 'title',
        header: 'Title',

        cell: info => {
            return <>
                        <p onClick={() => handleView('api/jobs/662939a56b79273192b8dead')}>{info.getValue()}</p>
                    </>
        },
        footer: info => info.column.id,
    },
    {
        accessorFn: row => row.description,
        id: 'description',
        header: 'Description',

        cell: info => info.getValue(),
        footer: info => info.column.id,
    },
    {
        accessorFn: row => row.organization,
        id: 'organization',
        header: 'Organization',

        cell: info => info.getValue() ? info.getValue() : '--',
        footer: info => info.column.id,
    },			
    {
        accessorFn: row => row.email,
        id: 'email',
        header: 'Email',

        cell: info => info.getValue() ? info.getValue() : '--',
        footer: info => info.column.id,
    },			
    {
        accessorFn: row => row.salary,
        id: 'salary',
        header: 'Salary',

        cell: info => info.getValue() ? info.getValue() :'--',
        footer: info => info.column.id,
    },
    {
        accessorFn: row => row.skills,
        id: 'skills',
        header: 'Skills Required',

        cell: info => info.getValue(),
        footer: info => info.column.id,
    },
    {
        accessorFn: row => row.jobType,
        id: 'jobtype',
        header: 'Job Type',

        cell: info => info.getValue() ? info.getValue() :'--',
        footer: info => info.column.id,
    },		
]

export const userCol = [
    {
        accessorFn: row => row.firstName,
        id: 'firstname',
        header: 'First Name',

        cell: info => info.getValue(),
        footer: info => info.column.id,
    },
    {
        accessorFn: row => row.lastName,
        id: 'lastname',
        header: 'Last Name',

        cell: info => info.getValue(),
        footer: info => info.column.id,
    },
    {
        accessorFn: row => row.email,
        id: 'email',
        header: 'Email',

        cell: info => info.getValue(),
        footer: info => info.column.id,
    },
    {
        accessorFn: row => row.phone,
        id: 'phone',
        header: 'Phone',

        cell: info => info.getValue(),
        footer: info => info.column.id,
    },
    {
        accessorFn: row => row.role,
        id: 'role',
        header: 'Role',

        cell: info => info.getValue(),
        footer: info => info.column.id,
    },
    {
        accessorFn: row => row.createdAt,
        id: 'createdAt',
        header: 'Created At',

        cell: info => info.getValue(),
        footer: info => info.column.id,
    },				
    {
        accessorFn: row => row.updatedAt,
        id: 'updatedAt',
        header: 'Updated At',

        cell: info => info.getValue() ? info.getValue() :'--',
        footer: info => info.column.id,
    },	
]