// NOT CURRENTLY IN USE -> BEING KEPT FOR POTENTIAL USE


import { Modal } from '@mantine/core';
import { useState } from 'react';

import LoginForm from "../forms/LoginForm";
import SignupForm from '../forms/SignupForm';

type Props = {
  opened: boolean;
  setOpened: Function;
}

function SignupLoginModal({ opened, setOpened }: Props) {
  const [loginOrSignup, setLoginOrSignup] = useState('login');
  const loginForm = loginOrSignup === 'login';

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={loginForm ? "Welcome Back!" : "One of us ..."}
    >
      {loginForm ? <LoginForm /> : <SignupForm />}
    </Modal>
  );
}

export default SignupLoginModal;