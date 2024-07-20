class AppError{
    public readonly statusCode : number
    public readonly message : string;
  
  
    constructor(message : string,statusCode = 404){
      this.statusCode = statusCode;
      this.message = message
    }
  }
  
  export default AppError