package com.isradeleon.mynewsapp.domain.repository

import com.isradeleon.mynewsapp.domain.model.Article

interface NewsRepository {
    suspend fun getLatestNews(q: String? = null): List<Article>
}

