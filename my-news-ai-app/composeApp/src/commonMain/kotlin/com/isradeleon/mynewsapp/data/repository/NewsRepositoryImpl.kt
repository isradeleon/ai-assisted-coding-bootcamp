package com.isradeleon.mynewsapp.data.repository

import com.isradeleon.mynewsapp.data.remote.NewsRemoteDataSource
import com.isradeleon.mynewsapp.data.local.daos.ArticleDao
import com.isradeleon.mynewsapp.data.model.mapper.toDomain
import com.isradeleon.mynewsapp.data.model.mapper.toEntity
import com.isradeleon.mynewsapp.domain.model.Article
import com.isradeleon.mynewsapp.domain.repository.NewsRepository
import com.isradeleon.mynewsapp.common.Outcome

class NewsRepositoryImpl(
    private val remoteDataSource: NewsRemoteDataSource,
    private val articleDao: ArticleDao
) : NewsRepository {
    override suspend fun getLatestNews(q: String?): List<Article> {
        return when (val result = remoteDataSource.getLatestNews(q)) {
            is Outcome.Success -> {
                val articles = result.data.results.map { it.toDomain() }
                articleDao.clearArticles()
                articleDao.insertArticles(result.data.results.map { it.toEntity() })
                articles
            }
            is Outcome.Error -> {
                articleDao.getAllArticles().map { it.toDomain() }
            }
        }
    }
}

