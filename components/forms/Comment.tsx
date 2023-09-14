'use client'

import React from 'react';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {usePathname, useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CommentValidation} from "@/lib/validations/thread";
import * as z from "zod";
import {addCommentToThread, createThread} from "@/lib/actions/thread.actions";
import Image from "next/image";


interface IProps {
    treadId: string;
    currentUserImg:string;
    currentUserId:string;
}
const Comment = ({treadId,currentUserImg,currentUserId}:IProps) => {
    const router = useRouter()
    const pathname = usePathname()

    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues:{
            thread: '',
        }
    })
    const onSubmit = async (values: z.infer<typeof CommentValidation>)=>{
        await addCommentToThread(treadId,values.thread,JSON.parse(currentUserId),pathname)
        form.reset()
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="comment-form">

                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-3  w-full">
                            <FormLabel>
                                <Image
                                    src={currentUserImg}
                                    alt="Profile image"
                                    height={48}
                                    width={48}
                                    className="rounded-full object-cover"/>
                            </FormLabel>
                            <FormControl className="border-none bg-transparent"
                            >
                                <Input
                                    type="text"
                                    placeholder="Comments..."
                                    className="no-focus text-light-2 outline-none"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="comment-form_btn">Reply</Button>
            </form>
        </Form>
    );
};

export default Comment;
