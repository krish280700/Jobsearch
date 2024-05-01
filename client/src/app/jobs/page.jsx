'use client'

import Sidepanel from '../Components/sidePanel';
import Table from "../Components/table";
import { useState, useEffect, useRef} from 'react';

const Jobs = () => {
    const [data, setData] = useState([])
	const [panelOpen, setPanelOpen] = useState(false)
    const [panel, setPanel] = useState({})
    const [jobDetail, setJobDetail] = useState({})


    const fetchJobList = () => {
        fetch('http://localhost:8080/api/jobs/')
            .then(res => res.json())
            .then(res => {
                setData(res.jobs)
            })
    }

    useEffect(() => {
        fetchJobList()
    }, [])

    const handleView =(id, from) => {
        fetch(`http://localhost:8080/api/jobs/${id}`)
                .then(res => res.json())
                .then(res => {
                    let {job} = res
                    setJobDetail(res.job)
                    setPanelOpen(!panelOpen)
                    if(from == "View"){
                        let panelBody = <>
                                <div>
                                    Title: {job.position}
                                    Description: {job.description}
                                    Salary: {job.salary}
                                    Organizagtion: {job.organization}
                                    Location: {job.location}
                                    Skills: {job.skills}
                                    email: {job.email}'
                                </div>
                            </>
                        setPanel({panelHeader: 'Job', panelBody, panelType: 'view' })
                    }
                })
    }


    const jobsCol = [
        {
            accessorFn: row => row.position,
            id: 'title',
            header: 'Title',
    
            cell: info => {
                return <>
                            <p className='text-blue-300' onClick={() => handleView('662981eaec55e2425e87eead', 'View')}>{info.getValue()}</p>
                        </>
            },
            footer: info => info.column.id,
        },
        {
            accessorFn: row => row.description,
            id: 'description',
            header: 'Description',
    
            cell: info => info.getValue() ? info.getValue() : '--',
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

    return <>
        <>
			<div className='my-4 mx-4 shadow p-4 bg-white min-h-[80vh]'>
				<div>
                    <Table 
                        from={'employer'} 
                        col={jobsCol} 
                        data={data}
                        panel={{panelOpen, setPanelOpen}}
                        panelConfig={{panel,setPanel}}
                    />
				</div>
			</div>
			<Sidepanel
				panelState={panelOpen} 
				handlePanelState={setPanelOpen}
				panelHeader={panel?.panelHeader} 
				panelBody={ panel?.panelBody }
                panelButton={panel?.panelFooter}
			/>
		</>
    </>
}

export default Jobs