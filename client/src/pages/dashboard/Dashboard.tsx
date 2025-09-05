import DashboardPage from '@/pages/dashboard/components/ui/DashboardPage/DashboardPage';
import DashboardPageHeader from '@/pages/dashboard/components/widgets/DashboardPageHeader/DashboardPageHeader';

function Dashboard(){
    return(
        <div className="flex flex-col min-h-0 flex-1 bg-blue-950">
            <DashboardPageHeader/>
            <DashboardPage/>
        </div>
        )
}

export default Dashboard;

