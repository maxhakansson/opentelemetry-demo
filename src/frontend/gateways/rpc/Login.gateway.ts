// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0
import { LoginResponse } from "../../types/LoginResponse";

const { LOGIN_SERVICE_ADDR = '' } = process.env;

const LoginGateway = () => ({
  login(username: string, password: string) {
    return new Promise<LoginResponse>((resolve, reject) => {
      fetch(LOGIN_SERVICE_ADDR, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password,
        })
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
