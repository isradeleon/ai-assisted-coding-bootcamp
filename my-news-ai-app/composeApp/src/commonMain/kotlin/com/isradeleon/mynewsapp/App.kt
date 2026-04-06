package com.isradeleon.mynewsapp

import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import com.isradeleon.mynewsapp.presentation.screen.LatestNewsScreen

@Composable
@Preview
fun App() {
    MaterialTheme {
        LatestNewsScreen()
    }
}