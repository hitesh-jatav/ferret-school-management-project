import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
} from "react-router-dom";

import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import Students from './components/Students';
import Teachers from './components/Teachers';
import Parents from './components/Parents';
import Library from './components/Library';
import Class from './components/Class';
import Exam from './components/Exam';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Transport from './components/Transport';
import Notice from './components/Notice';
import Message from './components/Message';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Overview from './components/profile-tab/Overview';
import MarksAndAssestment from './components/profile-tab/MarksAndAssestment';
import RemarkAndAction from './components/profile-tab/RemarkAndAction';
import AbsenceAndIncidents from './components/profile-tab/AbsenceAndIncidents';
import SideBar from "./components/SideBar";
import Books from "./components/library/Books";
import Lending from "./components/library/Lending";
import Reports from "./components/library/Reports";
import Fines from "./components/library/Fines";
import SchoolSignup from "./components/authentication/SchoolSignup";
import VerifySchool from "./components/authentication/VerifySchool";


const ErrorBoundary = () => {
    return (
        <div>
            Something went wrong!
        </div>
    )
}



const AppComponent = () => {
    return (
        <div>
            <div className='d-flex app'>
                <div className='sidebar-wrapp'>
                    <SideBar />
                </div>
                <div className='outlet-wrapp'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}




const routes = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <SchoolSignup />
    },
    {
        path: '/verify-school',
        element: <VerifySchool />
    },
    {
        path: "/",
        element: <AppComponent />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                path: "",
                element: <Dashboard />,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "students",
                element: <Students />,
            },
            {
                path: "teachers",
                element: <Teachers />,
            },
            {
                path: "parents",
                element: <Parents />,
            },
            {
                path: "class",
                element: <Class />,
            },
            {
                path: "exam",
                element: <Exam />,
            },
            {
                path: "events",
                element: <Events />,
            },
            {
                path: "gallery",
                element: <Gallery />,
            },
            {
                path: "transport",
                element: <Transport />,
            },

            {
                path: "notice",
                element: <Notice />,
            },
            {
                path: "message",
                element: <Message />,
            },
            {
                path: "library/",
                element: <Library />,
                children: [
                    {
                        path: "",
                        element: <Books />
                    },
                    {
                        path: 'books',
                        element: <Books />
                    },
                    {
                        path: 'lending',
                        element: <Lending />
                    },
                    {
                        path: 'report',
                        element: <Reports />
                    },
                    {
                        path: "fines",
                        element: <Fines />
                    }
                ]
            },
            {
                path: "profile/",
                element: <Profile />,
                children: [
                    {
                        path: "",
                        element: <Overview />,
                    },
                    {
                        path: "overview",
                        element: <Overview />,
                    },
                    {
                        path: "marks-assesments",
                        element: <MarksAndAssestment />,
                    },
                    {
                        path: "remarks-actions",
                        element: <RemarkAndAction />
                    }, {
                        path: "absence-incidents",
                        element: <AbsenceAndIncidents />
                    }
                ]
            },



        ]
    },
    {
        path: "about",
        element: <div>About</div>,
    },
]);

export default routes