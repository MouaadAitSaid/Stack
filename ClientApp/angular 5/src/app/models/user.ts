export class User {
  public firstName: String = null;
  public lastName: String= null;
  public email: String= null;
  public username: String= null;
  public password: String= null;
  public role : String= null;
  public otherInfos: {}= null;

  buildUser = (firstName: String, lastName: String, email: String, username: String,password : String, role: String, otherInfos: {})=>{
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.password = password;
    this.role = role;
    this.otherInfos = otherInfos;
  };

  constructor(){

  }

  buildLogin = (username: String,password : String) =>{
    this.username = username;
    this.password = password;
  };

  buildConnectedUser = (firstName: String, lastName: String, email: String, username: String, role: String, otherInfos: {})=>{
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.role = role;
    this.otherInfos = otherInfos;
  };
}
