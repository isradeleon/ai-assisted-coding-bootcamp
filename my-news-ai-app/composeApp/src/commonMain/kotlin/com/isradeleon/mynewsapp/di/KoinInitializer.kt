package com.isradeleon.mynewsapp.di

import org.koin.core.context.startKoin
import org.koin.core.module.Module

fun initKoin(additionalModules: List<Module> = emptyList()) {
    startKoin {
        modules(appModule + additionalModules)
    }
}

