package com.isradeleon.mynewsapp.di

import org.koin.core.context.startKoin
import org.koin.core.module.Module
import org.koin.dsl.KoinAppDeclaration

fun initKoin(
    platformSpecificModules: List<Module> = emptyList(),
    appDeclaration: KoinAppDeclaration = {},
) {
    startKoin {
        appDeclaration()
        modules(appModule + platformSpecificModules)
    }
}

