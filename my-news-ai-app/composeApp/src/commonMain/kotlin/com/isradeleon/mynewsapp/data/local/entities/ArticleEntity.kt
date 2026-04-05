package com.isradeleon.mynewsapp.data.local.entities

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "articles")
data class ArticleEntity(
    @PrimaryKey val articleId: String,
    val link: String,
    val title: String,
    val description: String? = null,
    val imageUrl: String? = null,
    val sourceName: String? = null,
    val sourceIcon: String? = null
)

