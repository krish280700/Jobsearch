'use server'
import bcrypt from "bcrypt"
import { signIn, signOut } from "../auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const hashPassword = async (pass) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    return hashedPassword 
}

export const handleSignOut = async () => {
    await signOut()
}

const authenticate = async (data) => {
    const { email, password } = data
  
    try {
      await signIn("credentials", { email, password, redirectTo: '/employers' });
    } catch (err) {
      if (err.message.includes("CredentialsSignin")) {
        return "Wrong Credentials";
      }
      throw err;
    }
};

const fetchUsers = (data) => {
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
                if(res.inserted){
                  console.log(res)
                    // revalidatePath("/login");
                    // redirect("/login");
                }
            })
}
export {hashPassword, authenticate, fetchUsers}