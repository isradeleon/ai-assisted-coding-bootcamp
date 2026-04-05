package com.isradeleon.mynewsapp.di

import com.isradeleon.mynewsapp.data.remote.NewsRemoteDataSource
import com.isradeleon.mynewsapp.data.remote.NewsRemoteDataSourceImpl
import org.koin.dsl.module

val dataModule = module {
    single<NewsRemoteDataSource> {
        NewsRemoteDataSourceImpl(client = get())
    }
}

