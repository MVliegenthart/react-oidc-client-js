export class Constants {

  //Identity server settings
  //public static stsAuthority = 'https://identityserver.local/common/'; --Marcel DEV
  public static stsAuthority = 'https://revelationAuthBeta.azurewebsites.net/common/';
  public static clientId = 'Revelation.NewUX';
  public static clientRoot = 'https://localhost:4200/NewUX/';
  public static clientScope = 'openid profile Revelation.Api';

  //Revelation URLs
  public static revUrl = 'https://staging.revelationhelpdesk.com/';
  public static revAuthUrl = 'https://staging.revelationhelpdesk.com/oauth/signinwithjwt';
  public static apiRoot = 'https://staging.revelationhelpdesk.com/api/';

  //Ignore
  public static siteImage = 'https://localhost:44375/images/site';
  
  
}
