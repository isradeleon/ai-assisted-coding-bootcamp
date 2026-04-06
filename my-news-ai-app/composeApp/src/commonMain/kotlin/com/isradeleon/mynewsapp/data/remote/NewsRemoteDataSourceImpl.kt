package com.isradeleon.mynewsapp.data.remote

import com.isradeleon.mynewsapp.BuildKonfig
import com.isradeleon.mynewsapp.data.model.NewsResponseDto
import com.isradeleon.mynewsapp.common.Outcome
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.request.parameter
import io.ktor.client.statement.HttpResponse
import io.ktor.http.isSuccess

class NewsRemoteDataSourceImpl(
    private val client: HttpClient
) : NewsRemoteDataSource {
    private val baseUrl = "https://newsdata.io/api/1"
    private val apiKey = BuildKonfig.API_KEY
    private val language = "es"

    override suspend fun getLatestNews(
        q: String?
    ): Outcome<NewsResponseDto> {
        return try {
            val response: HttpResponse = client.get("$baseUrl/latest") {
                parameter("apiKey", apiKey)
                parameter("language", language)
                if (!q.isNullOrBlank()) parameter("q", q)
            }
            if (response.status.isSuccess()) {
                val body = response.body<NewsResponseDto>()
                Outcome.Success(body)
            } else {
                Outcome.Error(
                    message = "HTTP ${response.status.value}: ${response.status.description}",
                    code = response.status.value
                )
            }
        } catch (e: Exception) {
            Outcome.Error(message = e.message ?: "Unknown error", throwable = e)
        }
    }
}

