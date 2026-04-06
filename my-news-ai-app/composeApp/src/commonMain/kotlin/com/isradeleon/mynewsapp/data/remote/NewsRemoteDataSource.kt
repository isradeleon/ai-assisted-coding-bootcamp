package com.isradeleon.mynewsapp.data.remote

import com.isradeleon.mynewsapp.data.model.NewsResponseDto
import com.isradeleon.mynewsapp.common.Outcome

interface NewsRemoteDataSource {
    suspend fun getLatestNews(
        q: String? = null
    ): Outcome<NewsResponseDto>
}

