import CoursesPage from "./course";
import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const isLoggedIn:boolean = cookieStore.get("user")?.value ? true :false;
  return (
    <>
        <SiteNavbar isLoggedIn={isLoggedIn} />
            <CoursesPage/>
        <SiteFooter />
    </>
  )
}