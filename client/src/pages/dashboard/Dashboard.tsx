import DashboardPageHeader from '@/pages/dashboard/components/widgets/DashboardPageHeader/DashboardPageHeader';
import styles from './styles.module.css';
import DashboardPage from '@/pages/dashboard/components/ui/DashboardPage/DashboardPage';

function Dashboard(){
    return(
        <div className="flex flex-col h-full min-h-full bg-blue-950">
            <DashboardPageHeader/>
            <DashboardPage/>
        </div>
        )
}

export default Dashboard;

