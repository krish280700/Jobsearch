'use client'

import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Button from './Base/button';
import Link from 'next/link';
import Formgroup from './formGroup';
import { useForm } from 'react-hook-form';
import {signUpFeilds} from "@/app/Data/inputFields"
import { fetchUsers } from '../Utilities/utils';

export const RegisterForm = ({from}) => {
	const { register, control, reset, handleSubmit, formState: { errors } } = useForm();

	const onSubmit = async (data) => {
        fetchUsers(data)
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
                        <Link href='/login' className='text-blue-500 underline font-bold'> Sign In</Link>  
                    </p>
						
				</div>
			</form>
    )
}

export default RegisterForm