'use client'

import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Button from './Base/button';
import Link from 'next/link';
import Formgroup from './formGroup';
import { useForm } from 'react-hook-form';
import {signUpFeilds} from "@/app/Data/inputFields"


export const RegisterForm = ({from}) => {
	const { register, control, reset, handleSubmit, formState: { errors } } = useForm();

	const onSubmit = async (data) => {
        fetch('http://localhost:8080/api/users', 
            {   
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
					'Content-Type': 'application/json',
				}
            })
            .then(res => res.json())
            .then(res => {
                console.log(res, "Hey, I'm working")
            })
	}

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex items-center pb-10">
				<div className="flex-1 rounded-lg">
					{
						signUpFeilds.map((field, index) => {
							return <>
									<div key={`field-${index}`}>
										<Formgroup form={field} error={errors} from={from} control={control} register={register}/>
									</div>
								</>
						})
					}
						
                    <Button className="mt-4 btn-primary w-full" icon={<ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />} name={'Register'}/>
                
                    <p className='mt-1 text-sm'>already have an account?
                        <Link href='/signin' className='text-blue-500 underline font-bold'> Sign In</Link> 
                    </p>
						
				</div>
			</form>
    )
}

export default RegisterForm