package com.isradeleon.mynewsapp.di

import org.koin.dsl.module
import org.koin.core.module.Module
// import android.content.Context // Uncomment if needed

val platformModule: Module = module {
    // Provide Android-specific dependencies here
    // e.g. single<Context> { androidContext() }
}

