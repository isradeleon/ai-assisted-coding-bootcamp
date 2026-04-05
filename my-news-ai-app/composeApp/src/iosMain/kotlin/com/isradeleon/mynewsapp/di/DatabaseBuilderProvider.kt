package com.isradeleon.mynewsapp.di

import androidx.room.Room
import androidx.room.RoomDatabase
import com.isradeleon.mynewsapp.data.local.NewsDatabase
import kotlinx.cinterop.ExperimentalForeignApi
import platform.Foundation.NSDocumentDirectory
import platform.Foundation.NSFileManager
import platform.Foundation.NSUserDomainMask

fun getNewsDatabaseBuilder(): RoomDatabase.Builder<NewsDatabase> {
    val dbFile = "${documentDirectory()}/${NewsDatabase.DATABASE_NAME}"
    return Room.databaseBuilder<NewsDatabase>(
        name = dbFile
    )
}

@OptIn(ExperimentalForeignApi::class)
private fun documentDirectory(): String {
    val documentDirectory = NSFileManager.defaultManager.URLForDirectory(
        directory = NSDocumentDirectory,
        inDomain = NSUserDomainMask,
        appropriateForURL = null,
        create = false,
        error = null,
    )
    return requireNotNull(documentDirectory?.path)
}