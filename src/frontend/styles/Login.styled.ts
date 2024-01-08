// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';
import Button from '../components/Button';

export const Login = styled.div`
  margin: 24px;

  ${({ theme }) => theme.breakpoints.desktop} {
    margin: 100px;
  }
`;

export const Container = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
`;


export const Title = styled.h1`
  display: flex;
  flex-direction: column;
  font-size: 64px;
  font-weight: bolder;
  align-items: center;
  justify-content: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 260px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const ErrorLabel = styled.div`
  color: red;
  font-size: 12px;
`;

export const InputBox = styled.input`
  height: 48px;
  width: 400px;
  font-size: large;
  border-radius: 8px;
  border: 1px solid grey;
  padding-left: 8px;
`;


export const LoginButton = styled(Button)`
  border: none;
  background: cornflowerblue;
  color: white;
  padding: 12px 24px;
  margin: 8px;
  font-size: 24px;
  border-radius: 8px;
  cursor: pointer;

  ${({ theme }) => theme.breakpoints.desktop} {
    width: inherit;
  }
`;
