package com.isradeleon.mynewsapp.data.local

import androidx.room.ConstructedBy
import androidx.room.Database
import androidx.room.RoomDatabase
import com.isradeleon.mynewsapp.data.local.daos.ArticleDao
import com.isradeleon.mynewsapp.data.local.entities.ArticleEntity

@Database(
    entities = [ArticleEntity::class],
    version = 1
)
@ConstructedBy(NewsDatabaseConstructor::class)
abstract class NewsDatabase: RoomDatabase() {
    companion object {
        const val DATABASE_NAME = "news.db"
    }

    abstract fun getArticleDao(): ArticleDao
}