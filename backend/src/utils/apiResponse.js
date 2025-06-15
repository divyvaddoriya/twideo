class ApiResponse {
    constructor(statusCode , data , message = "success"){
        this.statusCode = statusCode
        this.data = data 
        this.message = message 
        this.success = statusCode < 400 
        //this means all the succesful response should have status code less than 400 
    }
}

export {ApiResponse}