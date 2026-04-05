package com.isradeleon.mynewsapp.data.local

import androidx.room.RoomDatabase

abstract class NewsDatabase: RoomDatabase() {
    companion object {
        const val DATABASE_NAME = "news.db"
    }
}