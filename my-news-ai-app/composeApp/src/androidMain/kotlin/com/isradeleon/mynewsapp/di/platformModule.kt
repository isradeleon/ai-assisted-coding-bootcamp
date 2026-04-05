package com.isradeleon.mynewsapp.di

import androidx.room.RoomDatabase
import com.isradeleon.mynewsapp.data.local.NewsDatabase
import org.koin.dsl.module
import org.koin.core.module.Module
// import android.content.Context // Uncomment if needed

val platformModule: Module = module {
    // Provide Android-specific dependencies here
    single<RoomDatabase.Builder<NewsDatabase>> {
        getNewsDatabaseBuilder(get())
    }
}

