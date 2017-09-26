export class AppBaseInfo {
  appId: string;
  appName: string;
  appDesp: string;
  appStatus: string;
  getuiAppid: string;
  getuiAppkey: string;
  getuiStatus: string;
}


export class AppInfo {
  app: App;
  getui: Getui;
}

class App {
  appId: string;
  appName: string;
  appDesp: string;
  appStatus: string;
}

class Getui {
  getuiAppid: string;
  getuiAppkey: string;
  getuiStatus: string;
}

class AppVersion {
  version: string;
  versionDesp: string;
  updateAddress: string;
  appSize: string;
  versionDate1: any;
}
