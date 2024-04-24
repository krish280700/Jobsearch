import { RegisterForm } from '@/app/Components/registerForm';
import Image from 'next/image';

 
export default function SignUp() {
	
	return (
		<div className='flex h-[100vh]'>
			<div className='w-6/12 bg-[#ededed] flex flex-col justify-center items-center'>
				<Image 
					src={"/banner.png"}
					width={512}
					height={512}
					alt="img"/>
				<p>Find Your Dream Job</p>
			</div>
			<div className='flex flex-col justify-center w-6/12'> 
				<div className='px-10'>
					<h1 className={`mb-3 text-4xl`}>
						Hunt
					</h1>
					<h1 className={`mb-3 text-2xl`}>
						Please register.
					</h1>
					<RegisterForm from={'Signup'}/>
				</div>
			</div>
	
		</div>
	);
}

