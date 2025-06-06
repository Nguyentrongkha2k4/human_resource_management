package com.bananahrm.hrms.Exception;

import org.apache.catalina.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.bananahrm.hrms.DTO.response.ResponseObject;

import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler(value = Exception.class)
    ResponseEntity<ResponseObject<User>> handlerUncategoriedException(Exception e){
        // ErrorCode errorCode = ErrorCode.UNCATEGORIED_EXCEPTION;
        return ResponseEntity.badRequest().body(ResponseObject.<User>builder()
                            .status(400)
                            .message(e.toString())
                            .build());
    }

    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ResponseObject<User>> handlerAppException(AppException e){
        ErrorCode errorCode = e.getErrorCode();
        return ResponseEntity.badRequest().body(ResponseObject.<User>builder()
                            .status(400)
                            .message(errorCode.getMessage())
                            .build());
    }

    @SuppressWarnings("null")
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ResponseObject<User>> handlerMethodArgumentNotValidException(MethodArgumentNotValidException e){
        String key = e.getFieldError().getDefaultMessage();

        ErrorCode errorCode = ErrorCode.INVALID_KEY;
        try{
            errorCode = ErrorCode.valueOf(key);
        }catch(IllegalArgumentException exception){
            //log error
        }
        return ResponseEntity.badRequest().body(ResponseObject.<User>builder()
                            .status(400)
                            .message(errorCode.getMessage())
                            .build());
    }
    
    // @ExceptionHandler(value = JOSEException.class)
    // ResponseEntity<ResponseObject<User>> handlerJOSEEException(JOSEException e){
    //     ErrorCode errorCode = ErrorCode.VERIFY_TOKEN_EXCEPTION;
    //     return ResponseEntity.badRequest().body(ResponseObject.<User>builder()
    //                         .status(500)
    //                         .message(errorCode.getMessage())
    //                         .build());
    // }

    // @ExceptionHandler(value = ParseException.class)
    // ResponseEntity<ResponseObject<User>> handlerParseException(ParseException e){
    //     ErrorCode errorCode = ErrorCode.TOKEN_INVALID;
    //     return ResponseEntity.badRequest().body(ResponseObject.<User>builder()
    //                         .status(400)
    //                         .message(errorCode.getMessage())
    //                         .build());
    // }
    
    // @ExceptionHandler(value = AuthorizationDeniedException.class)
    // ResponseEntity<ResponseObject<User>> handlerAccessDenied(AuthorizationDeniedException e){
    //     ErrorCode errorCode = ErrorCode.ACCESS_DENY;
    //     return ResponseEntity.badRequest().body(ResponseObject.<User>builder()
    //                         .status(400)
    //                         .message(errorCode.getMessage())
    //                         .build());
    // }
}
