package com.isradeleon.mynewsapp.common

sealed class Outcome<out T> {
    data class Success<out T>(val data: T) : Outcome<T>()
    data class Error(
        val message: String,
        val throwable: Throwable? = null,
        val code: Int? = null
    ) : Outcome<Nothing>()
}

