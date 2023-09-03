"use server"

import {connectToDB} from "@/lib/mongoose";
import Thread from "@/lib/models/thread.model";
import User from "@/lib/models/user.model";
import {revalidatePath} from "next/cache";

interface IParams{
    text:string,
    author:string,
    communityId: string | null,
    path:string
}
export async function createThread ({text,author,communityId,path}:IParams) {
    try {
        await connectToDB()
        const createdThread = await Thread.create({
            text,
            author,
            community:null,
        })
        await User.findByIdAndUpdate(author, {
            $push: {threads: createdThread._id}})
        revalidatePath(path);
    }catch (e:any) {
        throw new Error(`Error from createThread action ${e.message}`)
    }

}

export async function fetchPosts (pageNumber:number = 1, pageSize:number = 20) {
    try {
    await connectToDB()
        // Calculate the number of post to skip
        const skipAmount = (pageNumber-1)*pageSize
        //Fetch posts to have no parents (top-level tgread...)
        const postsQuery = Thread.find({parentID:{$in:[null,undefined]}})
            .sort({createdAt: 'desc'})
            .skip(skipAmount)
            .limit(pageSize)
            .populate({
                path: 'author',
                model: User})
            .populate({
                path: 'children',
                populate:{
                    path: 'author',
                    model: 'User',
                    select: "_id name parentId image"
                }
            })
            const totalPostsCount = await Thread.countDocuments({parentId:{$in:[null,undefined]}})
            const posts = await postsQuery.exec();
            const isNext = totalPostsCount > skipAmount+posts.length;
            return {posts,isNext}

    }catch (e:any) {
        throw new Error(`Error from fetchPosts function ${e.message}`)
    }
}