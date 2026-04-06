package com.isradeleon.mynewsapp.di

import com.isradeleon.mynewsapp.domain.usecase.GetLatestNewsUseCase
import org.koin.dsl.module

val domainModule = module {
    // Bind use case interfaces to implementations here
    factory<GetLatestNewsUseCase> { GetLatestNewsUseCase(get()) }
}
