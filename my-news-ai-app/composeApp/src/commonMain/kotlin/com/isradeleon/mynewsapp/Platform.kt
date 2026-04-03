package com.isradeleon.mynewsapp

interface Platform {
    val name: String
}

expect fun getPlatform(): Platform