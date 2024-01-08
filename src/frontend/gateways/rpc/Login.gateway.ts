// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0
import { LoginResponse } from "../../types/LoginResponse";

const { LOGIN_SERVICE_ADDR = '' } = process.env;

const LoginGateway = () => ({
  login(authorization: string) {
    const headers = new Headers();
    headers.set('Authorization', authorization);
    return new Promise<LoginResponse>((resolve, reject) => {
      fetch(LOGIN_SERVICE_ADDR, {
        headers: headers
      }).then(function(response) {
        return response.json();
      }).then(function(response) {
        resolve(response);
      })
      .catch(reject);
    });
  },
});

export default LoginGateway();
