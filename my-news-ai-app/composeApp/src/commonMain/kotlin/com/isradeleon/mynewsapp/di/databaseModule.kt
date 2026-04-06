package com.isradeleon.mynewsapp.di

import androidx.room.RoomDatabase
import com.isradeleon.mynewsapp.data.local.NewsDatabase
import com.isradeleon.mynewsapp.data.local.daos.ArticleDao
import com.isradeleon.mynewsapp.data.local.getNewsDatabase
import org.koin.core.module.Module
import org.koin.dsl.module

val databaseModule: Module = module {
    /**
     * Database
     */
    single<NewsDatabase> {
        getNewsDatabase(
            get<RoomDatabase.Builder<NewsDatabase>>()
        )
    }
    single<ArticleDao> {
        get<NewsDatabase>().getArticleDao()
    }
}