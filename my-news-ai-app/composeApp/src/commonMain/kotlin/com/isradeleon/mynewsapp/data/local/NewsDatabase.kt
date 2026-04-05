package com.isradeleon.mynewsapp.data.local

import androidx.room.ConstructedBy
import androidx.room.Database
import androidx.room.RoomDatabase

@Database(
    entities = [],
    version = 1
)
@ConstructedBy(NewsDatabaseConstructor::class)
abstract class NewsDatabase: RoomDatabase() {
    companion object {
        const val DATABASE_NAME = "news.db"
    }
}