import React from "react";
import { UserLayout } from '../../layouts/userLayout'
import { SingInForm } from './signInForm'

export const SignInPage: React.FC = () => {
  return (
    <UserLayout>
    <SingInForm />
  </UserLayout>
  )
}