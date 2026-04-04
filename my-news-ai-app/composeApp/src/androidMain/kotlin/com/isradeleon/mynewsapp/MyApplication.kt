package com.isradeleon.mynewsapp

import android.app.Application
import com.isradeleon.mynewsapp.di.initKoin
import com.isradeleon.mynewsapp.di.platformModule
import org.koin.android.ext.koin.androidContext
import org.koin.android.ext.koin.androidLogger

class MyApplication: Application() {
    override fun onCreate() {
        super.onCreate()
        initKoin(
            platformSpecificModules = listOf(platformModule)
        ) {
            androidLogger()
            androidContext(
                this@MyApplication
            )
        }
    }
}