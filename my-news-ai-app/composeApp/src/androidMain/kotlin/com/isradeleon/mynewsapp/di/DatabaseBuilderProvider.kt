package com.isradeleon.mynewsapp.di

import android.content.Context
import androidx.room.Room
import androidx.room.RoomDatabase
import com.isradeleon.mynewsapp.data.local.NewsDatabase

fun getNewsDatabaseBuilder(
    context: Context
): RoomDatabase.Builder<NewsDatabase> {
    val dbFile = context.getDatabasePath(NewsDatabase.DATABASE_NAME)
    return Room.databaseBuilder(
        context = context,
        name = dbFile.absolutePath
    )
}