import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

import streamlit as st
import pandas as pd
from components.guide_base import guide_page_setup, render_breadcrumb, render_footer

guide_page_setup(
    "AI Model Pricing Comparison 2026 - Claude vs GPT-5 vs Gemini vs DeepSeek",
    description="Compare real-time pricing for Claude Sonnet 4.6, GPT-5, Gemini 3.1, DeepSeek V3.2, and 20+ flagship AI models via OpenRouter API."
)

# Page-specific CSS (extends guide_base.py styles)
st.markdown("""
<style>
    /* Override max-width for this data-heavy page */
    .block-container { max-width: 1100px !important; }

    /* Data table styles */
    .stDataFrame { border: 1px solid #ccc; }
    .stDataFrame table { border-collapse: collapse; width: 100%; font-size: 0.78rem; }
    .stDataFrame th { background-color: #111 !important; color: #f5f5f5 !important;
                      text-transform: uppercase; letter-spacing: 0.05em;
                      font-weight: 700; padding: 0.5rem 0.7rem; border: none; }
    .stDataFrame td { padding: 0.4rem 0.7rem; border-bottom: 1px solid #ddd;
                      color: #111; background-color: #fff; }
    .stDataFrame tr:hover td { background-color: #ebebeb; }

    /* Tab styles (Streamlit radio as tabs) */
    div[data-testid="stRadio"] > div {
        gap: 0 !important;
        flex-wrap: nowrap !important;
        overflow-x: hidden !important;
    }
    div[data-testid="stRadio"] > div > label {
        background: #fff !important;
        border: 1px solid #ccc !important;
        border-bottom: none !important;
        padding: 0.5rem 0.8rem !important;
        font-size: 0.68rem !important;
        font-weight: 600 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.04em !important;
        color: #666 !important;
        cursor: pointer !important;
        margin: 0 !important;
        white-space: nowrap !important;
        flex: 1 !important;
        text-align: center !important;
    }
    div[data-testid="stRadio"] > div > label:hover {
        background: #f5f5f5 !important;
    }
    div[data-testid="stRadio"] > div > label[data-selected="true"] {
        background: #111 !important;
        color: #ffffff !important;
        font-weight: 700 !important;
        border-color: #111 !important;
    }
    div[data-testid="stRadio"] > div > label[data-selected="true"] div,
    div[data-testid="stRadio"] > div > label[data-selected="true"] p {
        color: #ffffff !important;
    }
    div[data-testid="stRadio"] input[type="radio"] {
        display: none !important;
    }

    /* Model card styles */
    .model-card {
        background: #fff;
        border: 1px solid #ccc;
        padding: 1rem 1.5rem;
        margin-bottom: 1rem;
    }
    .model-card-title {
        font-size: 0.85rem;
        font-weight: 700;
        color: #111;
        margin-bottom: 0.4rem;
    }
    .model-card-reason {
        font-size: 0.72rem;
        color: #888;
        line-height: 1.5;
        margin-bottom: 0.5rem;
        font-style: italic;
    }
    .model-card-pricing {
        font-size: 0.72rem;
        color: #333;
        font-family: 'Courier New', monospace;
    }
    .highlight { background: #e63000; color: #fff; padding: 0.1rem 0.4rem; font-weight: 700; }
</style>
""", unsafe_allow_html=True)

# Load data
import os
csv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'ai_api_data.csv')
df = pd.read_csv(csv_path)

render_breadcrumb("AI Model Pricing")

# Title
st.markdown("# AI Model Pricing Comparison 2026")
st.markdown(
    "<p style='font-size:0.85rem;color:#555;margin-top:0.3rem'>"
    "Compare Claude Sonnet 4.6, GPT-5, Gemini 3.1, DeepSeek V3.2, and 20+ flagship models — Real-time pricing via OpenRouter API</p>",
    unsafe_allow_html=True
)

# Price Comparison Chart
st.markdown("## Price Comparison Chart")

chart_df = df[['model_name', 'input_cost', 'output_cost', 'context_length']].copy()
chart_df = chart_df.sort_values('input_cost')
chart_df['Model'] = chart_df['model_name'].str.split(':').str[-1].str.strip()

