package org.vniizht.appforge.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.converter.HttpMessageNotReadableException
import org.springframework.web.HttpMediaTypeNotSupportedException
import org.springframework.web.bind.MissingRequestHeaderException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import java.util.concurrent.RejectedExecutionException
import javax.security.auth.login.LoginException

@ControllerAdvice
class ResponsesHandler{

    @ExceptionHandler(Exception::class)
    fun handleException(ex: Exception): ResponseEntity<String> {
        return ResponseEntity(ex.localizedMessage, ex.getHttpStatus())
    }

    private fun Exception.getHttpStatus(): HttpStatus = when(this) {
        is RejectedExecutionException         -> HttpStatus.IM_USED
        is LoginException                     -> HttpStatus.UNAUTHORIZED
        is HttpMediaTypeNotSupportedException -> HttpStatus.UNSUPPORTED_MEDIA_TYPE
        is HttpMessageNotReadableException    -> HttpStatus.UNPROCESSABLE_ENTITY
        is MissingRequestHeaderException      -> HttpStatus.UNPROCESSABLE_ENTITY

        else -> throw this
    }
}