package com.isradeleon.mynewsapp

import androidx.compose.ui.window.ComposeUIViewController
import com.isradeleon.mynewsapp.di.initKoin
import com.isradeleon.mynewsapp.di.platformModule

fun MainViewController() = ComposeUIViewController { App() }

fun doInitKoin() {
    initKoin(
        platformSpecificModules = listOf(platformModule)
    )
}