# Model strength score (synthetic metric based on context + cost inverse)
chart_df['context_num'] = chart_df['context_length'].apply(
    lambda x: int(x.replace('K', '')) if isinstance(x, str) and x != 'N/A' else 0
)
# Normalize: higher context + lower input cost = stronger
max_context = chart_df['context_num'].max()
max_cost = chart_df['input_cost'].max()
chart_df['strength'] = (
    (chart_df['context_num'] / max_context * 50) +  # 50% weight on context
    ((max_cost - chart_df['input_cost']) / max_cost * 50)  # 50% weight on low cost
)

import plotly.graph_objects as go

fig = go.Figure()

fig.add_trace(go.Scatter(
    x=chart_df['Model'],
    y=chart_df['input_cost'],
    mode='lines+markers+text',
    name='Input Cost',
    text=chart_df['input_cost'].round(2),
    textposition='top center',
    textfont=dict(size=9, color='#111'),
    line=dict(color='#111', width=2),
    marker=dict(size=6),
    yaxis='y'
))

fig.add_trace(go.Scatter(
    x=chart_df['Model'],
    y=chart_df['output_cost'],
    mode='lines+markers+text',
    name='Output Cost',
    text=chart_df['output_cost'].round(2),
    textposition='bottom center',
    textfont=dict(size=9, color='#e63000'),
    line=dict(color='#e63000', width=2),
    marker=dict(size=6),
    yaxis='y'
))

fig.add_trace(go.Scatter(
    x=chart_df['Model'],
    y=chart_df['strength'],
    mode='lines+markers',
    name='Model Strength',
    line=dict(color='#22c55e', width=2, dash='dot'),
    marker=dict(size=6, color='#22c55e'),
    yaxis='y2'
))

fig.update_layout(
    font=dict(family="Courier New, monospace", size=11, color="#111"),
    plot_bgcolor='#f5f5f5',
    paper_bgcolor='#f5f5f5',
    xaxis=dict(
        title="",
        tickangle=0,
        tickmode='array',
        tickvals=list(range(len(chart_df))),
        ticktext=[''] * len(chart_df),  # Hide default labels
        showgrid=True,
        gridcolor='#ddd'
    ),
    yaxis=dict(
        title="Cost ($/M tokens)",
        gridcolor='#ddd',
        side='left'
    ),
    yaxis2=dict(
        title=dict(text="Model Strength", font=dict(color='#22c55e')),
        tickfont=dict(color='#22c55e'),
        overlaying='y',
        side='right',
        showgrid=False
    ),
    legend=dict(
        orientation="h",
        yanchor="bottom",
        y=1.02,
        xanchor="right",
        x=1
    ),
    hovermode='x unified',
    height=500,
    margin=dict(b=180, l=60, r=60, t=40)
)

# Add custom annotations for model names with connecting lines
for i, model in enumerate(chart_df['Model']):
    # Add annotation with line pointing up to plot area
    fig.add_annotation(
        x=i,
        y=-0.15,  # Position below chart (in paper coordinates)
        yref='paper',
        text=model,
        showarrow=True,
        arrowhead=0,
        arrowwidth=1,
        arrowcolor='#999',
        ax=0,
        ay=30,  # Arrow length
        font=dict(size=9, color='#333'),
        xanchor='right',
        yanchor='top',
        textangle=-45
    )

st.plotly_chart(fig, use_container_width=True)

# Master Table
st.markdown("## Master Table: All Models Comparison")
st.markdown("Compare input/output costs, context length, and modality support across all models.")

# Last updated info
from datetime import datetime
st.markdown(
    f"<p style='font-size:0.7rem;color:#999;margin-top:0.3rem'>"
    f"Last updated: {datetime.now().strftime('%Y-%m-%d %H:%M UTC')} | Data source: OpenRouter API | Click column headers to sort</p>",
    unsafe_allow_html=True,
)

# Format display with sortable columns
display_df = df[['model_name', 'category', 'input_cost', 'output_cost', 'context_length', 'modality']].copy()

# Convert context to sortable numeric (remove 'K' suffix)
display_df['context_sort'] = display_df['context_length'].apply(
    lambda x: int(x.replace('K', '')) if isinstance(x, str) and x != 'N/A' else 0
)

