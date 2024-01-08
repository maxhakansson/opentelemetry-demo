// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import Image from 'next/image';
import styled from 'styled-components';

export const LogoutIcon = styled.div`
  position: relative;
  display: block;
  margin-left: 25px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Icon = styled(Image).attrs({
  width: '24px',
  height: '24px',
})`
  margin-bottom: 3px;
`;
