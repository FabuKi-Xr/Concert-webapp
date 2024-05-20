import { headers } from "next/headers";

const Navbar = () => {
    const headersList = headers();
    const pathname = headersList.get("x-pathname");

    const url = new URL(pathname ?  pathname : "", "http://localhost:3000")
    const isCreatePage = url.pathname.match(/\/create/) ? true : false;
    return (
        <div className="admin mobile: lg:mt-12 mb-6">
                <nav className="flex flex-row justify-left -mb-px text-xs font-bold">
                    <a href="../admin" className={`px-4 py-3 no-underline mobile:text-xl md:text-4xl ${!isCreatePage ? 'select' : ""}`}>Overview</a>
                    <a href="admin/create" className={`px-4 py-3 no-underline mobile:text-xl border-b-2 md:text-4xl border-transparent 
                    tracking-wide text-center ${isCreatePage ? 'select' : ""}`}>Create</a>
                </nav>
        </div>
    );
}

export default Navbar;