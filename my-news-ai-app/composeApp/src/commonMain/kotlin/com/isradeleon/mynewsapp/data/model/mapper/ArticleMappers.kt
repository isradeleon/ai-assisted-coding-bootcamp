package com.isradeleon.mynewsapp.data.model.mapper

import com.isradeleon.mynewsapp.data.model.ArticleDto
import com.isradeleon.mynewsapp.data.local.entities.ArticleEntity
import com.isradeleon.mynewsapp.domain.model.Article

fun ArticleDto.toEntity(): ArticleEntity = ArticleEntity(
    articleId = articleId,
    link = link,
    title = title,
    description = description,
    imageUrl = imageUrl,
    sourceName = sourceName,
    sourceIcon = sourceIcon
)

fun ArticleDto.toDomain(): Article = Article(
    articleId = articleId,
    link = link,
    title = title,
    description = description,
    imageUrl = imageUrl,
    sourceName = sourceName,
    sourceIcon = sourceIcon
)

fun ArticleEntity.toDomain(): Article = Article(
    articleId = articleId,
    link = link,
    title = title,
    description = description,
    imageUrl = imageUrl,
    sourceName = sourceName,
    sourceIcon = sourceIcon
)

