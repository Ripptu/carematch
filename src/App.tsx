/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './pages/Landing';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Onboarding } from './pages/auth/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { ForRelatives } from './pages/ForRelatives';
import { ForStudents } from './pages/ForStudents';
import { AboutUs } from './pages/AboutUs';
import { AnimatePresence, motion } from 'motion/react';

// Protected Route Wrapper
function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode, allowedRole?: 'student' | 'relative' }) {
  const { user, role, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Lade...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {/* @ts-ignore - key is valid in React but missing from RoutesProps in some versions */}
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Landing /></PageWrapper>} />
            <Route path="/fuer-angehoerige" element={<PageWrapper><ForRelatives /></PageWrapper>} />
            <Route path="/fuer-studenten" element={<PageWrapper><ForStudents /></PageWrapper>} />
            <Route path="/ueber-uns" element={<PageWrapper><AboutUs /></PageWrapper>} />
            <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
            <Route path="/onboarding" element={<PageWrapper><Onboarding /></PageWrapper>} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute allowedRole="relative">
                  <PageWrapper><Dashboard /></PageWrapper>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute allowedRole="student">
                  <PageWrapper><Profile /></PageWrapper>
                </ProtectedRoute>
              } 
            />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}



