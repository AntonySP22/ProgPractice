import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "@components/layout/MainLayout";
import SplashPage from "@pages/SplashPage/SplashPage";
import HomePage from "@pages/home/HomePage";
import LoginPage from "@pages/auth/Login/LoginPage";
import WelcomePage from "@pages/auth/Welcome/WelcomePage";
import SignUpPage from "@pages/auth/SignUp/SignUpPage";
import ProfilePage from "@pages/profile/ProfilePage";
import HelpPage from "@pages/help/HelpPage";
import CoursesPage from "./pages/courses/CoursesPage";
import IntroPythonCourse from "./pages/courses/introduction/IntroPythonCourse";
import IntroJavaCourse from "./pages/courses/introduction/IntroJavaCourse";
import IntroHTMLCourse from "./pages/courses/introduction/IntroHTMLCourse";
import IntroSwiftCourse from "./pages/courses/introduction/IntroSwiftCourse";
import TheoryPythonCourse from "./pages/courses/theory/TheoryPythonCourse";
import TheoryJavaCourse from "./pages/courses/theory/TheoryJavaCourse";
import TheoryHTMLCourse from "./pages/courses/theory/TheoryHTMLCourse";
import TheorySwiftCourse from "./pages/courses/theory/TheorySwiftCourse";
import ExercisePythonCourse from "./pages/courses/exercise/ExercisePythonCourse";
import ExerciseJavaCourse from "./pages/courses/exercise/ExerciseJavaCourse";
import ExerciseHTMLCourse from "./pages/courses/exercise/ExerciseHTMLCourse";
import ExerciseSwiftCourse from "./pages/courses/exercise/ExerciseSwiftCourse";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashPage />,
  },
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="welcome" replace />,
      },
      {
        path: "welcome",
        element: <WelcomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },

      {
        path: "courses",
        element: <CoursesPage />,
      },
      {
        path: "courses/introduction/html",
        element: <IntroHTMLCourse />,
      },
      {
        path: "courses/introduction/python",
        element: <IntroPythonCourse />,
      },
      {
        path: "courses/introduction/java",
        element: <IntroJavaCourse />,
      },
      {
        path: "courses/introduction/swift",
        element: <IntroSwiftCourse />,
      },
      {
        path: "courses/theory/html",
        element: <TheoryHTMLCourse />,
      },
      {
        path: "courses/theory/python",
        element: <TheoryPythonCourse />,
      },
      {
        path: "courses/theory/java",
        element: <TheoryJavaCourse />,
      },
      {
        path: "courses/theory/swift",
        element: <TheorySwiftCourse />,
      },

      {
        path: "EjercicioPython",
        element: <ExercisePythonCourse />,
      },
      {
        path: "EjercicioJava",
        element: <ExerciseJavaCourse />,
      },
      {
        path: "EjercicioHTML",
        element: <ExerciseHTMLCourse />,
      },
      {
        path: "EjercicioSwift",
        element: <ExerciseSwiftCourse />,
      },

      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "help",
        element: <HelpPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
