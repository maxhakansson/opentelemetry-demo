// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import { useState } from 'react';
import { useRouter } from 'next/router';
import SessionGateway from '../../gateways/Session.gateway';
import * as S from './LogoutButton.styled';

const LogoutButton = () => {
  const router = useRouter();
  const { loggedIn } = SessionGateway.getSession();
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);

  function logOut() {
    SessionGateway.setSessionValue('loggedIn', false);
    SessionGateway.setSessionValue('userId', null);
    setIsLoggedIn(false);
    router.push('/login');
  }

  return (
    <>
      {isLoggedIn && (
        <S.LogoutIcon onClick={logOut}>
          <S.Icon src="/icons/LogoutIcon.svg" alt="Logout icon" title="Logout" />
        </S.LogoutIcon>
      )}
    </>
  );
};

export default LogoutButton;
