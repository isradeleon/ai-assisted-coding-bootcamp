package com.isradeleon.mynewsapp.data.local.daos

import androidx.room.Dao
import androidx.room.Query
import androidx.room.Upsert
import com.isradeleon.mynewsapp.data.local.entities.ArticleEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface ArticleDao {
    @Query("SELECT * FROM articles")
    fun observeArticles(): Flow<List<ArticleEntity>>

    @Upsert
    suspend fun insertArticles(articles: List<ArticleEntity>)

    @Query("DELETE FROM articles")
    suspend fun clearArticles()
}

