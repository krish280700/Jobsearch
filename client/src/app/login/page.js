'use client'
import {
  AtSymbolIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Button from '@/app/components/Base/button';
import FormError from '../Components/Base/formError';
import { useForm } from 'react-hook-form';
import Link from 'next/link'
import { useState, useTransition } from 'react';
import { authenticate } from '../Utilities/utils';
import {signIn} from "next-auth/react"
import Image from 'next/image'
 
const LoginForm = () => {
	const [showTwoFactor, setShowTwoFactor] = useState(false);
	const [error, setError] = useState("");
  	const [success, setSuccess] = useState("");
	const [isPending, startTransition] = useTransition();

	const { register, control, reset, handleSubmit, formState: { errors } } = useForm({
		defaultValues: {
		  email: '',
		  password: '',
		},
	});

	const onSubmit =  (data) => {
		setError("");
    	setSuccess("");
    
		authenticate(data)
	};
	  

	return (
		<div className='flex h-[100vh]'>
			<div className='w-6/12 bg-[#ededed] flex flex-col justify-center items-center'>
					<Image 
						src={"/banner.png"}
						width={512}
						height={512}
						alt="img"/>
					<p>Find your Dream Job</p>
			</div>
			<div className='w-6/12 flex flex-col justify-center'>
				<form onSubmit={handleSubmit(onSubmit)} className="flex items-center px-10">
					<div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
						<h1 className={`mb-3 text-4xl`}>
							Hunt
						</h1>
						<h1 className={`mb-3 text-2xl`}>
							Please log in to continue.
						</h1>
						<div className="w-full">
							{
								showTwoFactor && (
								<div>
									<label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="email"> Email	</label>
									<div className="relative">
										<input
											{...register('code')}
											className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
											id="code"
											type="text"
											name="code"
											placeholder="Enter your code"
										/>
										<AtSymbolIcon className="pointer-events-none absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
									</div>
								</div>)
							}
							{
								!showTwoFactor && (
									<>
										<div>
											<label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="email"> Email	</label>
											<div className="relative">
												<input
													{...register('email')}
													className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
													id="email"
													type="email"
													name="email"
													placeholder="Enter your email address"
												/>
												<AtSymbolIcon className="pointer-events-none absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
											</div>
										</div>
										<div className="mt-4">
											<label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password" >Password</label>
											<div className="relative">
												<input
													{...register('password')}
													className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
													id="password"
													type="password"
													name="password"
													placeholder="Enter password"
													minLength={6}
												/>
												<KeyIcon className="pointer-events-none absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
											</div>
										</div>
									</>
								)
							}
							<div
								className="flex h-8 items-end space-x-1"
								aria-live="polite"
								aria-atomic="true"
								>
								{/* {errorMessage && (
									<>
									<ExclamationCircleIcon className="h-5 w-5 text-red-500" />
									<p className="text-sm text-red-500">{errorMessage}</p>
									</>
								)} */}
							</div>
						</div>
						<FormError message={error} />
						<Button className="mt-4 btn-primary w-full" disabled={isPending} icon={<ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />} name={showTwoFactor ? 'Confirm' : 'Login'}/>
						<p className='mt-1 text-sm'>Doesn't have an account?
							<Link href='/signUp' className='text-blue-500 underline font-bold'> Sign Up</Link> 
						</p>
					</div>
				</form>
				<p className='text-center mt-2'>--------Or---------</p>
				<div className='px-10 mt-2 w-full'>
					<button className='px-10 border w-full bg-white shadow py-3' onClick={() => signIn("google")}>Sign In with Google</button>
				</div>
			</div>
		</div>
	);
}

export default LoginForm