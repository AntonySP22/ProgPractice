import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GamificationProvider } from '@context/GamificationContext';
import Layout from '@components/layout/Layout';
import SplashPage from '@pages/SplashPage';
import WelcomePage from '@pages/auth/Welcome/WelcomePage';
import LoginPage from '@pages/auth/Login/LoginPage';
import SignUpPage from '@pages/auth/SignUp/SignUpPage';
import HomePage from '@pages/home/HomePage';
import PasswordPage from './pages/PasswordPage';
import MailPage from '@pages/auth/PasswordReset/MailPage';
import SuccessPage from '@pages/auth/PasswordReset/SuccessPage';
import CoursesPage from '@pages/courses/CoursesPage';
import ProfilePage from '@pages/profile/ProfilePage';
import HelpPage from '@pages/help/HelpPage';
import CodePage from '@pages/auth/PasswordReset/CodePage';
import PythonIntroPage from '@pages/languages/python/PythonIntroPage';
import PythonTheoryPage from '@pages/languages/python/PythonTheoryPage';
import PythonExercisesPage from '@pages/languages/python/PythonExercisesPage';
import IntroHTMLCourse from '@pages/courses/introduction/IntroHTMLCourse';

const App = () => {
  return (
    <GamificationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<SplashPage />} />
            <Route path="welcome" element={<WelcomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="password-reset" element={<PasswordPage />} />
            <Route path="password-reset/code" element={<CodePage />} />
            <Route path="password-reset/mail" element={<MailPage />} />
            <Route path="password-reset/success" element={<SuccessPage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="help" element={<HelpPage />} />
            <Route path="python/intro" element={<PythonIntroPage />} />
            <Route path="python/theory" element={<PythonTheoryPage />} />
            <Route path="python/exercises" element={<PythonExercisesPage />} />
            <Route path="/app/courses/introduction/html" element={<IntroHTMLCourse />} />

            {/* RUTAS PARA /app/ */}
            <Route path="app">
              <Route path="courses" element={<CoursesPage />} />
              <Route path="home" element={<HomePage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="help" element={<HelpPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </GamificationProvider>
  );
};

export default App;