import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils'; 
function Layout() {
  const location = useLocation();
  const hideFooter = ['/', '/register'].includes(location.pathname);

  const navArray = {
    "График": "/",
    "Посты": "/posts",
    "Ликвидность": "/orders"
  };

    return (
        <>
            <header className="flex items-center justify-center bg-blue-950" >
                <div className="flex justify-between items-center w-[50%] h-[80px] ">
                    {Object.entries(navArray).map(([text, path]) => (
                    <NavLink  
                        key={path} 
                        to={path}
                        className={({ isActive }) => 
                            cn("header-link", isActive && "active-header-link")
                        }
                        >
                            {text}
                    </NavLink>))}
                </div>
            </header>
            <main className='flex h-full flex-col'>
                <Outlet/>
            </main>
            {!hideFooter && 'Footer'}
        </>
    )
}

export default Layout;
