import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../components/Layout';
import Conditional from '../../components/Conditional';
import * as S from '../../styles/Login.styled';
import ApiGateway from '../../gateways/Api.gateway';
import SessionGateway from '../../gateways/Session.gateway';
import { setConvivaUserId } from '../../utils/telemetry/conviva';

const Login: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginProcessing, setLoginProcessing] = useState(false);

  const router = useRouter();
  async function onButtonClick() {
    setLoginProcessing(true);
    // Set initial error values to empty
    setEmailError("");
    setPasswordError("");

    // Check if the user has entered both fields correctly
    if ("" === email) {
        setEmailError("Please enter your email");
        setLoginProcessing(false);
        return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        setEmailError("Please enter a valid email");
        setLoginProcessing(false);
        return;
    }

    if ("" === password) {
        setPasswordError("Please enter a password");
        setLoginProcessing(false);
        return;
    }

    if (password.length < 7) {
        setPasswordError("The password must be 8 characters or longer");
        setLoginProcessing(false);
        return;
    }

    // Authentication calls will be made here...
    ApiGateway.login(email, password).then(() => {
      SessionGateway.setSessionValue('userId', email);
      SessionGateway.setSessionValue('loggedIn', true);
      setConvivaUserId(email);
      router.push("/");
    }).catch(() => {
      setLoginProcessing(false);
    });
  }

  return (
    <Layout>
      <S.Container>
        <Conditional showWhen={loginProcessing}>
          <div>LOGGING IN...</div>
        </Conditional>
        <Conditional showWhen={!loginProcessing}>
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
              type="password"
              placeholder="Enter your password here"
              onChange={ev => setPassword(ev.target.value)}
            />
            <S.ErrorLabel>{passwordError}</S.ErrorLabel>
          </S.InputContainer>
          <br />
          <S.InputContainer>
            <S.LoginButton onClick={onButtonClick}>Log in</S.LoginButton>
          </S.InputContainer>
        </Conditional>
      </S.Container>
    </Layout>
  );
};

export default Login;
