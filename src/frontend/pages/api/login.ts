// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

import type { NextApiRequest, NextApiResponse } from 'next';
import InstrumentationMiddleware from '../../utils/telemetry/InstrumentationMiddleware';
import LoginGateway from '../../gateways/rpc/Login.gateway';
import { Empty } from '../../protos/demo';

type TResponse = string[] | Empty;

const handler = async ({ method, body }: NextApiRequest, res: NextApiResponse<TResponse>) => {
  switch (method) {
    case 'POST': {
      const { username, password } = body;
      const { status, message } = await LoginGateway.login(username, password);

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
