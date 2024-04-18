import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Reading from '../pages/Reading';
import Profile from '../pages/Profile';
import Authentication from '../pages/Authentication';
import ErrorPage from '../pages/ErrorPage';


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
                path: 'profile', 
                element: <Profile />
            },
            {
                path: 'readings/new',
                element: <Reading />
            },
            {
                path: 'authentication',
                element: <Authentication />
            },
        ]
    }
]);

export default router;