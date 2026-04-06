package com.isradeleon.mynewsapp

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.isradeleon.mynewsapp.presentation.screen.LatestNewsScreen

@Composable
@Preview
fun App() {
    MaterialTheme {
        Scaffold { paddingValues ->
            LatestNewsScreen(
                modifier = Modifier.padding(paddingValues)
            )
        }
    }
}