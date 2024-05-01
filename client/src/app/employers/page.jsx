'use client'

import Sidepanel from '../Components/sidePanel';
import Table from "../Components/table";
// import { jobsCol } from "../Utilities/table"
import { useState, useEffect, useRef} from 'react';
import { addJob } from '../Data/inputFields';
import { useForm } from 'react-hook-form';
import Formgroup from '../components/formGroup';
import {PencilSquareIcon, TrashIcon} from '@heroicons/react/16/solid'

const Employers = () => {
    const [data, setData] = useState([])
	const [panelOpen, setPanelOpen] = useState(false)
    const [panel, setPanel] = useState({})
    const [jobDetail, setJobDetail] = useState({})
    const { register, control, reset, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data, type) => {
        let formData = {...data, userId: '662939a56b79273192b8dead'}
        let endPoint = type == 'Edit' ? `/${data._id}/edit` : ''

        fetch(`http://localhost:8080/api/jobs${endPoint}`, 
            {   
                method: 'POST',
                body: JSON.stringify(formData),
                headers:{
					'Content-Type': 'application/json',
				}
            })
            .then(res => res.json())
            .then(res => {
                console.log(res, "Hey, I'm working")
                fetchUserJobList()
                setPanelOpen(!panelOpen)
                reset()
            })
	}
    const fetchUserJobList = () => {
        fetch('http://localhost:8080/api/jobs/662939a56b79273192b8dead/list')
            .then(res => res.json())
            .then(res => {
                setData(res.job)
            })
    }

    useEffect(() => {
        fetchUserJobList()
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
                    }else{
                        setPanel({panelHeader: 'Edit Job', panelFooter: 'Update', panelType: 'Edit'})
                        reset(res.job)
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
                            <p className='text-blue-300 cursor-pointer' onClick={() => handleView('662981eaec55e2425e87eead', 'View')}>{info.getValue()}</p>
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
        {
            id: 'action',
            header: 'Actions',

            cell: info => {
                return <div className='flex'>
                            <p onClick={() => handleView(info?.row?.original?._id, 'Edit')}><PencilSquareIcon className='h-5 cursor-pointer'/></p>
                            <TrashIcon className='h-5 ml-2 cursor-pointer' onClick={() => handleDelete(info?.row?.original?._id)}/>
                        </div>
            },
            footer: info => info.column.id,
        },	
    ]

    const addEditForm = <form onSubmit={handleSubmit((data) => onSubmit(data, panel.panelType))}>
                            {
                                addJob.map((job, index) => {
                                    return <div key={`${index}job`}>
                                                <Formgroup from={'Add'} error={errors} form={job} register={register}/> 
                                            </div>
                                })
                            }
                        </form>

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/jobs/${id}/delete`, {method: 'POST'})
            .then(res => res.json())
            .then(res => {
                fetchUserJobList()
            })
    }

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
                        additionalBtns={true}
                    />
				</div>
			</div>
			<Sidepanel
				panelState={panelOpen} 
				handlePanelState={setPanelOpen}
				panelHeader={panel?.panelHeader} 
				panelBody={ panel.panelBody ? panel.panelBody : addEditForm }
                panelAction={handleSubmit((data) => onSubmit(data, panel.panelType))}
                panelButton={panel?.panelFooter}
			/>
		</>
    </>
}

export default Employers