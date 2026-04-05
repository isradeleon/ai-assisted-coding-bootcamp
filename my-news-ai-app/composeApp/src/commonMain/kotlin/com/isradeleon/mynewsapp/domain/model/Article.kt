package com.isradeleon.mynewsapp.domain.model

data class Article(
    val articleId: String,
    val link: String,
    val title: String,
    val description: String? = null,
    val imageUrl: String? = null,
    val sourceName: String? = null,
    val sourceIcon: String? = null,
)
