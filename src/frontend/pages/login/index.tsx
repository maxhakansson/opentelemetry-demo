import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import * as S from '../../styles/Login.styled';
import ApiGateway from '../../gateways/Api.gateway';
import SessionGateway from '../../gateways/Session.gateway';
import { setConvivaUserId } from '../../utils/telemetry/conviva';

const Login: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const router = useRouter();
  const onButtonClick = () => {

    // Set initial error values to empty
    setEmailError("");
    setPasswordError("");

    // Check if the user has entered both fields correctly
    if ("" === email) {
        setEmailError("Please enter your email");
        return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        setEmailError("Please enter a valid email");
        return;
    }

    if ("" === password) {
        setPasswordError("Please enter a password");
        return;
    }

    if (password.length < 7) {
        setPasswordError("The password must be 8 characters or longer");
        return;
    }

    // Authentication calls will be made here...
    ApiGateway.login(email, password).then(() => {
      SessionGateway.setSessionValue('userId', email);
      SessionGateway.setSessionValue('loggedIn', true);
      setConvivaUserId(email);
      router.push("/");
    });
  };

  return (
    <Layout>
      <S.Container>
        <S.Title>Login</S.Title>
        <br />
        <S.InputContainer>
          <S.InputBox value={email} placeholder="Enter your email here" onChange={ev => setEmail(ev.target.value)} />
          <S.ErrorLabel>{emailError}</S.ErrorLabel>
        </S.InputContainer>
        <br />
        <S.InputContainer>
          <S.InputBox
            value={password}
            placeholder="Enter your password here"
            onChange={ev => setPassword(ev.target.value)}
          />
          <S.ErrorLabel>{passwordError}</S.ErrorLabel>
        </S.InputContainer>
        <br />
        <S.InputContainer>
          <S.LoginButton onClick={onButtonClick}>Log in</S.LoginButton>
        </S.InputContainer>
      </S.Container>

      <Footer />
    </Layout>
  );
};

export default Login;
