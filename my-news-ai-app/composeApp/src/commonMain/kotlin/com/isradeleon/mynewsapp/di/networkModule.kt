package com.isradeleon.mynewsapp.di

import io.ktor.client.HttpClient
import io.ktor.client.engine.HttpClientEngine
import io.ktor.client.plugins.HttpTimeout
import io.ktor.client.plugins.cache.HttpCache
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.plugins.defaultRequest
import io.ktor.http.ContentType
import io.ktor.http.contentType
import io.ktor.serialization.kotlinx.json.json
import kotlinx.serialization.json.Json
import org.koin.dsl.module
import org.koin.core.module.Module

expect fun provideHttpClientEngine(): HttpClientEngine

val networkModule: Module = module {
    single {
        HttpClient(provideHttpClientEngine()) {
            install(ContentNegotiation) { // Serialization / deserialization
                json(
                    json = Json {
                        ignoreUnknownKeys = true
                    }
                )
            }

            // Timeout configuration
            install(HttpTimeout) {
                socketTimeoutMillis = 5_000L
                requestTimeoutMillis = 5_000L
            }

            // Allow Ktor's cache system
            install(HttpCache)

            defaultRequest {
                // Content type
                contentType(ContentType.Application.Json)
            }
        }
    }
}


