'use client'

import { Controller, useWatch } from 'react-hook-form';
import Select from 'react-select';

export default function Input({form,register,control,...props}){
    const {type, label, placeholder, value,validations, name, options, isMultiSelect, min, max, step} = form

    switch (type) {
        case 'radio':
        case 'checkbox':
            return options && options.length && options.map((option, index) =>{
                    return <div className='flex' key={`${index + 1}${option.id}`}>
                                <input 
                                    {...register(name)}
                                    type={type} 
                                    id={option.id} 
                                    name={name} 
                                    value={option.name} 
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    /> 
                                <label htmlFor={option.id} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 mr-2">
                                    {option.name} 
                                </label>
                            </div>                
            } )
        case 'range': 
            return <>
                    <input id="default-range" type="range" {...register(name)} min={min} max={max} step={step}
                           className="w-6/12 h-2 rounded-lg cursor-pointer"
                            />    
                    </>
        
        case 'textarea':
            return <textarea className='block p-2 h-40 text-sm font-medium rounded w-full border border-gray-600 text-gray-900'   {...register(name)} placeholder={placeholder} id={name} ></textarea>
        case 'select':
            return <>
                    <Controller
                        control={control}
                        name={name}
                        render={({field : {onChange, value}}) => (
                        <Select
                            options={options}
                            isMulti={isMultiSelect}
                            isSearchable
                            getOptionLabel={ (option) => option.hasOwnProperty('name') ? option.name : option.label}
                            getOptionValue={ (option) => option}
                            defaultValue={props?.state?.localFilter}
                            placeholder={placeholder}
                            onChange={(val) => onChange(val.value)}
                            className={`${form.className} select-container`}
                            components={{ IndicatorSeparator:() => null }}
                        />
                        )}
                    />
                </>
        default:
            return <input id={name} {...register(name, { ...validations})} className='block px-2 h-10 text-sm font-medium rounded w-full border border-gray-600 text-gray-900' name={name} placeholder={placeholder} type={type} />
    }        
}