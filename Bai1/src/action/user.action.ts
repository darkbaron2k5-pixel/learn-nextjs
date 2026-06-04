"use server"
import {revalidatePath, revalidateTag} from "next/cache";
export const userAction = async () =>{
    // revalidatePath("/");
    revalidateTag("user");
}