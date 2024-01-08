// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

interface ISession {
  userId: string|null;
  currencyCode: string;
  loggedIn: boolean;
}

const sessionKey = 'session';
const defaultSession = {
  userId: null,
  currencyCode: 'USD',
  loggedIn: false,
};

const SessionGateway = () => ({
  getSession(): ISession {
    if (typeof window === 'undefined') return defaultSession;
    const sessionString = localStorage.getItem(sessionKey);

    if (!sessionString) localStorage.setItem(sessionKey, JSON.stringify(defaultSession));

    return JSON.parse(sessionString || JSON.stringify(defaultSession)) as ISession;
  },
  setSessionValue<K extends keyof ISession>(key: K, value: ISession[K]) {
    const session = this.getSession();

    localStorage.setItem(sessionKey, JSON.stringify({ ...session, [key]: value }));
  },
});

export default SessionGateway();
