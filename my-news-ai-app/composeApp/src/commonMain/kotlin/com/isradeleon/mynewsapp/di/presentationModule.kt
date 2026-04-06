package com.isradeleon.mynewsapp.di

import com.isradeleon.mynewsapp.presentation.viewmodel.LatestNewsViewModel
import org.koin.core.module.dsl.viewModel
import org.koin.dsl.module

val presentationModule = module {
    // Bind view models here using Koin Compose integration
    viewModel { LatestNewsViewModel(get()) }
}

