package com.isradeleon.mynewsapp.presentation.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.isradeleon.mynewsapp.domain.model.Article
import com.isradeleon.mynewsapp.domain.usecase.GetLatestNewsUseCase
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class LatestNewsViewModel(
    private val getLatestNewsUseCase: GetLatestNewsUseCase
): ViewModel() {
    /**
     * Query for the news api endpoint.
     * Current language is spanish.
     */
    private val query: String = "inteligencia artificial"

    private val _uiState = MutableStateFlow<LatestNewsUiState>(LatestNewsUiState.Loading)
    val uiState: StateFlow<LatestNewsUiState> = _uiState.asStateFlow()

    init {
        fetchLatestNews()
    }

    fun fetchLatestNews() {
        _uiState.value = LatestNewsUiState.Loading
        viewModelScope.launch {
            try {
                val articles = getLatestNewsUseCase(query)
                _uiState.value = LatestNewsUiState.Success(articles)
            } catch (e: Throwable) {
                _uiState.value = LatestNewsUiState.Error(e)
            }
        }
    }
}

sealed class LatestNewsUiState {
    object Loading : LatestNewsUiState()
    data class Success(val articles: List<Article>) : LatestNewsUiState()
    data class Error(val throwable: Throwable) : LatestNewsUiState()
}
