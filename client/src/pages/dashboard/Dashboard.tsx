import DashboardPage from '@/pages/dashboard/components/ui/DashboardPage/DashboardPage';
import DashboardPageHeader from '@/pages/dashboard/components/widgets/DashboardPageHeader/DashboardPageHeader';

function Dashboard(){
    return(
        <div className="flex flex-col h-full min-h-full bg-blue-950">
            <DashboardPageHeader/>
            <DashboardPage/>
        </div>
        )
}

export default Dashboard;

