package com.isradeleon.mynewsapp.data.model

import kotlinx.serialization.Serializable

@Serializable
data class NewsResponseDto(
    val status: String,
    val totalResults: Int,
    val results: List<ArticleDto>,
    val nextPage: String? = null
)
