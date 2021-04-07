import React from "react";
import { UserLayout } from '../../layouts/userLayout'
import { RegisterForm } from './registerForm'

export const RegisterPage: React.FC = () => {
  return (
    <UserLayout>
    <RegisterForm></RegisterForm>
  </UserLayout>
  )
}