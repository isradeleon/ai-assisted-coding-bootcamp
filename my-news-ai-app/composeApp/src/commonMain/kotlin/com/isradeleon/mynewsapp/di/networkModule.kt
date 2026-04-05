package com.isradeleon.mynewsapp.di

import io.ktor.client.HttpClient
import io.ktor.client.engine.HttpClientEngine
import org.koin.dsl.module
import org.koin.core.module.Module

expect fun provideHttpClientEngine(): HttpClientEngine

val networkModule: Module = module {
    single {
        HttpClient(provideHttpClientEngine()) {
            // Add common configuration here if needed
        }
    }
}


