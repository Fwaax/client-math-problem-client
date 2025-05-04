// router.tsx
import {
  createRouter,
  createRootRoute,
  createRoute,
  RouterProvider,
  Outlet,
} from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './pages/loginPage';
import Header from './components/header';
import HomePage from './pages/homePage';
import RegisterPage from './pages/registerPage';
import { AuthProvider } from './context/authContext';
import SubmitAnswer from './pages/submitAnswer';
import PostPage from './pages/postPage';

// Main Layout
function MainLayout() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <div className="flex-grow">
        <Outlet /> {/* TanStack's Outlet is the same as React Router */}
      </div>
    </div>
  );
}

// Root Route
const rootRoute = createRootRoute({
  component: MainLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterPage,
});

const submitAnswer = createRoute({
  getParentRoute: () => rootRoute,
  path: '/submit-answer',
  component: SubmitAnswer
})


const postRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/posts/$postId',
  component: PostPage,
});


// Route Tree
const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  registerRoute,
  submitAnswer,
  postRoute
]);

// Create Router
export const router = createRouter({ routeTree });

// Provide router to TanStack tools (for use with devtools, hydration, etc.)
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;


// navigate({
//   to: '/some-path',
//   params?: {},
//   search?: {},
//   replace?: false,
// });
