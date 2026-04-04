package com.isradeleon.mynewsapp.di

import org.koin.core.module.Module
import org.koin.dsl.module

val platformModule: Module = module {
    // Provide iOS-specific dependencies here
    // e.g. single<SomeIosService> { IosServiceImpl() }
}

