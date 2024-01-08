// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import type { NextApiRequest, NextApiResponse } from 'next';
import InstrumentationMiddleware from '../../utils/telemetry/InstrumentationMiddleware';
import LoginGateway from '../../gateways/rpc/Login.gateway';
import { Empty } from '../../protos/demo';

type TResponse = string[] | Empty;

const handler = async ({ method, headers }: NextApiRequest, res: NextApiResponse<TResponse>) => {
  switch (method) {
    case 'GET': {
      const { authorization } = headers;
      const { status, message } = await LoginGateway.login(authorization);

      return res.status(200).json({
        status,
        message
      });
    }

    default: {
      return res.status(405);
    }
  }
};

export default InstrumentationMiddleware(handler);
