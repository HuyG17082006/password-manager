import { BrowserRouter, Routes, Route, Navigate } from 'react-router'

import AuthLayout from './layouts/AuthLayout/AuthLayout.jsx'
import AuthPage from './features/auth/pages/AuthPage.jsx'
import LoginApprovedPage from './features/auth/pages/LoginApprovedPage.jsx'
import LoginRejectedPage from './features/auth/pages/LoginRejectedPage.jsx'
import VerifyLoginPage from './features/auth/pages/VerifyLoginPage.jsx'

import NotFoundPage from './shared/pages/NotFoundPage.jsx'

import DashBoardLayout from './layouts/DashBoardLayout/DashBoardLayout.jsx'
import VaultPage from './features/DashBoard/pages/VaultPage.jsx'

import ConfirmBox from './shared/components/ConfirmBox.jsx'
import AccountDetail from './shared/components/AccountDetail/AccountDetail.jsx'
import CreateFolderForm from './shared/components/CreateFolderForm.jsx'
import Notify from './shared/components/Notify.jsx'
import ProtectRoute from './routes/ProtectRoute.jsx'

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path='*' element={<NotFoundPage />} />

        <Route path='/' element={<Navigate to={'/auth/login'} replace />} />

        <Route path='/auth' element={<AuthLayout />}>
          <Route index element={<Navigate to="login" replace />} />
          <Route path='login' element={<AuthPage />} />
          <Route path='register' element={<AuthPage />} />
          <Route path='verify-email/:loginVerificationId' element={<VerifyLoginPage />} />
          <Route path='login-approved' element={<LoginApprovedPage />} />
          <Route path='login-rejected' element={<LoginRejectedPage />} />
        </Route>

        <Route path="/dashboard" element={
          <ProtectRoute>
            <DashBoardLayout />
          </ProtectRoute>
        }>
          <Route index element={<Navigate to="folder" replace />} />
          <Route path="folder/" element={<VaultPage />} />
          <Route path="folder/:folderId" element={<VaultPage />} />

        </Route>

      </Routes>

      <AccountDetail />
      <ConfirmBox />
      <CreateFolderForm />
      <Notify />

    </BrowserRouter>
  )
}

export default App
