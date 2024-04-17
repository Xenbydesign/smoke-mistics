import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from '../pages/Home';
import Reading from '../pages/Reading';
import PostReading from '../pages/PostReading';
import Profile from '../pages/Profile';
import DashBoard from '../pages/DashBoard';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
                index: true
            },
            {
                path: '/profile', 
                element: <Profile />
            },
            {
                path: '/reading',
                element: <Reading />
            },
            {
                path: '/post-reading',
                element: <PostReading />
            },
            {
                path: '/dashboard',
                element: <DashBoard />
            }
        ]
    }
]);

export default router;