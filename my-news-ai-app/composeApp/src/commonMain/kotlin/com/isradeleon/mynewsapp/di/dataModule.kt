package com.isradeleon.mynewsapp.di

import org.koin.dsl.module

val dataModule = module {
    // Bind repository interfaces to implementations here
    // e.g. single<NewsRepository> { NewsRepositoryImpl(get()) }
}