display_df.columns = ['Model', 'Category', 'Input ($/M)', 'Output ($/M)', 'Context', 'Modality', 'context_sort']
display_df = display_df.sort_values('context_sort', ascending=False)
display_df = display_df.drop('context_sort', axis=1)

st.dataframe(display_df, use_container_width=True, hide_index=True)

# Tabs for use cases
st.markdown("## Use Case Recommendations")

# Custom tab selector
st.markdown("""
<style>
.custom-tabs {
    display: flex;
    gap: 0;
    border-bottom: 2px solid #111;
    margin-bottom: 1.5rem;
}
.custom-tab {
    background: #fff;
    border: 1px solid #ccc;
    border-bottom: none;
    padding: 0.6rem 1.2rem;
    cursor: pointer;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #666;
    text-decoration: none;
}
.custom-tab:hover {
    background: #f5f5f5;
}
.custom-tab.active {
    background: #111;
    color: #ffffff;
    font-weight: 700;
    border-color: #111;
}
</style>
""", unsafe_allow_html=True)

# Use radio button as tab selector (hidden visually, controlled by custom UI)
tab_choice = st.radio(
    "Select Category",
    ["Multimodal", "Text Excellence", "Code Specialist", "Image Generation", "Social Media", "Solo Dev"],
    horizontal=True,
    label_visibility="collapsed"
)

# Override radio button styles to look like tabs
st.markdown("""
<style>
div[data-testid="stRadio"] > div {
    gap: 0 !important;
    flex-wrap: nowrap !important;
    overflow-x: hidden !important;
}
div[data-testid="stRadio"] > div > label {
    background: #fff !important;
    border: 1px solid #ccc !important;
    border-bottom: none !important;
    padding: 0.5rem 0.8rem !important;
    font-size: 0.68rem !important;
    font-weight: 600 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.04em !important;
    color: #666 !important;
    cursor: pointer !important;
    margin: 0 !important;
    white-space: nowrap !important;
    flex: 1 !important;
    text-align: center !important;
}
div[data-testid="stRadio"] > div > label:hover {
    background: #f5f5f5 !important;
}
div[data-testid="stRadio"] > div > label[data-selected="true"] {
    background: #111 !important;
    color: #ffffff !important;
    font-weight: 700 !important;
    border-color: #111 !important;
}
div[data-testid="stRadio"] > div > label[data-selected="true"] div,
div[data-testid="stRadio"] > div > label[data-selected="true"] p {
    color: #ffffff !important;
}
div[data-testid="stRadio"] input[type="radio"] {
    display: none !important;
}
</style>
""", unsafe_allow_html=True)

if tab_choice == "Multimodal":
    tab1 = True
else:
    tab1 = False

if tab_choice == "Text Excellence":
    tab2 = True
else:
    tab2 = False

if tab_choice == "Code Specialist":
    tab3 = True
else:
    tab3 = False

if tab_choice == "Image Generation":
    tab4 = True
else:
    tab4 = False

if tab_choice == "Social Media":
    tab5 = True
else:
    tab5 = False

if tab_choice == "Solo Dev":
    tab6 = True
else:
    tab6 = False

if tab1:
    st.markdown("### Why Multimodal?")
    st.markdown("Best for: Image understanding, OCR, PDF processing, chart analysis, document workflows")

    models = df[df['category'].str.contains('Multimodal', na=False)].sort_values('input_cost')

    reasons = {
        'claude-sonnet-4.6': 'Native PDF support with text+image extraction. Best for complex documents with mixed content.',
        'gpt-5.4': 'Strong vision capabilities, supports file attachments. Ideal for diagram analysis and technical documentation.',
        'gpt-5-nano': 'Ultra-cheap multimodal option. Great for high-volume OCR tasks with tight budgets.',
        'gemini-3.1-pro': 'Longest context window (1M+ tokens). Perfect for processing entire books or large document batches.',
        'qwen3.5-flash': 'Best price/performance ratio. Fast OCR with surprisingly good accuracy for charts and tables.',
        'qwen3.5-9b': 'Cheapest multimodal model. Suitable for simple image classification or basic OCR workflows.'
    }

    for _, row in models.iterrows():
        if row['input_cost'] <= 0.1:
            badge_text = "Best Value"
        elif 'claude' in row['model_id'].lower():
            badge_text = "Strongest"
        else:
            badge_text = "Solid Choice"

        reason = ""
        for key, desc in reasons.items():
            if key in row['model_id']:
                reason = f'<div class="model-card-reason">Why: {desc}</div>'
                break

        st.markdown(f"""
        <div class="model-card">
            <div class="model-card-title">{badge_text}: {row['model_name']}</div>
            {reason}
            <div class="model-card-pricing">
                Input: <span class="highlight">${row['input_cost']}/M</span> |
                Output: <span class="highlight">${row['output_cost']}/M</span> |
                Context: {row['context_length']}
            </div>
        </div>
        """, unsafe_allow_html=True)

