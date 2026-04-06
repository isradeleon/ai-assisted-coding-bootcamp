package com.isradeleon.mynewsapp.di

import com.isradeleon.mynewsapp.data.remote.NewsRemoteDataSource
import com.isradeleon.mynewsapp.data.remote.NewsRemoteDataSourceImpl
import com.isradeleon.mynewsapp.data.repository.NewsRepositoryImpl
import com.isradeleon.mynewsapp.domain.repository.NewsRepository
import org.koin.dsl.module

val dataModule = module {
    single<NewsRemoteDataSource> {
        NewsRemoteDataSourceImpl(client = get())
    }
    single<NewsRepository> {
        NewsRepositoryImpl(
            remoteDataSource = get(),
            articleDao = get()
        )
    }
}

