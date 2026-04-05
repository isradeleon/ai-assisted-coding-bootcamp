package com.isradeleon.mynewsapp.di

import androidx.room.RoomDatabase
import com.isradeleon.mynewsapp.data.local.NewsDatabase
import org.koin.core.module.Module
import org.koin.dsl.module

val platformModule: Module = module {
    // Provide iOS-specific dependencies here
    single<RoomDatabase.Builder<NewsDatabase>> {
        getNewsDatabaseBuilder()
    }
}