if tab2:
    st.markdown("### Why Text Excellence?")
    st.markdown("Best for: Long-form writing, translation, knowledge base Q&A, summarization, complex reasoning")

    models = df[df['category'].str.contains('Text', na=False)].sort_values('input_cost')

    reasons = {
        'claude-opus-4.6': 'Strongest reasoning model. Best for legal analysis, research synthesis, and strategic planning.',
        'claude-sonnet-4.6': 'Balanced flagship: fast, accurate, great at following complex instructions. Top choice for writing.',
        'gpt-5.4': 'Creative writing specialist. Excels at storytelling, marketing copy, and conversational tone.',
        'gemini-3.1-pro': 'Best for translation and multilingual tasks. Handles 100+ languages with cultural nuance.',
        'deepseek-v3.2': 'Best price/performance for text. Surprisingly strong at reasoning despite low cost.',
        'qwen3.5-plus': 'Strong Chinese language support. Ideal for CN/EN translation and Chinese content generation.',
        'grok-4.20': 'Real-time web access. Best for news summary, trend analysis, and fact-checking recent events.'
    }

    for _, row in models.iterrows():
        if row['input_cost'] <= 0.3:
            badge_text = "Best Value"
        elif 'opus' in row['model_id'].lower():
            badge_text = "Deep Thinking"
        else:
            badge_text = "Flagship"

        reason = ""
        for key, desc in reasons.items():
            if key in row['model_id']:
                reason = f'<div class="model-card-reason">Why: {desc}</div>'
                break

        st.markdown(f"""
        <div class="model-card">
            <div class="model-card-title">{badge_text}: {row['model_name']}</div>
            {reason}
            <div class="model-card-pricing">
                Input: <span class="highlight">${row['input_cost']}/M</span> |
                Output: <span class="highlight">${row['output_cost']}/M</span> |
                Context: {row['context_length']}
            </div>
        </div>
        """, unsafe_allow_html=True)

if tab3:
    st.markdown("### Why Code Specialist?")
    st.markdown("Best for: Full-stack development, API integration, debugging, automation scripts, code review")

    models = df[df['category'].str.contains('Code', na=False)].sort_values('input_cost')

    reasons = {
        'claude-sonnet-4.6': 'Best full-stack coding model. Excels at architectural decisions, refactoring, and complex debugging.',
        'gpt-5.3-codex': 'OpenAI\'s code specialist. Strong at function completion and API wrapper generation.',
        'grok-code-fast-1': 'Fastest code generation. Ideal for repetitive CRUD code and boilerplate generation.',
        'qwen3-coder': 'Best value for large codebases. Handles entire repo context for accurate refactoring.',
        'qwen3-coder-flash': 'Ultra-cheap code assistant. Great for code review, linting suggestions, and simple scripts.',
        'devstral-small': 'Lightweight code model. Perfect for embedded systems, edge devices, or tight budgets.'
    }

    for _, row in models.iterrows():
        if row['input_cost'] <= 0.25:
            badge_text = "Best Value"
        elif 'claude' in row['model_id'].lower():
            badge_text = "Best Overall"
        else:
            badge_text = "Code-Focused"

        reason = ""
        for key, desc in reasons.items():
            if key in row['model_id']:
                reason = f'<div class="model-card-reason">Why: {desc}</div>'
                break

        st.markdown(f"""
        <div class="model-card">
            <div class="model-card-title">{badge_text}: {row['model_name']}</div>
            {reason}
            <div class="model-card-pricing">
                Input: <span class="highlight">${row['input_cost']}/M</span> |
                Output: <span class="highlight">${row['output_cost']}/M</span> |
                Context: {row['context_length']}
            </div>
        </div>
        """, unsafe_allow_html=True)

