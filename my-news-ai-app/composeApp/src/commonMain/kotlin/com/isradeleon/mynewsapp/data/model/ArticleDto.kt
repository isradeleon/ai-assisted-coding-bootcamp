package com.isradeleon.mynewsapp.data.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class ArticleDto(
    @SerialName("article_id") val articleId: String,
    val link: String,
    val title: String,
    val description: String? = null,
    val content: String? = null,
    val keywords: List<String>? = null,
    val creator: List<String>? = null,
    val language: String? = null,
    val country: List<String>? = null,
    val category: List<String>? = null,
    val datatype: String? = null,
    val pubDate: String? = null,
    val pubDateTZ: String? = null,
    @SerialName("fetched_at") val fetchedAt: String? = null,
    @SerialName("image_url") val imageUrl: String? = null,
    @SerialName("video_url") val videoUrl: String? = null,
    @SerialName("source_id") val sourceId: String? = null,
    @SerialName("source_name") val sourceName: String? = null,
    @SerialName("source_priority") val sourcePriority: Int? = null,
    @SerialName("source_url") val sourceUrl: String? = null,
    @SerialName("source_icon") val sourceIcon: String? = null,
    val sentiment: String? = null,
    @SerialName("sentiment_stats") val sentimentStats: String? = null,
    @SerialName("ai_tag") val aiTag: String? = null,
    @SerialName("ai_region") val aiRegion: String? = null,
    @SerialName("ai_org") val aiOrg: String? = null,
    @SerialName("ai_summary") val aiSummary: String? = null,
    val duplicate: Boolean? = null
)

