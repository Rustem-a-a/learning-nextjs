"use server"

import {connectToDB} from "@/lib/mongoose";
import User from '@/lib/models/user.model'
import {revalidatePath} from "next/cache";
import Thread from "@/lib/models/thread.model";
import Community from "@/lib/models/community.model";

interface Params {
    userId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string,
}
export async function updateUser (
    {
        userId,
        username,
        name,
        bio,
        image,
        path,
    }:Params
):Promise<void>{
try{
    await connectToDB();
    await User.findOneAndUpdate(
        {id:userId},
        {
            username: username.toLowerCase(),
            name,
            bio,
            image,
            onboarded:true
            },
        {upsert:true}) // change row data if row exist or create new row if row does not exist
    if(path === '/profile/edit'){
        revalidatePath(path)
    }
}catch
(e: any)
{
    throw new Error(`Failed to create/update user: ${e.message}`)
}}

export async function fetchUser (userID: string) {
    try{
        await connectToDB();
        return await User
            .findOne({id:userID})
        //     .populate({
        //     path: 'communities',
        //     model: Comunity
        // })

    }catch (e: any) {
        throw new Error(`Failed to fetch user: ${e.message}`)
    }
}

export async function fetchUserPosts(userId: string) {
    try {
        connectToDB();

        // Find all threads authored by the user with the given userId
        const threads = await User.findOne({ id: userId }).populate({
            path: "threads",
            model: Thread,
            populate: [
                {
                    path: "community",
                    model: Community,
                    select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
                },
                {
                    path: "children",
                    model: Thread,
                    populate: {
                        path: "author",
                        model: User,
                        select: "name image id", // Select the "name" and "_id" fields from the "User" model
                    },
                },
            ],
        });
        return threads;
    } catch (error) {
        console.error("Error fetching user threads:", error);
        throw error;
    }
}

// Almost similar to Thead (search + pagination) and Community (search + pagination)