if tab4:
    st.markdown("### Why Image Generation?")
    st.markdown("Best for: Marketing materials, social media graphics, product mockups, wireframes")

    models = df[df['category'].str.contains('Image Gen', na=False)].sort_values('input_cost')

    reasons = {
        'gpt-5-image': 'Highest quality photorealistic images. Best for professional marketing and product photography.',
        'gpt-5-image-mini': 'Good quality at mid-tier price. Ideal for social media posts and blog illustrations.',
        'gemini-3.1-flash-image': 'Fast generation with decent quality. Great for A/B testing multiple design variations.',
        'gemini-2.5-flash-image': 'Cheapest image gen. Perfect for high-volume thumbnail creation or placeholder graphics.'
    }

    for _, row in models.iterrows():
        if row['input_cost'] <= 0.5:
            badge_text = "Budget Friendly"
        elif 'gpt-5-image' in row['model_id'] and 'mini' not in row['model_id']:
            badge_text = "Highest Quality"
        else:
            badge_text = "Good Balance"

        reason = ""
        for key, desc in reasons.items():
            if key in row['model_id']:
                reason = f'<div class="model-card-reason">Why: {desc}</div>'
                break

        st.markdown(f"""
        <div class="model-card">
            <div class="model-card-title">{badge_text}: {row['model_name']}</div>
            {reason}
            <div class="model-card-pricing">
                Input: <span class="highlight">${row['input_cost']}/M</span> |
                Output: <span class="highlight">${row['output_cost']}/M</span> |
                Context: {row['context_length']}
            </div>
        </div>
        """, unsafe_allow_html=True)

if tab5:
    st.markdown("### Why Social Media Workflow?")
    st.markdown("Best for: Content batching (X, Instagram, WeChat), viral headlines, image pairing, rewriting")

    st.markdown("**Recommended Stack:**")

    models = df[df['category'].str.contains('Social Media', na=False)].sort_values('input_cost')

    workflow_labels = {
        'qwen3.5-flash': 'Copywriting & Headlines',
        'deepseek-v3.2': 'Long-form Content',
        'gemini-2.5-flash-image': 'Image Generation',
        'claude-haiku': 'Rewriting & Optimization'
    }

    for _, row in models.iterrows():
        label = "Workflow Step"
        for key, val in workflow_labels.items():
            if key in row['model_id']:
                label = val
                break

        st.markdown(f"""
        <div class="model-card">
            <div class="model-card-title">{label}: {row['model_name']}</div>
            <div class="model-card-pricing">
                Input: <span class="highlight">${row['input_cost']}/M</span> |
                Output: <span class="highlight">${row['output_cost']}/M</span>
            </div>
        </div>
        """, unsafe_allow_html=True)

if tab6:
    st.markdown("### Why Solo Dev Workflow?")
    st.markdown("Best for: Indie hacking, SaaS building, full-stack dev, API integration, marketing automation")

    st.markdown("**Recommended Stack:**")

    models = df[df['category'].str.contains('Solo Dev', na=False)].sort_values('input_cost')

    workflow_labels = {
        'claude-sonnet': 'Architecture & Strategy',
        'qwen3-coder-flash': 'Coding & Implementation',
        'deepseek-v3.2': 'Data Analysis',
        'qwen3.5-flash': 'OCR & Document Processing',
        'gemini-2.5-flash-image': 'Marketing Materials'
    }

    for _, row in models.iterrows():
        label = "Workflow Step"
        for key, val in workflow_labels.items():
            if key in row['model_id']:
                label = val
                break

        st.markdown(f"""
        <div class="model-card">
            <div class="model-card-title">{label}: {row['model_name']}</div>
            <div class="model-card-pricing">
                Input: <span class="highlight">${row['input_cost']}/M</span> |
                Output: <span class="highlight">${row['output_cost']}/M</span>
            </div>
        </div>
        """, unsafe_allow_html=True)

render_footer(
    "Data from OpenRouter API. Pricing may vary based on usage tier and region. "
    "Prices shown are input/output costs per million tokens."
)
