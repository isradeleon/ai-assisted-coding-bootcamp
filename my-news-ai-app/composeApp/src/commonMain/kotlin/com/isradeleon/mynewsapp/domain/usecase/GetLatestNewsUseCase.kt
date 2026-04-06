package com.isradeleon.mynewsapp.domain.usecase

import com.isradeleon.mynewsapp.domain.model.Article
import com.isradeleon.mynewsapp.domain.repository.NewsRepository

class GetLatestNewsUseCase(
    private val newsRepository: NewsRepository
) {
    suspend operator fun invoke(
        query: String? = null
    ): List<Article> {
        return newsRepository.getLatestNews(query)
    }
}