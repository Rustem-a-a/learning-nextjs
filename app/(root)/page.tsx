//app/page.tsx
import { UserButton } from "@clerk/nextjs";

export default function Home() {
    return (
        <div>
            <h1>Home page</h1>
            <UserButton afterSignOutUrl="/"/>
        </div>
    )
}