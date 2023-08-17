"use client"
import Link from "next/link";
import {sidebarLinks} from "@/constants";
import Image from "next/image";
import {usePathname,useRouter} from "next/navigation";
import {SignedIn,SignOutButton} from "@clerk/nextjs";


function LeftSidebar() {
    const router = useRouter()
    const pathname = usePathname()
    console.log(router)
    console.log(pathname)
    return (
        <section className="custom-scrollbar leftsidebar">
            <div className="flex w-full flex-1 flex-col gap-6 px-6">
                {sidebarLinks.map(link => {
                    const isActive = (pathname.includes(link.route) && link.route.length>1) || pathname === link.route
                    return (
                    <Link
                        className={` ${isActive && 'bg-primary-500'} leftsidebar_link `}
                        href={link.route}
                        key={link.label}>
                        <Image
                            src={link.imgURL}
                            alt={link.label}
                            width={24}
                            height={24}/>
                        <p
                            className={"text-light-1 max-lg:hidden"}>
                            {link.label}
                        </p>
                    </Link>)
                })}
            </div>
            <div className="mt-10 px-6">
                <SignedIn>
                    <SignOutButton signOutCallback={()=> router.push('/sign-in')}>
                        <div className="flex cursor-pointer gap-4 p-4">
                            <Image src={'/assets/logout.svg'} alt="logout" width={24} height={24}/>
                            <p className="text-light-1 max-lg:hidden">Logout</p>
                        </div>
                    </SignOutButton>
                </SignedIn>
            </div>
        </section>
    )
}

export default LeftSidebar