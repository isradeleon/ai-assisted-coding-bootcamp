package com.isradeleon.mynewsapp

import androidx.compose.ui.window.ComposeUIViewController
import com.isradeleon.mynewsapp.di.initKoin
import org.koin.core.module.Module

fun MainViewController() = ComposeUIViewController { App() }

fun doInitKoin(
    iosSpecificModules: List<Module>
) {
    initKoin(
        platformSpecificModules = iosSpecificModules
    )
}