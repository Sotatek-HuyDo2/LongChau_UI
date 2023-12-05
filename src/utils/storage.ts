import jwt_decode from 'jwt-decode';

const env = process.env.REACT_APP_ENV || 'prod';

const PREFERENCES = `long-chau-pharmacity-${env}`;

type StorageInterface = {
  accessToken?: string;
  email?: string;
  role?: string;
};

const defaultPreferences: StorageInterface = {};

function getStorage(): StorageInterface {
  const preferencesString = localStorage.getItem(PREFERENCES);
  const preferences = JSON.parse(preferencesString || '{}');
  return {
    ...defaultPreferences,
    ...preferences,
  };
}

function setStorage(type: string, value: StorageInterface) {
  localStorage.setItem(type, JSON.stringify(value));
}

class Storage {
  static init() {
    const preferences = getStorage();
    setStorage(PREFERENCES, preferences);
  }

  static getEmail(): string | undefined {
    const { email } = getStorage();
    return email;
  }

  static getRole(): string | undefined {
    const { accessToken } = getStorage();

    if (accessToken) {
      const data: any = jwt_decode(accessToken);
      return data?.role;
    }
    return 'customer';
  }

  static getAccessToken(): string | undefined {
    const { accessToken } = getStorage();
    return accessToken;
  }

  static setAccessToken(accessToken: string) {
    const preferences = getStorage();
    preferences.accessToken = accessToken;
    setStorage(PREFERENCES, preferences);
  }

  static setEmail(email: string) {
    const preferences = getStorage();
    preferences.email = email;
    setStorage(PREFERENCES, preferences);
  }

  static clearAccessToken() {
    const preferences = getStorage();
    delete preferences.accessToken;
    setStorage(PREFERENCES, preferences);
  }

  static clearEmail() {
    const preferences = getStorage();
    delete preferences.email;
    setStorage(PREFERENCES, preferences);
  }

  static logout() {
    Storage.clearAccessToken();
    Storage.clearEmail();
  }
}

export default Storage;
