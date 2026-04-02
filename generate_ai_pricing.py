import json
import csv

# Whitelist by category
WHITELIST = {
    'Multimodal': [
        'anthropic/claude-sonnet-4.6',
        'openai/gpt-5.4',
        'openai/gpt-5-nano',
        'google/gemini-3.1-pro-preview',
        'qwen/qwen3.5-flash-02-23',
        'qwen/qwen3.5-9b',
    ],
    'Text': [
        'anthropic/claude-opus-4.6',
        'anthropic/claude-sonnet-4.6',
        'openai/gpt-5.4',
        'google/gemini-3.1-pro-preview',
        'deepseek/deepseek-v3.2',
        'qwen/qwen3.5-plus-02-15',
        'x-ai/grok-4.20',
    ],
    'Code': [
        'anthropic/claude-sonnet-4.6',
        'openai/gpt-5.3-codex',
        'x-ai/grok-code-fast-1',
        'qwen/qwen3-coder',
        'qwen/qwen3-coder-flash',
        'mistralai/devstral-small',
    ],
    'Image Gen': [
        'openai/gpt-5-image',
        'openai/gpt-5-image-mini',
        'google/gemini-3.1-flash-image-preview',
        'google/gemini-2.5-flash-image',
    ],
    'Social Media': [
        'qwen/qwen3.5-flash-02-23',
        'deepseek/deepseek-v3.2',
        'google/gemini-2.5-flash-image',
        'anthropic/claude-haiku-4.5',
    ],
    'Solo Dev': [
        'anthropic/claude-sonnet-4.6',
        'qwen/qwen3-coder-flash',
        'deepseek/deepseek-v3.2',
        'qwen/qwen3.5-flash-02-23',
        'google/gemini-2.5-flash-image',
    ],
}

# Flatten whitelist
all_model_ids = set()
for models in WHITELIST.values():
    all_model_ids.update(models)

# Load data
with open('temp_models.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Extract whitelisted models
extracted = []
for m in data['data']:
    model_id = m.get('id', '')
    if model_id not in all_model_ids:
        continue

    name = m.get('name', 'Unknown')
    pricing = m.get('pricing', {})
    arch = m.get('architecture', {})
    context_length = m.get('context_length', 0)

    # Convert to $/M tokens
    try:
        input_price = float(pricing.get('prompt', '0')) * 1_000_000
        output_price = float(pricing.get('completion', '0')) * 1_000_000
        cache_price = float(pricing.get('input_cache_read', '0')) * 1_000_000 if pricing.get('input_cache_read') else None
    except:
        input_price = 0
        output_price = 0
        cache_price = None

    # Determine primary category
    primary_category = []
    for cat, models in WHITELIST.items():
        if model_id in models:
            primary_category.append(cat)

    extracted.append({
        'model_id': model_id,
        'model_name': name,
        'category': ', '.join(primary_category),
        'input_cost': round(input_price, 2),
        'output_cost': round(output_price, 2),
        'cache_cost': round(cache_price, 2) if cache_price else 'N/A',
        'context_length': f"{context_length // 1000}K" if context_length else 'N/A',
        'modality': arch.get('modality', 'N/A'),
    })

# Sort by input cost
extracted.sort(key=lambda x: x['input_cost'])

# Write CSV
with open('ai_api_data.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=[
        'model_id', 'model_name', 'category', 'input_cost', 'output_cost',
        'cache_cost', 'context_length', 'modality'
    ])
    writer.writeheader()
    writer.writerows(extracted)

print(f"Extracted {len(extracted)} models to ai_api_data.csv")
print(f"\nBreakdown:")
for cat, models in WHITELIST.items():
    found = [m for m in extracted if cat in m['category']]
    print(f"  {cat}: {len(found)} models")
